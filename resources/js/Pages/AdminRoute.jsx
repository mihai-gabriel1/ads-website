import React, { useState } from "react";

const AdminRoute = (props) => {
    return (
        <div className="flex-column">
            <p>Welcome to the admin dashboard boiiis</p>
            {props.username}, {props.why}
            <div className="flex-column text-center">
                <p className="mt-12 pt-12 hover:color-sky-200">
                    Ok take me back to the dashboard now pliz.
                </p>
                <button className="bg-sky-700 text-white p-5 rounded-2xl mt-4 hover:bg-yellow-300 hover:text-black">
                    <a href="/">k, click me</a>
                </button>
            </div>
        </div>
    );
};

export default AdminRoute;
