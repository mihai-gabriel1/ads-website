import React from "react";

const User = () => {
    return (
        <div className="flex-column text-center">
            <p className="text-2xl mb-2">You've been logged in succesfully. </p>
            <p className="text-xl">
                Welcome to the user dashboard, [dinamic user placeholder].
            </p>
            <p className="mt-1 text">Take me to the homepage.</p>
            <button className="mt-3 bg-sky-500 text-black p-2 rounded-xl">
                <a href="/">K, click me</a>
            </button>
        </div>
    );
};

export default User;
