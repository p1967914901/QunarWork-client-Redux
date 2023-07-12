import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../hooks";

import './index.scss';
import goBackImg from '@/assets/go-back.png'; 


export default observer(() => {
    
    const { startCity, endCity } = useStore('list');

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
})