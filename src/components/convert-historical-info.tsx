import React from 'react';
import {useAppSelector} from "../hooks/hooks";
import DataItem from "./converter/data-item";

interface IPropsConvertInfo {
    showData: boolean
}

const ConvertHistoricalInfo: React.FC<IPropsConvertInfo> = ({showData}) => {
    const {base_code_history, converted_code_history, supported_codes, conversion_historical_rates} = useAppSelector(state => state.converterState)
    return (
        <div style={{opacity: showData ? '1' : '0', transition: 'opacity 0.15s'}} className="dates-wrapper">
            <div className="dates">
                <DataItem sum={1} currency={base_code_history} float={2} supported_codes={supported_codes} />
                <button className="equal">
                    <img src="equal.svg" alt=""/>
                </button>
                <DataItem sum={conversion_historical_rates[converted_code_history]} currency={converted_code_history} float={4} supported_codes={supported_codes} />
            </div>
        </div>
    );
};

export default ConvertHistoricalInfo;