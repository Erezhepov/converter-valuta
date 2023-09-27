import React from 'react';
import {useAppSelector} from "../hooks/hooks";
import DataItem from "./converter/data-item";

interface IPropsConvertInfo {
    showData: boolean
}

const ConvertHistoricalInfo: React.FC<IPropsConvertInfo> = ({showData}) => {
    const {base_code, converted_code, supported_codes, time_last_update, conversion_historical_rates} = useAppSelector(state => state.converterState)
    return (
        <div style={{opacity: showData ? '1' : '0', transition: 'opacity 0.15s'}} className="dates-wrapper">
            <div className="dates">
                <DataItem sum={1} currency={base_code} float={2} supported_codes={supported_codes} />
                <button className="equal">
                    <img src="equal.svg" alt=""/>
                </button>
                <DataItem sum={conversion_historical_rates[converted_code]} currency={converted_code} float={4} supported_codes={supported_codes} />
            </div>
            <p className={'date'}>{time_last_update?.slice(0,-5)}</p>
        </div>
    );
};

export default ConvertHistoricalInfo;