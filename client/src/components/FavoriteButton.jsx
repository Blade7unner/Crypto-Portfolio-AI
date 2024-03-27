import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FAVORITE_MUTATION, REMOVE_FAVORITE_MUTATION } from '../utils/mutations';
import { GET_USER_FAVORITES } from '../utils/queries';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const FavoriteButton = ({ stockName }) => {
    const { data, refetch } = useQuery(GET_USER_FAVORITES);
    const [addFavorite] = useMutation(ADD_FAVORITE_MUTATION, {
        onCompleted: () => refetch(),
    });
    const [removeFavorite] = useMutation(REMOVE_FAVORITE_MUTATION, {
        onCompleted: () => refetch(),
    });
    const [showModal, setShowModal] = useState(false);
    const userFavorites = data?.favorites || [];
    const isSaved = userFavorites.includes(stockName);

    const handleFavoriteToggle = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowModal(true);
            return;
        }
    
        if (isSaved) {
            await removeFavorite({ variables: { stockName } });
        } else {
            await addFavorite({ variables: { stockName } });
        }
    };

    return (
        <>
        <button className='bg-orange-400 text-2xl rounded-lg w-[270px] p-2 text-white items-center flex justify-center mt-4 hover:bg-green-400' onClick={handleFavoriteToggle}>
            {isSaved ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
                    <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}>
                    <p>Please <Link to="/login" className="mt-5 text-blue-500 underline" onClick={() => setShowModal(false)}>log in</Link> or <Link to="/signup" className="mt-5 text-blue-500 underline" onClick={() => setShowModal(false)}>sign up</Link> before using this feature.</p>
                </Modal>
    </>
    );
};

export default FavoriteButton;
