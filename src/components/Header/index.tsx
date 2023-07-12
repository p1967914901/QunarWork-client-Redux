import React from "react";
import { useSelector } from 'react-redux';

import './index.scss';
import goBackImg from '@/assets/go-back.png'; 
import { selectCityInfo } from "../List/listSlice";


export default function Header () {
    
    const { startCity, endCity } = useSelector(selectCityInfo);


    return (
        <div className="header">
            <div className="left-action">
                <img src={goBackImg}/>
            </div>
            <div className="title">
                {startCity && endCity ? startCity + ' → ' + endCity : '请选择起点和终点'}
            </div>
        </div>
    )
}