import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Main/Gallery/Loader';
import { useSaveArtwork } from '../../components/Main/useSaveArtwork';
import home from '../../assets/ArtWorkCard/home.svg';

interface ArtWorkDetails {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
  place_of_origin: string;
  is_public_domain: boolean;
  dimensions: string;
  date_start: string;
  date_end: string;
  credit_line: string;
}

const ArtworkCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<ArtWorkDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const numericId = id ? parseInt(id, 10) : 0;
  const { isSaved, toggleSaveArtwork } = useSaveArtwork(numericId);

  const handleHomeClick = () => {
    window.scrollTo(0, 0);
    navigate('/');
  };

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        setArtwork(data.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
    };

    fetchArtworkDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="artwork-card">
      <div className="artwork-card__home">
        <button
          onClick={() => handleHomeClick()}
          className="artwork-card__home-btn"
        >
          <img src={home} alt="home" />
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="artwork-card__container">
          <div className="artwork-card__image">
            <img
              src={`https://www.artic.edu/iiif/2/${artwork?.image_id}/full/843,/0/default.jpg`}
              alt={artwork?.title}
            />
            <button
              className={`${isSaved ? 'artwork-card__bookmark-active' : 'artwork-card__bookmark'}`}
              onClick={toggleSaveArtwork}
            ></button>
          </div>
          <div className="artwork-card__content">
            <div className="artwork-card__short">
              <h2 className="artwork-card__title">{artwork?.title}</h2>
              <h3 className="artwork-card__author-title">
                {artwork?.artist_title
                  ? artwork?.artist_title
                  : 'Author unknown'}
              </h3>
              <p className="artwork-card__year">
                {artwork?.date_start
                  ? `${parseInt(artwork?.date_start) <= 0 ? `${artwork?.date_start} BC` : `${artwork?.date_start} AC`} – ${parseInt(artwork?.date_end) <= 0 ? `${artwork?.date_end} BC` : `${artwork?.date_end} AC`}`
                  : ''}
              </p>
            </div>
            <div className="artwork-card__overview">
              <h3 className="artwork-card__overview-title">Overview</h3>
              <ul className="artwork-card__all-info">
                <li className="artwork-card__all-info-li">
                  <strong>Dimensions: </strong>
                  <p>{artwork?.dimensions}</p>
                </li>
                <li className="artwork-card__all-info-li">
                  <strong>Credit Line: </strong>
                  <p>{artwork?.credit_line}</p>
                </li>
                <li className="artwork-card__all-info-li">
                  <strong>Repository: </strong>
                  <p>{artwork?.place_of_origin}</p>
                </li>
              </ul>
              <p className="artwork-card__status">
                {artwork?.is_public_domain ? 'Public' : 'Private'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArtworkCard;
