export interface IOption {
    value: string
    label: string
}
export interface IConversionRates {
    USD: number,
    RUB: number,
    KZT: number,
}
export interface IState {
    isLoading: boolean
    error: string | null
    result: string | null
    conversion_rates: any | null
    converted_data: number | null
    base_code: string
    converted_code: string
    amount: number
    time_last_update: string | null
    supported_codes: []
    history: IHistory
}

export interface IHistory {
    year: number
    month: number
    day: number
}

export interface IResponseData {
    result: string
    conversion_rates: IConversionRates
    time_last_update_utc: string
}
export interface IConvertMoney {
    amount: number
    base_code: string
    converted_code: string
}
export interface ISelectItem {
    options: IOption[]
    initialOptions: IOption[]
    isSwap: number
}
export interface ISupportedCodes{
    success: string
    supported_codes: []
}