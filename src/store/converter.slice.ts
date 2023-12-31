import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConvertHistoricalMoney, IConvertMoney, IHistory, IState} from "../types/type";
import {getData, getHistoricalData, supportedCodes} from "./converter.thunk";

const initialState: IState = {
    isLoading: false,
    error: null,
    error_history: null,
    result: '',
    converted_data: null,
    base_code: 'USD',
    converted_code: 'KZT',
    base_code_history: 'USD',
    converted_code_history: 'KZT',
    amount: 1,
    conversion_rates: {},
    conversion_historical_rates: {},
    time_last_update: null,
    supported_codes: [],
    history: {
        year: 2023,
        month: 1,
        day: 1
    }
}

export const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        convertMoney: (state, {payload} : PayloadAction<IConvertMoney>) => {
            let count = state.conversion_rates?.[payload.converted_code]
            state.converted_data = payload.amount * count
        },
        convertHistoricalMoney: (state, {payload} : PayloadAction<IConvertHistoricalMoney>) => {
            let count = state.conversion_rates?.[payload.converted_code_history]
            state.converted_data = count
        },
        changeBaseCode: (state, {payload}: PayloadAction<string>) => {
          state.base_code = payload
        },
        changeConvertedCode: (state, {payload}: PayloadAction<string>) => {
            state.converted_code = payload
        },
        changeAmount: (state, {payload}: PayloadAction<number>) => {
            state.amount = payload
        },
        setHistory: (state, {payload}: PayloadAction<IHistory>) => {
            state.history = payload
        },
        changeHistoryBaseCode: (state, {payload}: PayloadAction<string>) => {
            state.base_code_history = payload
        },
        changeHistoryConvertedCode: (state, {payload}: PayloadAction<string>) => {
            state.converted_code_history = payload
        },

    },
    extraReducers: builder => {
        builder.addCase(getData.pending, state => {
            state.isLoading = true
            state.error = null
        })
            .addCase(getData.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.error = null
                if (payload){
                    state.result = payload.result
                    state.conversion_rates = payload.conversion_rates
                    state.time_last_update = payload.time_last_update_utc
                }
            })
            .addCase(getData.rejected, (state, {payload}) => {
                state.isLoading = false
                state.error = payload ? payload : null
            })
            .addCase(supportedCodes.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(supportedCodes.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.supported_codes = payload.supported_codes
            })
            .addCase(supportedCodes.rejected, (state, {payload}) => {
                state.isLoading = false
                state.error = payload ? payload : null
            })
            .addCase(getHistoricalData.pending, state => {
                state.isLoading = true
                state.error_history = null
            })
            .addCase(getHistoricalData.rejected, (state, {payload}) => {
                state.isLoading = false
                state.error_history = payload ? payload : null
            })
            .addCase(getHistoricalData.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.error_history = null
                state.history = {
                    day: payload.day,
                    month: payload.month,
                    year: payload.year
                }
                state.conversion_historical_rates = payload.conversion_rates
            })
    }
})

export default converterSlice.reducer
export const {convertMoney, changeConvertedCode,
    changeBaseCode, changeAmount,
    setHistory, changeHistoryBaseCode, changeHistoryConvertedCode,
    convertHistoricalMoney
} = converterSlice.actions