import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {convertMoney} from "../store/converter.slice";
import ConvertInfo from "./convert-info";

const ConvertDates = () => {
    const dispatch = useAppDispatch()
    const [showData, setShowData] = useState(false)
    const {amount, base_code, converted_code, error} = useAppSelector(state => state.converterState)

    useEffect(() => {
        setShowData(false)
    }, [amount, base_code, converted_code]);

    const convert = () => {
        dispatch(convertMoney({amount, base_code, converted_code}))
        setShowData(true)
    }
    return (
        <div style={{justifyContent: error ? 'flex-end' : 'space-between'}} className="convert-dates">
            <ConvertInfo showData={showData} />
            <button onClick={convert} className={'convert-btn'}>Convert</button>
        </div>
    );
};

export default ConvertDates;