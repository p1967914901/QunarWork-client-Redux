import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../untils/axios';
import getCurrentDate from '../../untils/getCurrentDate';
import { FETCH_FLIGHT_LIST_STATUS } from '../../constant';
import { FlightInfoType, StoreType, fetchDateListParamsType, fetchFlightListParamsType } from '../../types';


const initialState = {
	date: '',
	startCity: '',
	endCity: '',
	dateList: [],
	data: [],
	status: FETCH_FLIGHT_LIST_STATUS.INIT,
	error: ''
}

export const fetchFlightList = createAsyncThunk('list/fetchFlightList', async (params: fetchFlightListParamsType) => {
	const response = await axios.get(`/list`, { params });
	if (response.status === 200) {
		return response.data.data;
	} else {
		return [];
	}
});

export const fetctDateList = createAsyncThunk('list/fetchDateList', async (params: fetchDateListParamsType) => {
	const response = await axios.get(`/get_date_list`, { params });
	console.log(response);
	if (response.status === 200) {
		return response.data;
	} else {
		return [];
	}
});

const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		sortByRecommend(state) {
			state.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => Number(itemA.price) - Number(itemB.price));
		},
		sortByPrice(state, action) {
			if (action.payload.isAscending) {
				state.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => Number(itemA.price) - Number(itemB.price));
			} else {
				state.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => Number(itemB.price) - Number(itemA.price));
			}
		},
		sortByTime(state, action) {
			if (action.payload.isAscending) {
				state.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => new Date(state.date + ' ' + itemA.startTime).getTime() - new Date(state.date + ' ' + itemB.startTime).getTime());
			} else {
				state.data.sort((itemA: FlightInfoType, itemB: FlightInfoType) => new Date(state.date + ' ' + itemB.startTime).getTime() - new Date(state.date + ' ' + itemA.startTime).getTime());
			}
		},
		updateDate(state, action) {
			state.date = action.payload;
		},
		updateCityInfo(state, action) {
			state.startCity = action.payload.startCity;
			state.endCity = action.payload.endCity;
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchFlightList.pending, (state, action) => {
				state.status = FETCH_FLIGHT_LIST_STATUS.PENDING;
			})
			.addCase(fetchFlightList.fulfilled, (state, action) => {
				state.data = action.payload;
				if (action.payload.length) {
					state.status = FETCH_FLIGHT_LIST_STATUS.FULFILLED;
				} else {
					state.status = FETCH_FLIGHT_LIST_STATUS.INIT;
				}
			})
			.addCase(fetchFlightList.rejected, (state, action) => {
				state.status = FETCH_FLIGHT_LIST_STATUS.REJECTED;
			})
			.addCase(fetctDateList.fulfilled, (state, action) => {
				state.dateList = action.payload;
			})

	},
})

export const { sortByRecommend, sortByPrice, sortByTime, updateDate, updateCityInfo } = listSlice.actions

export default listSlice.reducer;

export const selectStatus = (state: StoreType) => state.list.status;
export const selectAllFlightList = (state: StoreType) => state.list.data;
export const selectFetchFlightInfoStatus = (state: StoreType) => state.list.status;
export const selectDate = (state: StoreType) => state.list.date;
export const selectDateList = (state: StoreType) => state.list.dateList;


export const selectCityInfo = (state: StoreType) => ({ startCity: state.list.startCity, endCity: state.list.endCity });


