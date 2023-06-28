import React, { useState } from "react";
import axios from "axios";

const CreateAd = ({ onAdCreated }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the form data to the backend API endpoint using Axios
        axios
            .post("/api/create-ad", { title, body })
            .then((response) => response.data)
            .then((data) => {
                // Call the onAdCreated function passed from the parent component
                onAdCreated(data);

                // Reset the input fields after submitting the post.
                setTitle("");
                setBody("");

                // Redirect to homepage
                window.location.href = "/";
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            {/* <div className="create-ad-wrapper flex-column">
                <p className="text-white text-2xl">Create a post!</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="body">Body:</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={handleBodyChange}
                        ></textarea>
                    </div>
                    <button
                        className="bg-blue-500 p-1 rounded mt-2"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div> */}
        </div>
    );
};

export default CreateAd;
