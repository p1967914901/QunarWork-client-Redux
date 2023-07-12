import { fetchDateListParamsType, fetchFlightListParamsType } from "../types";
import axios from '../untils/axios';


export const fetchFlightList = async (params: fetchFlightListParamsType) => {
	const response = await axios.get(`/list`, { params });
	if (response.status === 200) {
		return response.data.data;
	} else {
		return [];
	}
}

export const fetctDateList = async (params: fetchDateListParamsType) => {
    const response = await axios.get(`/get_date_list`, { params });
	if (response.status === 200) {
		return response.data;
	} else {
		return [];
	}
}