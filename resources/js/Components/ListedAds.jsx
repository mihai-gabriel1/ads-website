import React, { useEffect, useState } from "react";
// import axios from "axios";

const ListedAds = ({ ads: initialAds, onAdRemoved, auth }) => {
    const [ads, setAds] = useState(initialAds);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAds = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/get-ads");
            setAds(response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // axios
    //     .get("api/get-ads")
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch(({ response }) => {
    //         console.log(response.data.message);
    //     });

    useEffect(() => {
        fetchAds();
    }, []);

    const handleRemoveAd = (adId) => {
        axios
            .delete(`/api/remove-ad/${adId}`)
            .then((response) => {
                onAdRemoved(adId);
                setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className="w-[600px] ads-container">
            <p className="text-2xl mb-2">Currently Listed Ads</p>
            {isLoading ? (
                <p>Loading ads...</p>
            ) : (
                <ul>
                    {ads.map((ad) => (
                        <li key={ad.id}>
                            <p className="text-xl bold-50 ad-title">
                                {ad.title}
                            </p>
                            <p className="body-p">{ad.body}</p>
                            <p className="ad-created-at">
                                Created at: {formatDate(ad.created_at)}
                            </p>
                            {auth.user && (
                                <button
                                    className="bg-red-500 p-1 rounded mt-2"
                                    onClick={() => handleRemoveAd(ad.id)}
                                >
                                    Remove
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListedAds;
