import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import ConvertInfo from "./convert-info";
import {getHistoricalData} from "../store/converter.thunk";
import {IHistory} from "../types/type";



const ConvertHistoricalDates: React.FC<IHistory> = ({day, year, month}) => {
    const dispatch = useAppDispatch()
    const [showData, setShowData] = useState(false)
    const {amount, base_code, converted_code} = useAppSelector(state => state.converterState)

    useEffect(() => {
        setShowData(false)
    }, [amount, base_code, converted_code]);

    const convert = () => {
        dispatch(getHistoricalData({base_code, year, month, day}))
        debugger
        setShowData(true)
    }
    return (
        <div className="convert-dates">
            <ConvertInfo showData={showData} />
            <button onClick={convert} className={'convert-btn'}>Convert</button>
        </div>
    );
};

export default ConvertHistoricalDates;