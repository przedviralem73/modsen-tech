import { useEffect, useState, useCallback } from 'react';

export const useSaveArtwork = (id: number) => {
  const [isSaved, setIsSaved] = useState(false);

  const checkSavedArtworks = useCallback(() => {
    const savedArtworks = JSON.parse(
      localStorage.getItem('savedArtworks') || '[]',
    );
    setIsSaved(savedArtworks.includes(id));
  }, [id]);

  const toggleSaveArtwork = useCallback(() => {
    const savedArtworks = JSON.parse(
      localStorage.getItem('savedArtworks') || '[]',
    );
    if (savedArtworks.includes(id)) {
      const updatedArtworks = savedArtworks.filter(
        (savedId: number) => savedId !== id,
      );
      localStorage.setItem('savedArtworks', JSON.stringify(updatedArtworks));
      setIsSaved(false);
    } else {
      savedArtworks.push(id);
      localStorage.setItem('savedArtworks', JSON.stringify(savedArtworks));
      setIsSaved(true);
    }

    window.dispatchEvent(new Event('storage'));
  }, [id]);

  useEffect(() => {
    checkSavedArtworks();

    const handleStorageChange = () => {
      checkSavedArtworks();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkSavedArtworks]);

  return { isSaved, toggleSaveArtwork };
};
