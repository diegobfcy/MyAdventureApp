import React, { useEffect, useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import './ReviewCardContainer';
import { db } from '../../firebaseConfig'; // Ajusta el path a tu archivo de configuración
import { collection, getDocs } from "firebase/firestore";

const fetchReviewsFromDb = async () => {
    const q = collection(db, 'Reseñas');
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
};
function ReviewsContainer() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await fetchReviewsFromDb();
                setReviews(fetchedReviews);
            } catch (error) {
                console.error("Error fetching reviews: ", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="reviews-list-container">
            {reviews.map(review => 
                <ReviewCard key={review.id} data={review} />
            )}
        </div>
    );
}

export default ReviewsContainer;