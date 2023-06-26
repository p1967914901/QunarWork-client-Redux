import React, { useState } from "react";

import Header from './components/Header';
import DatePicker from "./components/DatePicker";

export default function App() {
    const [depCity, setDepCity] = useState<string>('北京');
    const [arrCity, setArrCity] = useState<string>('杭州');
    const [date, setDate] = useState<string>('07-05');

    // console.log(a)
    return <div>
        <Header depCity={depCity} arrCity={arrCity} />
        <DatePicker date={date} />
    </div>;
}    