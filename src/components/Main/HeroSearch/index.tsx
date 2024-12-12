import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import search from '../../../assets/Search/search.svg';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: number;
  title: string;
  artist: string;
}

const HeroSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/modsen-tech/artwork/${id}`);
  };

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchResults = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }
    try {
      setIsSearching(true);
      setError(null);

      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
          searchQuery,
        )}&fields=id,title,artist_title&limit=5`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Ошибка загрузки данных.');
      }

      setResults(
        data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          artist: item.artist_title || 'Unknown',
        })),
      );
    } catch (err) {
      setError('Ошибка поиска. Попробуйте снова.');
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchResults(value);
  };

  return (
    <section className="hero-search">
      <div className="hero-search__content">
        <h2 className="hero-search__title">
          let's find some{' '}
          <span className="hero-search__title--highlight">art</span> here!
        </h2>
        <div className="hero-search__input-wrapper">
          <input
            type="text"
            className="hero-search__input"
            placeholder="Search Art, Artist, Work..."
            value={query}
            onChange={handleInputChange}
          />
          <button className="hero-search__button">
            <img
              className="hero-search__button-icon"
              src={search}
              alt="button-icon"
            />
          </button>
        </div>
        {isSearching && (
          <div className="hero-search__loading">Searching...</div>
        )}
        {error && <div className="hero-search__error">{error}</div>}
        {results.length > 0 && (
          <ul className="hero-search__results">
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => handleClick(result.id)}
                className="hero-search__result-item"
              >
                <strong>{result.title}</strong> by {result.artist}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default HeroSearch;
