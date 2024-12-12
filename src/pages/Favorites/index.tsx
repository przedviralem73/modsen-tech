import React, { useEffect, useState } from 'react';
import './style.css';
import bookmark from '../../assets/Favorites/bookmark.svg';
import OtherCard from '../../components/Main/OtherGallery/OtherCard';
import home from '../../assets/ArtWorkCard/home.svg';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Main/Gallery/Loader';
import Pagination from '../../components/Main/Gallery/Pagination';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedArtworks, setSavedArtworks] = useState<string[]>(() => {
    const initial = localStorage.getItem('savedArtworks');
    return initial ? JSON.parse(initial) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState<'title' | 'artist_title'>(
    'title',
  );
  const itemsPerPage = 9;

  const fetchArtworks = async (artworkIds: string[]) => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        artworkIds.map((id: string) =>
          fetch(`https://api.artic.edu/api/v1/artworks/${id}`),
        ),
      );
      const data = await Promise.all(
        responses.map((response) => response.json()),
      );
      setArtworks(data.map((item) => item.data));
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHomeClick = () => {
    window.scrollTo(0, 0);
    navigate('/');
  };

  const handleCardClick = (id: number) => {
    window.scrollTo(0, 0);
    navigate(`/artwork/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value as 'title' | 'artist_title');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedArtworks = JSON.parse(
        localStorage.getItem('savedArtworks') || '[]',
      );
      setSavedArtworks(updatedArtworks);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    fetchArtworks(savedArtworks);
  }, [savedArtworks]);

  const sortedArtworks = [...artworks].sort((a, b) => {
    if (sortCriteria === 'title') {
      return a.title.localeCompare(b.title);
    }
    return a.artist_title?.localeCompare(b.artist_title || '') || 0;
  });

  const indexOfLastArtwork = currentPage * itemsPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - itemsPerPage;
  const currentArtworks = sortedArtworks.slice(
    indexOfFirstArtwork,
    indexOfLastArtwork,
  );

  const totalPages = Math.ceil(artworks.length / itemsPerPage);

  return (
    <section className="favorites">
      <div className="favorites__container">
        <div className="favorites-card__home">
          <button
            onClick={() => handleHomeClick()}
            className="favorites-card__home-btn"
          >
            <img src={home} alt="home" />
          </button>
        </div>
        <div className="favorites__title">
          Here are your{' '}
          <span>
            <img src={bookmark} alt="bookmark" /> favorites
          </span>
        </div>
        <div className="favorites__content">
          <div className="favorites__content--title">
            <h3 className="favorites__content--sub-title">Saved by you</h3>
            Your favorites list
          </div>
          {!loading && (
            <div className="favorites__sort">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortCriteria}
                onChange={handleSortChange}
              >
                <option value="title">Title</option>
                <option value="artist_title">Artist</option>
              </select>
            </div>
          )}
          {loading ? (
            <Loader />
          ) : currentArtworks.length > 0 ? (
            <div className="favorites__artwork-grid">
              {currentArtworks.map((artwork) => (
                <div
                  onClick={() => handleCardClick(artwork.id)}
                  style={{ cursor: 'pointer' }}
                  key={artwork.id}
                >
                  <OtherCard
                    id={artwork.id}
                    title={artwork.title}
                    artist_title={artwork.artist_title}
                    image_id={artwork.image_id}
                    is_public_domain={artwork.is_public_domain}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="favorites__none">No favorites saved yet.</p>
          )}
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
