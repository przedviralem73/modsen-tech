import React, { useEffect, useState } from 'react';
import './style.css';
import { useSaveArtwork } from '../../useSaveArtwork';

interface OtherCardProps {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
  is_public_domain: boolean;
}

const OtherCard: React.FC<OtherCardProps> = ({
  id,
  title,
  artist_title,
  image_id,
  is_public_domain,
}) => {
  const { isSaved, toggleSaveArtwork } = useSaveArtwork(id);

  return (
    <div className="other-card">
      <div className="other-card__content">
        <div className="other-card__image">
          <img
            src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
            alt={title}
          />
        </div>
        <div className="other-card__info">
          <h3 className="other-card__title">{title}</h3>
          <p className="other-card__author">
            {artist_title ? artist_title : 'Author unknown'}
          </p>
          <p className="other-card__status">
            {is_public_domain ? 'Public' : 'Private'}
          </p>
        </div>
      </div>
      <div className="other-card__save" onClick={(e) => e.stopPropagation()}>
        <button
          className={`${isSaved ? 'card__bookmark-active' : 'card__bookmark'}`}
          aria-label="Bookmark"
          onClick={toggleSaveArtwork}
        ></button>
      </div>
    </div>
  );
};

export default OtherCard;
