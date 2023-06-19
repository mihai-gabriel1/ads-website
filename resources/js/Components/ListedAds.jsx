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
        <div>
            <h2>Currently Listed Ads</h2>
            <ul>
                {ads.map((ad) => (
                    <li key={ad.id}>
                        <h3>{ad.title}</h3>
                        <p>{ad.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListedAds;
