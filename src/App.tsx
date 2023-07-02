import React, { useState } from "react";

import Header from './components/Header';
import DatePicker from "./components/DatePicker";
import List from "./components/List";
import { useResize } from "./hooks";

export default function App() {
    const [depCity, setDepCity] = useState<string>('北京');
    const [arrCity, setArrCity] = useState<string>('杭州');
    const [date, setDate] = useState<string>('07-05');

    useResize();
    // console.log(a)
    return <React.Fragment>
        <Header depCity={depCity} arrCity={arrCity} />
        <DatePicker date={date} />
        <List />
    </React.Fragment>;
}    