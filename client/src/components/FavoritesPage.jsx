import React, { useEffect, useState, useContext } from 'react';
import LineGraphApexCharts from '../components/LineGraphApexCharts';
import fetchCryptoData from '../components/fetchCryptoData';
// Import your Auth Context or another method of accessing auth state
// import { AuthContext } from '../contexts/AuthContext';

const FavoritesPage = () => {
    const [userFavorites, setUserFavorites] = useState([]);
    const [cryptoData, setCryptoData] = useState({});
    const [move, setMove] = useState({});
    // If using AuthContext to track login state
    // const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        // Load favorites from localStorage on mount or upon login state change
        const storedFavorites = localStorage.getItem('userFavorites');
        if (storedFavorites) {
            setUserFavorites(JSON.parse(storedFavorites));
        }
    }, [/* isLoggedIn */]); // Add a dependency on user login state here if available

    useEffect(() => {
        const fetchDataForFavorites = async () => {
            const data = {};
            const moveData = {};
            for (const stockName of userFavorites) {
                try {
                    const { restructuredData, move } = await fetchCryptoData(stockName); // Ensure this function is correctly implemented
                    data[stockName] = restructuredData;
                    moveData[stockName] = move;
                } catch (error) {
                    console.error(`Failed to fetch data for ${stockName}:`, error);
                }
            }
            setCryptoData(data);
            setMove(moveData);
        };

        if (userFavorites.length > 0) {
            fetchDataForFavorites();
        }
    }, [userFavorites]);

    return (
        <div>
            <h2>Your Favorites</h2>
            <ul>
                {userFavorites.length > 0 ? (
                    userFavorites.map((stockName, index) => (
                        <li key={index}>
                            {cryptoData[stockName] && (
                                <LineGraphApexCharts
                                    stockName={stockName}
                                    rawData={cryptoData[stockName]}
                                    move={move[stockName]}
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <p>You have no favorite stocks added.</p>
                )}
            </ul>
        </div>
    );
};

export default FavoritesPage;
