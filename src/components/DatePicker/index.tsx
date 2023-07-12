import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../../hooks";
import moreImg from '@/assets/bg-calendar.png';
import './index.scss';
import { useMount } from "../../hooks";
import getUrlParams from "../../untils/getUrlParams";
import { fetctDateList, fetchFlightList } from "../../api";
import getCurrentDate from "../../untils/getCurrentDate";
import axios from '../../untils/axios';
import { FETCH_FLIGHT_LIST_STATUS } from "../../constant";


export default  observer(() => {
    let store = useStore('list');

    const { date, dateList } = store;

    const [transformX, setTransformX] = useState(2); 

    useMount(async () => {
        const urlParams = getUrlParams();
        const date = store.date || urlParams['date'] || getCurrentDate();
        const startCity = urlParams['startCity'];
        const endCity = urlParams['endCity'];
        const response = await axios.get('/get_date_list', { params: { date, startCity, endCity } });
        if (response.status === 200) {
            console.log(response)
            store.setDateList(response.data);
            if (response.data.length) {
                store.setStatus(FETCH_FLIGHT_LIST_STATUS.FULFILLED as 'init');
            } else {
                store.setStatus(FETCH_FLIGHT_LIST_STATUS.INIT as 'init');
            }
        }
        store.setDate(date);
        store.setCityInfo({ startCity, endCity });
    });

    useEffect(() => {
        const transformIndex = dateList.findIndex(item => item.date === store.date);
        setTransformX(transformIndex > 2 ? transformIndex - 2 : 0);
    }, [date, store]);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = async (e) => {
        const index = Number(e.currentTarget.getAttribute('data-index'));
        const urlParams = getUrlParams();

        const startCity = urlParams['startCity'];
        const endCity = urlParams['endCity'];
        store.setStatus(FETCH_FLIGHT_LIST_STATUS.PENDING as 'init');
        try {
            const dateList = await fetctDateList({ date: store.dateList[index].date, startCity, endCity });
            const flightInfoList = await fetchFlightList({ date: store.dateList[index].date, startCity, endCity });
            store.setDateList(dateList);
            store.setFlightInfoList(flightInfoList);
            store.setStatus(FETCH_FLIGHT_LIST_STATUS.FULFILLED as 'init');
        } catch(e) {
            store.setStatus(FETCH_FLIGHT_LIST_STATUS.REJECTED as 'init');
        }
    }

    return (
        <div className="date-bar">
            <div className="date-list">
                <div className={"date-list-content transform-" + transformX}>
                    {
                        store.dateList.map((item, index) => {
                            return (
                                <div className={`date-item ${item.date === store.date ? 'active' : ''}`} key={item.date} data-index={index} onClick={handleClick.bind(index)}>
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
})