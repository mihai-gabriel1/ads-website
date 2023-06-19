import React, { useState } from "react";

const CreateAd = () => {
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

        // Send the form data to the backend API endpoint
        fetch("/api/create-ad", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Optional: handle the response data, display success message, etc.
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        // Reset the input fields after submitting
        setTitle("");
        setBody("");
    };

    return (
        <div>
            <div className="create-ad-wrapper flex-column">
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
            </div>
        </div>
    );
};

export default CreateAd;
