export interface StoreType {
    list: ListSliceType;
}

export interface ListSliceType {
    startCity: string;
    endCity: string;
    date: string;
    dateList: Array<{date: string; week: string; price: string}>;
    data: Array<FlightInfoType>;
    status: 'init' | 'pending' | 'fulfilled' | 'rejected';
    error: string;
}

export interface FlightInfoType {
    startTime: string;
    endTime: string;
    duration: string;
    price: string;
    startPosition: string;
    endPosition: string;
    flight: string;
    planeType: string;
}

interface fetchListParamsType {
    date: string;
    startCity: string;
    endCity: string;
}

export interface fetchFlightListParamsType extends fetchListParamsType{

}

export interface fetchDateListParamsType extends fetchListParamsType{
    
}