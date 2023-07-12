import React from "react";

import './index.scss';

interface FlightServerErrorPropsType {
    isShow: boolean;
}

export default function FlightServerError (props: FlightServerErrorPropsType) {
    const { isShow } = props;

    return (
        <div className={`flight-server-err ${isShow ? '' : 'hide'}`}><img src="https://source.qunarzz.com/site/images/wap/touch/images/v2/images2x/load_fail.png" />
            <div className="flight-server-err-text">没有查询到符合条件的航班</div>
        </div>
    )
}