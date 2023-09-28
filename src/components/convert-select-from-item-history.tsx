import React, {useState} from 'react';
import Select, {SingleValue} from "react-select";
import {IOption, ISelectHistoryItem} from "../types/type";
import {changeHistoryBaseCode} from "../store/converter.slice";
import {useAppDispatch} from "../hooks/hooks";
import {getStyles} from "../helpers/style";

const ConvertSelectFromItemHistory: React.FC<ISelectHistoryItem> = ({options, initialOptions}) => {
    const dispatch = useAppDispatch()
    const [selectedOptionFrom, setSelectedOptionFrom] = useState('USD');
    const onChangeFrom = (e: SingleValue<string | IOption>) => {
        const value = (e as IOption).value
        setSelectedOptionFrom(value)
        dispatch(changeHistoryBaseCode(value))

    }
    const getValueFrom = () => {
        if (!options.length){
            return selectedOptionFrom ? initialOptions.find(c => c.value === selectedOptionFrom) : ''
        }
        return selectedOptionFrom ? options.find(c => c.value === selectedOptionFrom) : ''
    }
    return (
        <div className="convert-item">
            <label htmlFor="">
                <span>From</span>
                <div className={'custom-select'}>
                    <Select styles={getStyles()} onChange={onChangeFrom} value={getValueFrom()} className="react-select-container" classNamePrefix="react-select" options={options} />
                </div>
            </label>
        </div>
    );
};

export default ConvertSelectFromItemHistory;