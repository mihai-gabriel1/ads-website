import React, { useEffect, useState } from "react";

const ListedAds = ({ ads: initialAds, onAdRemoved, auth }) => {
    const [ads, setAds] = useState(initialAds);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAds = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/get-ads");
            if (response.ok) {
                const data = await response.json();
                setAds(data);
            } else {
                console.error("Error:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAds();
    }, []);

    const handleRemoveAd = (adId) => {
        fetch(`/api/remove-ad/${adId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
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
        <div className="w-[600px]">
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
