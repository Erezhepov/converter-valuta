import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../api/api";
import {IError, IResponseData, IResponseHistoricalData, ISupportedCodes} from "../types/type";


export const getData = createAsyncThunk<IResponseData, string, { rejectValue: string }>('converter/fetch',
    async (base_code='USD', {rejectWithValue}) => {
    try {
        const response = await instance.get('latest/' + base_code)
        const data = response.data
        return data
    }catch (e){
        return rejectWithValue('Error while receiving current data')
    }
})

export const supportedCodes = createAsyncThunk<ISupportedCodes, void, {rejectValue: string}>(
    'converter/supportedCodes',
    async (_, {rejectWithValue}) => {
    try {
        const response = await instance.get('/codes')
        const data = response.data
        return data
    }catch (e){
        return rejectWithValue('Error while receiving supported API')
    }
    })

export interface IHistoricalDataArguments {
    base_code_history: string
    year: number
    month: number
    day: number
}

export const getHistoricalData = createAsyncThunk<IResponseHistoricalData, IHistoricalDataArguments, {rejectValue: string}>('converter/getHistoricalData',
    async ({base_code_history, year, month, day}, {rejectWithValue}) => {
        try {
            const response = await instance.get(`history/${base_code_history}/${year}/${month}/${day}`)
            const data = response.data
            return data
        // @ts-ignore start

        }catch (e: IError){
            return rejectWithValue(e?.response?.data["error-type"] || 'Error with historical data')
        }

    })