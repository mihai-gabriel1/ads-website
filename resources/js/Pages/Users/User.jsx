import React from "react";

const User = () => {
    return (
        <div className="flex-column text-center">
            <p>Welcome to the user dashboard.</p>
            <p className="mt-1">Take me to the homepage.</p>
            <button className="mt-5 bg-sky-500 text-black p-2 rounded-xl">
                <a href="/">K, click me</a>
            </button>
        </div>
    );
};

export default User;
