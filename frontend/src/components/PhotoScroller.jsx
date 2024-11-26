import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatISODate } from "../Helper";
import { UserContext } from "../contexts/UserContext";

const PhotoScroller = ({ photos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likes, setLikes] = useState([]);
    const [likeStatus, setLikeStatus] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        setCurrentIndex(0);
    }, [photos]);

    useEffect(() => {
        const fetchLikesData = async () => {
            const likesData = await Promise.all(photos.map(photo => fetchLikes(photo.photoID)));
            setLikes(likesData);

            const likeStatusData = await Promise.all(photos.map(photo => fetchLikeStatus(photo.photoID)));
            setLikeStatus(likeStatusData);
        };

        if (photos.length > 0) {
            fetchLikesData();
        }
    }, [photos]);

    const goLeft = () => {
        setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1));
    };

    const goRight = () => {
        setCurrentIndex(prevIndex => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0));
    };

    const handleLike = async (photoID, index) => {
        try {
            const newStatus = !likeStatus[index];
            const apiEndpoint = newStatus ? "/api/photos/like" : "/api/photos/delete-like";

            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photoID, userID: user.userID }),
            });

            if (response.ok) {
                const updatedLikes = [...likes];
                updatedLikes[index] = updatedLikes[index] + (newStatus ? 1 : -1);
                setLikes(updatedLikes);

                const updatedStatus = [...likeStatus];
                updatedStatus[index] = newStatus;
                setLikeStatus(updatedStatus);
            }
        } catch (err) {
            console.error("Error updating like status:", err);
        }
    };

    const fetchLikes = async (photoID) => {
        try {
            const response = await fetch("/api/photos/get-photo-likes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photoID }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.numLikes;
            } else {
                console.error(`Error fetching photo likes: ${response.status}`);
                return 0;
            }
        } catch (e) {
            console.error("Error fetching photo likes:", e);
            return 0;
        }
    };

    const fetchLikeStatus = async (photoID) => {
        try {
            const response = await fetch("/api/photos/photo-liked-by-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photoID: photoID, userID: user.userID }),
            });

            const data = await response.json();
            return response.ok && data.isLiked;
        } catch (e) {
            console.error("Error fetching photo like status:", e);
            return false;
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-primary me-2"
                    onClick={goLeft}
                >
                    &#8249;
                </button>
                <div
                    className="d-flex overflow-hidden"
                    style={{
                        width: "80%",
                        height: "400px",
                        position: "relative",
                    }}
                >
                    <div
                        className="d-flex transition-all"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: "transform 0.3s ease-in-out",
                        }}
                    >
                        {photos.map((photo, index) => (
                            <div
                                key={index}
                                className="d-flex flex-column align-items-center"
                                style={{
                                    flex: "0 0 100%",
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    src={photo.imageURL}
                                    alt={`Photo ${index + 1}`}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "60%",
                                        borderRadius: "10px",
                                    }}
                                />
                                <div className="mt-2">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button
                                            className={`btn p-0 ${likeStatus[index] ? "text-danger" : "text-muted"}`}
                                            onClick={() => handleLike(photo.photoID, index)}
                                            style={{fontSize: "1.5rem", background: "none", border: "none"}}
                                        >
                                            <i className={`bi ${likeStatus[index] ? "bi-heart-fill" : "bi-heart"}`}></i>
                                        </button>
                                        <span
                                            className={`ms-2 fs-4 ${likeStatus[index] ? "text-danger" : "text-dark"} fw-bold`}
                                            id="like-count"
                                        >
                                            {likes[index]}
                                        </span>
                                    </div>
                                    <p className="mb-1">
                                        <strong>Description:</strong> {photo.description}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Timestamp:</strong> {formatISODate(photo.photoTimestamp)}
                                    </p>
                                    <p className="mb-1">
                                        <strong>{photo.foodLocationName}</strong>
                                    </p>
                                    <p className="mb-1">
                                        <strong>{`${photo.address}, ${photo.city}, ${photo.country} ${photo.postalCode}`}</strong>
                                    </p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="btn btn-primary ms-2"
                    onClick={goRight}
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default PhotoScroller;
