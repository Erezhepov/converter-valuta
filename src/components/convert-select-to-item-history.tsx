import React, {useState} from 'react';
import Select, {SingleValue} from "react-select";
import {IOption, ISelectHistoryItem} from "../types/type";
import {changeHistoryConvertedCode} from "../store/converter.slice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {getStyles} from "../helpers/style";


const ConvertSelectToItemHistory: React.FC<ISelectHistoryItem> = ({options, initialOptions}) => {
    const {converted_code_history} = useAppSelector(state => state.converterState)
    const dispatch = useAppDispatch()
    const [selectedOptionTo, setSelectedOptionTo] = useState(converted_code_history);
    const getValueTo = () => {
        if (!options.length){
            return selectedOptionTo ? initialOptions.find(c => c.value === selectedOptionTo) : ''
        }
        return selectedOptionTo ? options.find(c => c.value === selectedOptionTo) : ''
    }

    const onChangeTo = (e: SingleValue<string | IOption>) => {
        const value = (e as IOption).value
        setSelectedOptionTo(value)
        dispatch(changeHistoryConvertedCode(value))
    }
    return (
        <div className="convert-item">
            <label htmlFor="">
                <span>To</span>
                <div className={'custom-select'}>
                    <Select defaultValue={'KZT'} styles={getStyles()} onChange={onChangeTo} value={getValueTo()} className="react-select-container" classNamePrefix="react-select" options={options} />
                </div>
            </label>
        </div>
    );
};

export default ConvertSelectToItemHistory;