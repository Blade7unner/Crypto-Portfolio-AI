import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import LineGraphApexCharts from '../components/LineGraphApexCharts';
import fetchCryptoData from '../components/fetchCryptoData';
import CryptoPrices from './CryptoPrices';
import { GET_USER_FAVORITES } from '../utils/queries'; // Ensure this is defined and imported correctly

const FavoritesPage = () => {
    const [cryptoData, setCryptoData] = useState({});
    const [move, setMove] = useState({});
    const { loading, error, data } = useQuery(GET_USER_FAVORITES); // Use the adjusted query name here

    useEffect(() => {
        const fetchDataForFavorites = async () => {
            const updatedData = {};
            const updatedMoveData = {};
            const favorites = data.favorites || [];
            for (const stockName of favorites) {
                try {
                    const { restructuredData, move } = await fetchCryptoData(stockName);
                    updatedData[stockName] = restructuredData;
                    updatedMoveData[stockName] = move;
                } catch (error) {
                    console.error(`Failed to fetch data for ${stockName}:`, error);
                }
            }
            setCryptoData(updatedData);
            setMove(updatedMoveData);
        };

        if (data && data.favorites && data.favorites.length > 0) {
            fetchDataForFavorites();
        }
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div>
            <CryptoPrices />
            <h2 className="text-2xl">Your Favorites</h2>
            <ul>
            {data && data.favorites && data.favorites.length > 0 ? (
                    data.favorites.map((stockName, index) => (
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
