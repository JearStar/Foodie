import React, {useEffect, useState} from "react";



const FoodLocation = () => {
    const [foodLocationInformation, setFoodLocationInformation] = useState({});

    // Fetch user information on component mount
    useEffect(() => {
        fetchFoodlocationInformation();
    }, []);

    const fetchFoodlocationInformation = async () => {
        try {
            const response = await fetch('/api/foodlocation/get-foodlocation-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FoodLocationSummaryID: "cb99dc29-cd12-4840-8bdc-a5c495b9af9e"
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Information retrieved successfully:', result);
            setFoodLocationInformation(result.data[0]); // Set user info in state
        } catch (e) {
            console.error('Error retrieving food location information:', e);
        }
    };
    return (
        <div>
            <h1>
                {foodLocationInformation.name}
            </h1>
            <div>
                {foodLocationInformation.address} {foodLocationInformation.city} {foodLocationInformation.country}
            </div>
        </div>

    )
}

export default FoodLocation