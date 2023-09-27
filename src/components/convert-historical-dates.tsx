import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {IHistory} from "../types/type";
import {convertMoney} from "../store/converter.slice";
import {getHistoricalData} from "../store/converter.thunk";
import ConvertHistoricalInfo from "./convert-historical-info";



const ConvertHistoricalDates: React.FC<IHistory> = ({day, year, month}) => {
    const dispatch = useAppDispatch()
    const [showData, setShowData] = useState(false)
    const {amount, base_code, converted_code} = useAppSelector(state => state.converterState)

    useEffect(() => {
        setShowData(false)
    }, [amount, base_code, converted_code]);

    const convert = () => {
        debugger
        dispatch(getHistoricalData({base_code, year, month, day})).then(() => {
            dispatch(convertMoney({amount, base_code, converted_code }))
            setShowData(true)
        })
    }
    return (
        <div className="convert-dates">
            <ConvertHistoricalInfo showData={showData} />
            <button onClick={convert} className={'convert-btn'}>Convert</button>
        </div>
    );
};

export default ConvertHistoricalDates;