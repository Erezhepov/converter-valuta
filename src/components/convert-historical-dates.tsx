import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {IHistory, IOption} from "../types/type";
import {convertHistoricalMoney} from "../store/converter.slice";
import ConvertHistoricalInfo from "./convert-historical-info";
import {getHistoricalData} from "../store/converter.thunk";


export interface IPropsHistoricalDates extends IHistory {
    options: IOption[]
}

const ConvertHistoricalDates: React.FC<IHistory> = ({day,month,year}) => {
    const dispatch = useAppDispatch()
    const [showData, setShowData] = useState(false)
    const {base_code_history, converted_code_history, error_history} = useAppSelector(state => state.converterState)

    useEffect(() => {
        setShowData(false)
    }, [base_code_history, day, month, year]);

    const convert = () => {
        dispatch(getHistoricalData({base_code_history, year, month, day})).then(() => {
            dispatch(convertHistoricalMoney({base_code_history, converted_code_history}))
            setShowData(true)
        })
    }
    return (
        <div style={{justifyContent: error_history ? 'flex-end' : 'space-between'}} className="convert-dates">
            {!error_history && <ConvertHistoricalInfo showData={showData} />}
            <button onClick={convert} className={'convert-btn'}>Convert</button>
        </div>
    );
};

export default ConvertHistoricalDates;