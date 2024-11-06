class ReviewsDish {
    constructor(reviewID, dishName, dishRating, foodLocationName, address, postalCode, country) {
        this._reviewID = reviewID;
        this._dishName = dishName;
        this._dishRating = dishRating;
        this._foodLocationName = foodLocationName;
        this._address = address;
        this._postalCode = postalCode;
        this._country = country;
    }

    // Getter and Setter for reviewID
    get getReviewID() {
        return this._reviewID;
    }
    set setReviewID(value) {
        this._reviewID = value;
    }

    // Getter and Setter for dishName
    get getDishName() {
        return this._dishName;
    }
    set setDishName(value) {
        this._dishName = value;
    }

    // Getter and Setter for dishRating
    get getDishRating() {
        return this._dishRating;
    }
    set setDishRating(value) {
        if (value < 1 || value > 5) {
            console.log("Dish rating must be between 1 and 5.");
        } else {
            this._dishRating = value;
        }
    }

    // Getter and Setter for foodLocationName
    get getFoodLocationName() {
        return this._foodLocationName;
    }
    set setFoodLocationName(value) {
        this._foodLocationName = value;
    }

    // Getter and Setter for address
    get getAddress() {
        return this._address;
    }
    set setAddress(value) {
        this._address = value;
    }

    // Getter and Setter for postalCode
    get getPostalCode() {
        return this._postalCode;
    }
    set setPostalCode(value) {
        this._postalCode = value;
    }

    // Getter and Setter for country
    get getCountry() {
        return this._country;
    }
    set setCountry(value) {
        this._country = value;
    }
}
