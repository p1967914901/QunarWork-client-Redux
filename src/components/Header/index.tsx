import React from "react";

import './index.scss';
import goBackImg from '@/assets/go-back.png'; 
import { useMount } from '../../hooks';

interface HeaderPropsType {
    depCity: string;
    arrCity: string;
}

export default function Header (props: HeaderPropsType) {
    const { depCity, arrCity } = props;

    useMount(() => {
        console.log(location)
    });

    return (
        <div className="header">
            <div className="left-action">
                <img src={goBackImg}/>
            </div>
            <div className="title">
                {depCity + ' -> ' + arrCity}
            </div>
        </div>
    )
}