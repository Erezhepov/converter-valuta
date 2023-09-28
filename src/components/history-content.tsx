import React, {useEffect, useState} from 'react';
import {IHistory, IOption} from "../types/type";
import {useAppSelector} from "../hooks/hooks";
import InputItem from "./input-item";
import ConvertHistoricalDates from "./convert-historical-dates";
import ConvertSelectFromItemHistory from "./convert-select-from-item-history";
import ConvertSelectToItemHistory from "./convert-select-to-item-history";

let initialOptions: IOption[] = [
    { value: 'USD', label: 'USD' },
    { value: 'KZT', label: 'KZT' },
    { value: 'RUB', label: 'RUB' },
    { value: 'EUR', label: 'EUR' },
]

let options: IOption[] = [
];

const HistoryContent: React.FC = () => {
    const {year, month, day} = useAppSelector(state => state.converterState.history)
    const [history, setHistory] = useState<IHistory>({day, month, year})
    const {conversion_rates} = useAppSelector(state => state.converterState)
    const changeYearHandler = (content: number) => {
        setHistory(prevState => ({...prevState, year: content}))
    }
    const changeMonthHandler = (content: number) => setHistory(prevState => ({...prevState, month: content}))
    const changeDayHandler = (content: number) => setHistory(prevState => ({...prevState, day: content}))

    useEffect(() => {
        if (Object.keys(conversion_rates).length > 0){
            let newArr: string[] = []
            for (let option of initialOptions) newArr.push(option.value)
            for (let key in conversion_rates) newArr.push(key)
            let updatedArr: string[] = Array.from(new Set(newArr))
            for (let el of updatedArr){
                options.push({value: el, label: el})
            }
        }
    }, [conversion_rates, initialOptions, options]);
    return (
        <div className={'history-content'}>
            <div className={'history-items'}>
                <div className="history-selects">
                    <ConvertSelectFromItemHistory options={options} initialOptions={initialOptions} />
                    <ConvertSelectToItemHistory options={options} initialOptions={initialOptions} />
                </div>
                <div className={'history-dates'}>
                    <InputItem title={'Year'} initialValue={history.year} sendValue={changeYearHandler} />
                    <InputItem title={'Month'} initialValue={history.month} sendValue={changeMonthHandler} />
                    <InputItem title={'Day'} initialValue={history.day} sendValue={changeDayHandler} />
                </div>
            </div>
            <ConvertHistoricalDates day={history.day} month={history.month} year={history.year} />
        </div>
    );
};

export default HistoryContent;