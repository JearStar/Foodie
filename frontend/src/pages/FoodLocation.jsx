import React, {useEffect, useState} from "react";
import '../index.css';
import { useParams } from "react-router-dom";
import Review from "../components/Review";


const FoodLocation = () => {
    const [foodLocationInformation, setFoodLocationInformation] = useState({});
    const [foodLocationSummaryInformation, setFoodLocationSummaryInformation] = useState({});
    const [dishesInformation, setDishesInformation] = useState([]);
    const [viewDishes, setViewDishes] = useState(false);
    const [viewReviews, setViewReviews] = useState(false);
    const [reviewIDs, setReviewIDs] = useState([]);
    const routeParams = useParams();
    useEffect(() => {
        fetchFoodlocationInformation()
            .then((foodLocationSummaryID) => {
                fetchFoodlocationSummaryInformation(foodLocationSummaryID);
            })
            .catch((error) => {
                console.error('Error fetching food location info:', error);
            });
        fetchReviewIDs();
        fetchDishes(); // This can still run independently
    }, []);


    const fetchFoodlocationInformation = async () => {
        try {
            const response = await fetch('/api/foodlocation/get-foodlocation-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: routeParams.name,
                    address: routeParams.address,
                    postalCode: routeParams.postalcode,
                    country: routeParams.country
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Information retrieved successfully:', result);
            setFoodLocationInformation(result.data[0]);
            return result.data[0].foodLocationSummaryID

        } catch (e) {
            console.error('Error retrieving food location information:', e);
        }
    };

    const fetchDishes = async () => {
        try {
            const response = await fetch('/api/dish/get-dish-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: routeParams.name,
                    address: routeParams.address,
                    postalCode: routeParams.postalcode,
                    country: routeParams.country
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Information retrieved successfully:', result);
            setDishesInformation(result.data);
        } catch (e) {
            console.error('Error retrieving food location information:', e);
        }
    };

    const fetchFoodlocationSummaryInformation = async (id) => {
        try {
            const response = await fetch('/api/foodlocationsummary/get-foodlocationsummary-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    foodLocationSummaryID: id,

                    // foodLocationSummaryID: foodLocationInformation.foodLocationSummaryID,

                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Information retrieved successfully:', result);
            setFoodLocationSummaryInformation(result.data[0]);
        } catch (e) {
            console.error('Error retrieving food location information:', e);
        }
    };

    const fetchReviewIDs = async () => {
        try {
            const response = await fetch('/api/review/get-review-ids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: routeParams.name,
                    address: routeParams.address,
                    postalCode: routeParams.postalcode,
                    country: routeParams.country
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            const reviewIDs = result.data; // Json object of form [{id: (id)}, ...]
            if (typeof reviewIDs === "object") {
                setReviewIDs(reviewIDs);
            }
            console.log('Information retrieved successfully:', result.data);
        } catch (e) {
            console.error('Error retrieving review information:', e);
        }
    };

    return (
        <div className="app">
            <h1 className="mainheader">
                {foodLocationInformation.name}
            </h1>
            <div>
                {foodLocationInformation.address} {foodLocationInformation.city} {foodLocationInformation.country} {foodLocationInformation.genre}
            </div>
            <div>
                {foodLocationSummaryInformation.description}
            </div>
            <div>
                {foodLocationInformation.numReviews} reviews
            </div>
            <div>
                Rating: {foodLocationSummaryInformation.averageRating}
            </div>

            <button onClick={() => setViewDishes(!viewDishes)}>
                {!viewDishes ? "View All Dishes" : "Close"}
            </button>

            {viewDishes ? <div>
                <h2>Dishes</h2>
                <div className="dishes-list">
                    {dishesInformation.length > 0 ? (
                        dishesInformation.map((dish, index) => (
                            <div key={index} className="dish-card">
                                <h2>{dish.dishName}</h2>
                                <p>
                                    <strong>Price:</strong> ${dish.price.toFixed(2)}
                                </p>
                                <p>
                                    <strong>Type:</strong> {dish.type}
                                </p>
                                <p>
                                    <strong>Halal:</strong> {dish.isHalal ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Gluten-Free:</strong> {dish.isGlutenFree ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Vegetarian:</strong> {dish.isVegetarian ? 'Yes' : 'No'}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No dishes available to display.</p>
                    )}
                </div>
            </div> : ""}

            <button onClick={() => setViewReviews(!viewReviews)}>
                {!viewReviews ? "View All Reviews" : "Close"}
            </button>

            {viewReviews ? <div>
                <h2>Reviews</h2>
                <div className="reviews-list">
                    {reviewIDs.length > 0 ? (
                        reviewIDs.map((review, index) => (
                            <div key={index} className="review-card">
                                <Review ReviewID={review.id}/>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available to display.</p>
                    )}
                </div>
            </div> : ""}
        </div>
    )
}

export default FoodLocation;