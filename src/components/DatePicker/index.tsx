import React, { useEffect, useState } from "react";
import moreImg from '@/assets/bg-calendar.png';
import { useSelector, useDispatch } from 'react-redux';

import './index.scss';
import { useMount } from "../../hooks";
import getUrlParams from "../../untils/getUrlParams";
import { fetctDateList, selectDate, selectDateList, updateCityInfo, updateDate } from "../List/listSlice";
import getCurrentDate from "../../untils/getCurrentDate";


export default function DatePicker () {
    // const { date } = props;
    const dispath = useDispatch();
    const dateFromStore = useSelector(selectDate);
    const dateList = useSelector(selectDateList);
    const [transformX, setTransformX] = useState(2); 

    useMount(() => {
        const urlParams = getUrlParams();
        const date = dateFromStore || urlParams['date'] || getCurrentDate();
        const startCity = urlParams['startCity'];
        const endCity = urlParams['endCity'];
        dispath(fetctDateList({ date, startCity, endCity }) as any);
        dispath(updateDate(date));
        dispath(updateCityInfo({ startCity, endCity }));
    });

    useEffect(() => {
        const index = dateList.findIndex(item => item.date === dateFromStore);
        setTransformX(index > 2 ? index - 2 : 0);
    }, [dateFromStore, dateList]);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const index = Number(e.currentTarget.getAttribute('data-index'));
        const urlParams = getUrlParams();

        const startCity = urlParams['startCity'];
        const endCity = urlParams['endCity'];
        dispath(fetctDateList({ date: dateList[index].date, startCity, endCity }) as any);
        dispath(updateDate(dateList[index].date));

    }

    return (
        <div className="date-bar">
            <div className="date-list">
                <div className={"date-list-content transform-" + transformX}>
                    {
                        dateList.map((item, index) => {
                            return (
                                <div className={`date-item ${item.date === dateFromStore ? 'active' : ''}`} key={item.date} data-index={index} onClick={handleClick.bind(index)}>
                                    <p className="d-text">{item.date.slice(5)}</p>
                                    <p className="d-text">{'周' + item.week}</p>
                                    <p className="d-text">
                                        <span className="d-price">￥</span>
                                        {item.price}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="more-date">
                <img src={moreImg} />
                <p className="more-date-text">更多日期</p>
            </div>
        </div>
    )
}