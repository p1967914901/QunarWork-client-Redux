import React, { useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../../hooks";

import './index.scss';


const RANK_TYPE = {
    RECOMMEND: 'recommend',
    TIME: 'time',
    PRICE: 'price'
}

interface FilterPropsType {
    isShow: boolean;
}

export default observer((props:FilterPropsType) => {
    const [rankTypeBySelect, setRankTypeBySelect] = useState<'recommend' | 'time' | 'price'>('recommend');
    const [priceFilterText, setPriceFilterText] = useState<'价格' | '从低到高' | '从高到低'>('价格');
    const [timeFilterText, setTimeFilterText] = useState<'时间' | '从早到晚' | '从晚到早'>('时间');

    const store = useStore('list');
    const { isShow } = props;

    const handleClickRecommend = () => {
        if (rankTypeBySelect === 'price') {
            setPriceFilterText('价格');
        } else if (rankTypeBySelect === 'time') {
            setTimeFilterText('时间');
        }
        setRankTypeBySelect('recommend');
        store.sortByRecommend();
    }

    const handleClickTime = () => {
        if (rankTypeBySelect === 'price') {
            setPriceFilterText('价格');
        }
        setRankTypeBySelect('time');
        
        if (['时间', '从晚到早'].includes(timeFilterText)) {
            setTimeFilterText('从早到晚');
            store.sortByTime(true);
        } else {
            setTimeFilterText('从晚到早');
            store.sortByTime(false);
        }
    }

    const handleClickPrice = () => {
        if (rankTypeBySelect === 'time') {
            setTimeFilterText('时间');
        }
        setRankTypeBySelect('price');
        if (['价格', '从高到低'].includes(priceFilterText)) {
            setPriceFilterText('从低到高');
            store.sortByPrice(true);
        } else {
            setPriceFilterText('从高到低');
            store.sortByPrice(false);
        }
    }

    return (
        <div className={"list-filter " + (isShow ? '' : 'hide')}>
            <div 
                className={"rank " + (rankTypeBySelect === RANK_TYPE.RECOMMEND ? 'active' : '')}
                onClick={handleClickRecommend}
            >
                推荐
            </div>
            <div 
                className={"rank " + (rankTypeBySelect === RANK_TYPE.TIME ? 'active' : '')}
                onClick={handleClickTime}
            >
                {timeFilterText}
            </div>
            <div 
                className={"rank " + (rankTypeBySelect === RANK_TYPE.PRICE ? 'active' : '')}
                onClick={handleClickPrice}
            >
                {priceFilterText}
            </div>
        </div>
    ) 
})