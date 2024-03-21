import React, { useEffect, useState } from 'react';
import LineGraphApexCharts from '../components/LineGraphApexCharts';
import fetchCryptoData from '../components/fetchCryptoData';

const FavoritesComponent = () => {
  const [favorites, setFavorites] = useState([]);
  const [cryptoData, setCryptoData] = useState({});
  const [move, setMove] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found, please login.');
      return;
    }

    fetch('http://localhost:3001/api/user/favorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setFavorites(data);
    })
    .catch(error => {
      console.error('Error fetching favorites:', error);
      setError('Failed to fetch favorites');
    });
  }, []);

  useEffect(() => {
    const fetchDataForFavorites = async () => {
      const data = {};
      const moveData = {};
      for (const favorite of favorites) {
        const { restructuredData, move } = await fetchCryptoData(favorite);
        data[favorite] = restructuredData;
        moveData[favorite] = { move };
      }
      setCryptoData(data);
      setMove(moveData);
    };

    if (favorites.length > 0) {
      fetchDataForFavorites();
    }
  }, [favorites]);

  return (
    <div>
      <h2>My Favorites</h2>
      {error && <p>{error}</p>}
      {favorites.map((favorite) => (
        cryptoData[favorite] && (
          <LineGraphApexCharts
            key={favorite}
            stockName={favorite}
            rawData={cryptoData[favorite]}
            move={move[favorite]?.move}
          />
        )
      ))}
    </div>
  );
};

export default FavoritesComponent;
