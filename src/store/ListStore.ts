import { makeAutoObservable } from "mobx";
import { FlightInfoType } from "../types";
import { FETCH_FLIGHT_LIST_STATUS } from "../constant";

export default class ListStore {
    date: string = '';
    startCity: string = '';
	endCity: string = '';
	dateList: Array<{date: string; week: string; price: string}> = [];
	data: Array<FlightInfoType> = [];
	status: 'init' | 'pending' | 'fulfilled' | 'rejected' = FETCH_FLIGHT_LIST_STATUS.INIT as 'init';

    constructor() {
        makeAutoObservable(this);
    }

    setDateList(dateList: Array<{date: string; week: string; price: string}>) {
        this.dateList = dateList;
    }

    setDate(date: string) {
        this.date = date;
    }

    setStatus(status: 'init' | 'pending' | 'fulfilled' | 'rejected') {
        this.status = status;
    }

    setCityInfo({ startCity, endCity }: { startCity: string, endCity: string}) {
        this.startCity = startCity;
        this.endCity = endCity;
    }

    setFlightInfoList(flightInfoList: Array<FlightInfoType>) {
        this.data = flightInfoList;
    }

    sortByRecommend() {
        this.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => Number(itemA.price) - Number(itemB.price));
    }

    sortByTime(isAscending:boolean) {
        if (isAscending) {
			this.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => new Date(this.date + ' ' + itemA.startTime).getTime() - new Date(this.date + ' ' + itemB.startTime).getTime());
            
        } else {
            this.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => new Date(this.date + ' ' + itemB.startTime).getTime() - new Date(this.date + ' ' + itemA.startTime).getTime());
        }
    }

    sortByPrice(isAscending:boolean) {
        if (isAscending) {
            this.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => Number(itemA.price) - Number(itemB.price));
        } else {
            this.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => Number(itemB.price) - Number(itemA.price));
        }
    }
}