import React, {useEffect, useState} from "react";
import '../index.css';
import { useParams } from "react-router-dom";
import Review from "../components/Review";


const FoodLocation = () => {
    const [foodLocationInformation, setFoodLocationInformation] = useState({});
    const [foodLocationSummaryInformation, setFoodLocationSummaryInformation] = useState({});
    // const [dishesInformation, setDishesInformation] = useState([]);
    // const [viewDishes, setViewDishes] = useState(false);
    const [viewReviews, setViewReviews] = useState(false);
    const [reviewIDs, setReviewIDs] = useState([]);

    const [showPrice, setShowPrice] = useState(false);
    const [showType, setShowType] = useState(false);
    const [showIsHalal, setShowIsHalal] = useState(false);
    const [showIsGlutenFree, setShowIsGlutenFree] = useState(false);
    const [showIsVegetarian, setShowIsVegetarian] = useState(false);
    const [dishes, setDishes] = useState([]);



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

    const fetchFoodlocationSummaryInformation = async (id) => {
        try {
            const response = await fetch('/api/foodlocationsummary/get-foodlocationsummary-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    foodLocationSummaryID: id,

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
            const reviewIDs = result.data;
            if (typeof reviewIDs === "object") {
                setReviewIDs(reviewIDs);
            }
            console.log('Information retrieved successfully:', result.data);
        } catch (e) {
            console.error('Error retrieving review information:', e);
        }
    };

    const fetchDishesWithFields = async () => {
        try {
            const response = await fetch('/api/dish/get-dishes-with-fields', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: routeParams.name,
                    address: routeParams.address,
                    postalCode: routeParams.postalcode,
                    country: routeParams.country,
                    showPrice: showPrice,
                    showType: showType,
                    showIsHalal: showIsHalal,
                    showIsGlutenFree: showIsGlutenFree,
                    showIsVegetarian: showIsVegetarian,
                }),
            });


            const result = await response.json();
            if (!response.ok || !result.success) {
                console.error(`Error retrieving dish information: ${response.status} ${response.statusText}`);
                return false;
            }
            console.log('Information retrieved successfully:', result);
            setDishes(result.data);
            return true;
        } catch (e) {
            console.error('Error retrieving user information:', e);
            return false;
        }
    };

    const handleSubmitDishFields = async (e) => {
        e.preventDefault()

        if (await fetchDishesWithFields()) {

            // alert("Success");
        } else {
            alert("Dishes cannot be shown now");
        }

    }

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
            <div>
                <form onSubmit={handleSubmitDishFields}>
                    <input
                        type="checkbox"
                        onChange={() => setShowPrice(!showPrice)}
                        checked={showPrice}
                    />
                    Show price

                    <input
                        type="checkbox"
                        onChange={() => setShowType(!showType)}
                        checked={showType}
                    />
                    Show type

                    <input
                        type="checkbox"
                        onChange={() => setShowIsHalal(!showIsHalal)}
                        checked={showIsHalal}
                    />
                    Show is halal

                    <input
                        type="checkbox"
                        onChange={() => setShowIsGlutenFree(!showIsGlutenFree)}
                        checked={showIsGlutenFree}
                    />
                    Show is gluten free

                    <input
                        type="checkbox"
                        onChange={() => setShowIsVegetarian(!showIsVegetarian)}
                        checked={showIsVegetarian}
                    />
                    Show is vegetarian

                    <button type="submit" className="button">
                        Show dishes
                    </button>
                </form>

                {dishes.length > 0 && (
                    <div>
                        <h2>Dishes</h2>
                        <div className="dishes-list">
                            {dishes.map((dish, index) => (
                                <div key={index} className="dish-card">
                                    <h3>{dish.dishName}</h3>
                                    {dish.price !== undefined ? <div>Price: {dish.price}</div> : ""}
                                    {dish.type !== undefined ? <div>Type: {dish.type}</div> : ""}
                                    {dish.isHalal !== undefined ? <div>Halal: {dish.isHalal ? "Yes" : "No"}</div> : ""}
                                    {dish.isGlutenFree !== undefined ? <div>Gluten-Free: {dish.isGlutenFree ? "Yes" : "No"}</div> : ""}
                                    {dish.isVegetarian !== undefined ? <div>Vegetarian: {dish.isVegetarian ? "Yes" : "No"}</div> : ""}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <button className="button" onClick={() => setViewReviews(!viewReviews)}>
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
        </div>
    )
}

export default FoodLocation;