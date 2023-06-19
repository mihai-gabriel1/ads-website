import React, { useState } from "react";
import CreateAd from "@/Components/CreateAd";
import Header from "@/Components/Header";
import ListedAds from "@/Components/ListedAds";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [ads, setAds] = useState([]);

    const handleAdCreated = (ad) => {
        setAds((prevAds) => [...prevAds, ad]);
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="nav-wrapper">
                <p className="placeholder-logo">Logo</p>
                <div className="navbar">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="header">
                <Header />
            </div>
            <div className="listed-ads gap-12">
                <CreateAd onAdCreated={handleAdCreated} />
                <ListedAds ads={ads} />
            </div>
        </>
    );
}
