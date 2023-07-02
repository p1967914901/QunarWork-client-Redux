import React from "react";

import './index.scss';

export default function List () {
    const arr = Array(30).fill(0);
    return (
        <ul className="list-container">
            {
                arr.map((value) => {
                    return <li key={value} className="list-row"></li>
                })
            }
        </ul>
    )
}