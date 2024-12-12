import React from 'react';
import './style.css';
import { useSaveArtwork } from '../../useSaveArtwork';

interface CardProps {
  id: number;
  title: string;
  artistTitle: string;
  imageId: string;
  isPublicDomain: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  artistTitle,
  imageId,
  isPublicDomain,
}) => {
  const { isSaved, toggleSaveArtwork } = useSaveArtwork(id);

  return (
    <div className="card">
      <div className="card__image">
        <img
          src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
          alt={title}
        />
      </div>
      <div className="card__content">
        <div className="card__info">
          <h3 className="card__title">{title}</h3>
          <p className="card__author">
            {artistTitle ? artistTitle : 'Author unknown'}
          </p>
          <p className="card__status">
            {isPublicDomain ? 'Public' : 'Private'}
          </p>
        </div>
        <div className="card__saved" onClick={(e) => e.stopPropagation()}>
          <button
            className={`${isSaved ? 'card__bookmark-active' : 'card__bookmark'}`}
            onClick={toggleSaveArtwork}
            aria-label="Bookmark"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Card;
