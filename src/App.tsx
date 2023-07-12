import React from "react";
import { observer } from "mobx-react";
import { useStore } from "./hooks";

import Header from './components/Header';
import DatePicker from "./components/DatePicker";
import List from "./components/List";
import { useShowFilter, useShowJumpTop } from "./hooks";
import Filter from "./components/Filter";
import JumpTop from "./components/JumpTop";
import { selectStatus } from "./components/List/listSlice";
import { FETCH_FLIGHT_LIST_STATUS } from "./constant";
import FlightServerError from "./components/FlightServerError";

export default observer(() => {
    const { status } = useStore('list');
    // const status = useSelector(selectStatus);
    const isShowFilter = useShowFilter();
    const isShowJumpTop = useShowJumpTop();

    return <React.Fragment>
        <Header />
        <DatePicker />
        <List />
        <JumpTop isShow={isShowJumpTop && status === FETCH_FLIGHT_LIST_STATUS.FULFILLED} />
        <Filter isShow={isShowFilter && status === FETCH_FLIGHT_LIST_STATUS.FULFILLED}/>
        <FlightServerError isShow={status !== FETCH_FLIGHT_LIST_STATUS.FULFILLED}/>
    </React.Fragment>;
})