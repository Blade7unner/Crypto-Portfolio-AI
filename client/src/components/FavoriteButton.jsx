import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_MUTATION, REMOVE_FAVORITE_MUTATION } from '../utils/mutations';
import { jwtDecode } from 'jwt-decode'; // Corrected import

const FavoriteButton = ({ stockName, userFavorites, setUserFavorites }) => {
    const [addFavorite] = useMutation(ADD_FAVORITE_MUTATION);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE_MUTATION);
    
    // Determine if the current item is saved
    const isSaved = userFavorites.includes(stockName);

    const handleFavoriteToggle = async () => {
        // Assuming your token is stored in localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.log("No token found");
            // Handle the case where the token isn't found, e.g., redirect to login
            return;
        }
        
        // Decode the token to get the user's details
        const decoded = jwtDecode(token);
        const userEmail = decoded.email; // Adjust based on the actual key used in your token payload
        
        if (isSaved) {
            // Remove favorite
            await removeFavorite({
                variables: { favoriteId: stockName }
            });
            // Update local UI state
            setUserFavorites(prevFavorites => prevFavorites.filter(fav => fav !== stockName));
        } else {
            // Add favorite
            await addFavorite({
                variables: { favItem: stockName, email: userEmail }
            });
            // Update local UI state
            setUserFavorites(prevFavorites => [...prevFavorites, stockName]);
        }
    };
    
    return (
        <button onClick={handleFavoriteToggle}>
            {isSaved ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
};

export default FavoriteButton;
