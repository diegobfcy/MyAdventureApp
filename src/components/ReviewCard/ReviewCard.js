import React, {useState} from 'react';
import './ReviewCard.css';
import starIcon from '../../assets/icons/starIcon.png';  // Asegúrate de tener este archivo en la ubicación adecuada

function ReviewCard({data}) {
    return (
        <div className="review-card">
            <div className="review-card-row">
                <div className="review-card-middle">
                    <div className="review-card-middle-left">
                        <img src={data.imgUrl} alt="Review" className="review-image"/>
                    </div>
                    <div className="review-card-middle-center">
                        <span className="review-name">{data.userName}</span>
                        <span className='review-coment'>{data.coment}</span>
                    </div>
                    <div className="review-card-middle-right">
                        <div className="review-rating">{data.rating} <img src={starIcon} alt="star rating" className="review-star-icon" /></div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default ReviewCard;