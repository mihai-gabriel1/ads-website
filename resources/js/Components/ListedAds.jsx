import React, { useEffect, useState } from "react";

const ListedAds = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        // Fetch the currently listed ads from the backend API endpoint
        fetch("/api/get-ads")
            .then((response) => response.json())
            .then((data) => {
                setAds(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div className="w-[600px]">
            <p className="text-2xl mb-2">Currently Listed Ads</p>
            <ul>
                {ads.map((ad) => (
                    <li key={ad.id}>
                        <p className="text-xl bold-50 ad-title">{ad.title}</p>
                        <p className="body-p">{ad.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListedAds;
