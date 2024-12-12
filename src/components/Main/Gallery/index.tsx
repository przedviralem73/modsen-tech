import React, { useState, useEffect } from 'react';
import './style.css';
import Card from './Card';
import Pagination from './Pagination';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

interface Artwork {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
  is_public_domain: boolean;
}

const Gallery: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [animationDirection, setAnimationDirection] = useState<string>('');
  const cardsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          'https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,artist_title,is_public_domain&limit=15',
        );
        const data = await response.json();

        if (!response.ok) {
          throw Error('Ошибка при получении данных');
        }

        setLoading(false);
        setArtworks(data.data);
      } catch (err) {
        setError('Ошибка при загрузки данных');
      }
    };
    fetchArtwork();
  }, []);

  if (error) {
    return <div className="gallery__error">{error}</div>;
  }

  const startIndex = (currentPage - 1) * cardsPerPage;
  const displayedArtworks = artworks.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page > currentPage) {
      setAnimationDirection('slide-left');
    } else {
      setAnimationDirection('slide-right');
    }
    setTimeout(() => {
      setCurrentPage(page);
      setAnimationDirection('');
    }, 300);
  };

  const handleCardClick = (id: number) => {
    window.scrollTo(0, 0);
    navigate(`/modsen-tech/artwork/${id}`);
  };

  const totalPages = Math.ceil(artworks.length / cardsPerPage);

  return (
    <section className="gallery">
      <h2 className="gallery__title">
        <p className="gallery__subtitle">Topics for you</p>
        Our special gallery
      </h2>
      <div
        className={`gallery__grid-card ${animationDirection === 'slide-left' ? 'gallery__grid-card--slide-left' : animationDirection === 'slide-right' ? 'gallery__grid-card--slide-right' : ''}`}
      >
        {loading ? (
          <Loader />
        ) : (
          displayedArtworks.map((artwork) => (
            <div
              key={artwork.id}
              onClick={() => handleCardClick(artwork.id)}
              style={{ cursor: 'pointer' }}
            >
              <Card
                id={artwork.id}
                title={artwork.title}
                imageId={artwork.image_id}
                artistTitle={artwork.artist_title}
                isPublicDomain={artwork.is_public_domain}
              />
            </div>
          ))
        )}
      </div>
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default Gallery;
