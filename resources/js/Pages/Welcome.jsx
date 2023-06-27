import React, { useState } from "react";
import CreateAd from "@/Components/CreateAd";
import Header from "@/Components/Header";
import ListedAds from "@/Components/ListedAds";
import { Link, Head } from "@inertiajs/react";
import Footer from "@/Components/Footer";

export default function Welcome({ auth }) {
    const [ads, setAds] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleAdCreated = (ad) => {
        setAds((prevAds) => [...prevAds, ad]);
    };

    const handleAdRemoved = (adId) => {
        setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
    };

    const createPost = (event) => {
        event.preventDefault();

        // Send the form data to the backend API endpoint
        fetch("/api/create-ad", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ title, body }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Call the onAdCreated function passed from the parent component
                handleAdCreated(data);

                // Reset the input fields after submitting the post.
                setTitle("");
                setBody("");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="nav-wrapper">
                <p className="placeholder-logo">
                    <a href="/">Logo</a>
                </p>
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
                {auth.user && auth.user.usertype === "admin" && (
                    <form onSubmit={createPost}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="body">Body:</label>
                            <textarea
                                id="body"
                                value={body}
                                onChange={(event) =>
                                    setBody(event.target.value)
                                }
                            ></textarea>
                        </div>
                        <button
                            className="create-post-btn rounded mt-2"
                            type="submit"
                        >
                            Create a post
                        </button>
                    </form>
                )}
                <ListedAds
                    auth={auth}
                    ads={ads}
                    onAdRemoved={handleAdRemoved}
                />
            </div>
            <Footer />
        </>
    );
}
