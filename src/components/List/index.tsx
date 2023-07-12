import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { fetchFlightList, selectAllFlightList, selectCityInfo, selectDate, selectFetchFlightInfoStatus } from './listSlice';
import './index.scss';


export default function List () {
    const dispatch = useDispatch()
    const flightInfoList = useSelector(selectAllFlightList);
    // const fetchFlightInfoStatus = useSelector(selectFetchFlightInfoStatus);
    const date = useSelector(selectDate);
    const { startCity, endCity } = useSelector(selectCityInfo);
  
    useEffect(() => {

        dispatch(fetchFlightList({ date, startCity, endCity }) as any);
    }, [dispatch, date, startCity, endCity]);

    return (
        <ul className="list-container">
            {
                flightInfoList.map((flight) => {
                    return <li key={flight.flight} className="list-row">
                        <div className="list-info">
                            <div className="airpot-info">
                                <div className="from-info">
                                    <p className="from-time">{flight.startTime}</p>
                                    <p className="from-place">{flight.startPosition}</p>
                                </div>
                                <div className="time-info">
                                    <p className="duration">
                                        <span className="time">{flight.duration}</span>
                                    </p>
                                    <div className="plane-info">
                                        <div className="arrow-right"></div>
                                        <span className="plane-info-icon"></span>
                                    </div>
                                    <p>
                                        <span className="stop-city"></span>
                                    </p>
                                </div>
                                <div className="to-info">
                                    <p className="to-time">{flight.endTime}</p>
                                    <p className="to-place">{flight.endPosition}</p>
                                </div>
                            </div>
                            <div className="company-info">
                                <span className="company">{flight.flight + ' ' + flight.planeType}</span>
                            </div>
                        </div>
                        <div className="price">
                            <p className="price-info">{'¥' + flight.price}</p>
                            <p className="more-info"></p>
                            <p className="more-info"></p>
                            <p className="more-info"></p>
                            <p className="more-info"></p>
                            
                        </div>
                    </li>
                })
            }
        </ul>
    )
}