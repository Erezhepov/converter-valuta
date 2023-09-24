import React from 'react';
import {useAppSelector} from "../hooks/hooks";
import DataItem from "./converter/data-item";

interface IPropsConvertInfo {
    showData: boolean
}

const ConvertInfo: React.FC<IPropsConvertInfo> = ({showData}) => {
    const {amount, base_code, converted_code, supported_codes, converted_data, time_last_update} = useAppSelector(state => state.converterState)
    return (
        <div style={{opacity: showData ? '1' : '0', transition: 'opacity 0.15s'}} className="dates-wrapper">
            <div className="dates">
                <DataItem sum={amount} currency={base_code} float={2} supported_codes={supported_codes} />
                <button className="equal">
                    <img src="equal.svg" alt=""/>
                </button>
                <DataItem sum={converted_data} currency={converted_code} float={4} supported_codes={supported_codes} />
            </div>
            <p className={'date'}>{time_last_update?.slice(0,-5)}</p>
        </div>
    );
};

export default ConvertInfo;