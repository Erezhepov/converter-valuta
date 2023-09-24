import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../api/api";
import {IResponseData, ISupportedCodes} from "../types/type";


export const getData = createAsyncThunk<IResponseData, string, { rejectValue: string }>('converter/fetch',
    async (base_code='USD', {rejectWithValue}) => {
    try {
        const response = await instance.get('latest/' + base_code)
        const data = response.data
        return data
    }catch (e){
        rejectWithValue('Ошибка при доставании данных')
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
        rejectWithValue('Ошибка при доставании вспомогающего кода')
    }
    })