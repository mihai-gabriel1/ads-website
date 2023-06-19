import React, { useEffect, useState } from "react";

const ListedAds = () => {
    const [ads, setAds] = useState([]);

    const fetchAds = async () => {
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
        }
    };

    useEffect(() => {
        fetchAds();
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
