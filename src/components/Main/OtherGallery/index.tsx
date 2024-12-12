import React, { useState, useEffect } from 'react';
import './style.css';
import OtherCard from './OtherCard';
import Loader from '../Gallery/Loader';
import { useNavigate } from 'react-router-dom';

interface OtherArtwor {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
  is_public_domain: boolean;
}

const OtherGallery: React.FC = () => {
  const [otherArtwors, setOtherArtworks] = useState<OtherArtwor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOtherArtwork = async () => {
      try {
        const response = await fetch(
          'https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,artist_title,is_public_domain&limit=9',
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        setLoading(false);
        setOtherArtworks(data.data);
      } catch (err) {
        setError('Ошибка при загрузки данных');
      }
    };
    fetchOtherArtwork();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (id: number) => {
    window.scrollTo(0, 0);
    navigate(`/artwork/${id}`);
  };

  return (
    <section className="other-gallery">
      <h2 className="other-gallery__title">
        <p className="other-gallert__sub-title">Here some more</p>
        Other works for you
      </h2>
      <div
        className={loading ? 'other-gallery__grid-none' : 'other-gallery__grid'}
      >
        {loading ? (
          <Loader />
        ) : (
          otherArtwors.map((artwork) => (
            <div
              key={artwork.id}
              onClick={() => handleCardClick(artwork.id)}
              style={{ cursor: 'pointer' }}
            >
              <OtherCard
                id={artwork.id}
                title={artwork.title}
                artist_title={artwork.artist_title}
                image_id={artwork.image_id}
                is_public_domain={artwork.is_public_domain}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default OtherGallery;
