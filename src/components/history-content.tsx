import React, {useEffect, useState} from 'react';
import ConvertSelectFromItem from "./convert-select-from-item";
import ConvertSelectToItem from "./convert-select-to-item";
import {IHistory, IOption} from "../types/type";
import {useAppSelector} from "../hooks/hooks";
import InputItem from "./input-item";
import ConvertHistoricalDates from "./convert-historical-dates";

let initialOptions: IOption[] = [
    { value: 'USD', label: 'USD' },
    { value: 'KZT', label: 'KZT' },
    { value: 'RUB', label: 'RUB' },
    { value: 'EUR', label: 'EUR' },
]

let options: IOption[] = [
];

const HistoryContent: React.FC = () => {
    const [isSwap, setIsSwap] = useState(0)
    const {year, month, day} = useAppSelector(state => state.converterState.history)
    const [history, setHistory] = useState<IHistory>({day, month, year})
    const {conversion_rates} = useAppSelector(state => state.converterState)
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

    const changeYearHandler = (content: number) => setHistory(prevState => ({...prevState, year: content}))
    const changeMonthHandler = (content: number) => setHistory(prevState => ({...prevState, month: content}))
    const changeDayHandler = (content: number) => setHistory(prevState => ({...prevState, day: content}))
    return (
        <div className={'history-content'}>
            <div className={'history-items'}>
                <div className="history-selects">
                    <ConvertSelectFromItem options={options} initialOptions={initialOptions} isSwap={isSwap} />
                    <ConvertSelectToItem options={options} initialOptions={initialOptions} isSwap={isSwap} />
                </div>
                <div className={'history-dates'}>
                    <InputItem title={'Year'} initialValue={year} sendValue={changeYearHandler} />
                    <InputItem title={'Month'} initialValue={month} sendValue={changeMonthHandler} />
                    <InputItem title={'Day'} initialValue={day} sendValue={changeDayHandler} />
                </div>
            </div>
            <ConvertHistoricalDates day={history.day} month={history.month} year={history.year} />
        </div>
    );
};

export default HistoryContent;