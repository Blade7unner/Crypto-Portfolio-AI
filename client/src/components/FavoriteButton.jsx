import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_MUTATION, REMOVE_FAVORITE_MUTATION } from '../utils/mutations';
import { jwtDecode } from 'jwt-decode'; // Corrected import

const FavoriteButton = ({ stockName, userFavorites, setUserFavorites }) => {
    const [addFavorite] = useMutation(ADD_FAVORITE_MUTATION);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE_MUTATION);
    
    // Determine if the current item is saved
    const isSaved = userFavorites.includes(stockName);


    useEffect(() => {
        // Load favorites from localStorage on mount
        const storedFavorites = localStorage.getItem('userFavorites');
        if (storedFavorites) {
            setUserFavorites(JSON.parse(storedFavorites));
        }
    }, [setUserFavorites]);

    const handleFavoriteToggle = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found");
            return;
        }
        
        const decoded = jwtDecode(token);
        const userEmail = decoded.email;
        
        if (isSaved) {
            await removeFavorite({ variables: { stockName: stockName } });
            const updatedFavorites = userFavorites.filter(fav => fav !== stockName);
            setUserFavorites(updatedFavorites);
            localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
        } else {
            await addFavorite({ variables: { stockName: stockName, email: userEmail } });
            const updatedFavorites = [...userFavorites, stockName];
            setUserFavorites(updatedFavorites);
            localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
        }
    };

    return (
        <button onClick={handleFavoriteToggle}>
            {isSaved ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
};

export default FavoriteButton;
