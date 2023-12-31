import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {changeAmount} from "../store/converter.slice";
import ConvertSelectFromItem from "./convert-select-from-item";
import ConvertSelectToItem from "./convert-select-to-item";
import {IOption} from "../types/type";
import InputItem from "./input-item";

let initialOptions: IOption[] = [
    { value: 'USD', label: 'USD' },
    { value: 'KZT', label: 'KZT' },
    { value: 'RUB', label: 'RUB' },
    { value: 'EUR', label: 'EUR' },
]

let options: IOption[] = [
];

const ConvertItems = () => {
    const {amount, conversion_rates} = useAppSelector(state => state.converterState)
    const [isSwap, setIsSwap] = useState(0)
    const dispatch = useAppDispatch()
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
    const sendAmount = (amountCount: number) => dispatch(changeAmount(amountCount))
    const swapCodes = () => {
        setIsSwap(prevState => prevState + 1)
    }
    return (
        <div className="convert-items">
            <InputItem maxValue={999999999999} initialValue={amount} title={'Amount'} sendValue={sendAmount} />
            <ConvertSelectFromItem isSwap={isSwap} initialOptions={initialOptions} options={options} />
            <div className="convert-item">
                <button className={'swap-btn'} onClick={swapCodes}>
                    <img src="converte.svg" alt=""/>
                </button>
            </div>
            <ConvertSelectToItem isSwap={isSwap} initialOptions={initialOptions} options={options} />
        </div>
    );
};

export default ConvertItems;