import React from "react";
import moreImg from '@/assets/bg-calendar.png';

import './index.scss';

interface DatePickerPropsType {
    date: string;
}

export default function DatePicker (props: DatePickerPropsType) {
    const { date } = props;

    const dateList = [
        { date: '07-01', week: '周六', price: '810' },
        { date: '07-02', week: '周日', price: '910' },
        { date: '07-03', week: '周一', price: '840' },
        { date: '07-04', week: '周二', price: '876' },
        { date: '07-05', week: '周三', price: '835' },
        { date: '07-06', week: '周四', price: '874' }, 
        { date: '07-07', week: '周五', price: '825' }, 
        { date: '07-08', week: '周六', price: '890' }, 
        { date: '07-09', week: '周日', price: '855' }, 
    ]

    return (
        <div className="date-bar">
            <div className="date-list">
                <div className="date-list-content">
                    {
                        dateList.map(item => {
                            return (
                                <div className={`date-item ${item.date === date ? 'active' : ''}`} key={item.date}>
                                    <p className="d-text">{item.date}</p>
                                    <p className="d-text">{item.week}</p>
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