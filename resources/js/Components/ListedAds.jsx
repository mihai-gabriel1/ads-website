import React, { useEffect, useState } from "react";

const ListedAds = ({ ads: initialAds, onAdRemoved }) => {
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
        // Send the request to remove the ad
        fetch(`/api/remove-ad/${adId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                // Call the onAdRemoved function passed from the parent component
                onAdRemoved(adId);

                // Update the ads state by filtering out the deleted ad
                setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
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
                            <button
                                className="bg-red-500 p-1 rounded mt-2"
                                onClick={() => handleRemoveAd(ad.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListedAds;
