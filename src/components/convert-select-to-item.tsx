import React, {useEffect, useState} from 'react';
import Select, {SingleValue} from "react-select";
import {IOption, ISelectItem} from "../types/type";
import {changeConvertedCode} from "../store/converter.slice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {getStyles} from "../helpers/style";


const ConvertSelectToItem: React.FC<ISelectItem> = ({options, initialOptions, isSwap}) => {
    const {base_code, converted_code} = useAppSelector(state => state.converterState)
    const dispatch = useAppDispatch()
    const [selectedOptionTo, setSelectedOptionTo] = useState(converted_code);
    const getValueTo = () => {
        if (!options.length){
            return selectedOptionTo ? initialOptions.find(c => c.value === selectedOptionTo) : ''
        }
        return selectedOptionTo ? options.find(c => c.value === selectedOptionTo) : ''
    }

    const onChangeTo = (e: SingleValue<string | IOption>) => {
        const value = (e as IOption).value
        setSelectedOptionTo(value)
        dispatch(changeConvertedCode(value))
    }
    useEffect(() => {
        if(isSwap){
            setSelectedOptionTo(base_code)
            dispatch(changeConvertedCode(base_code))
        }
    }, [isSwap]);
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

export default ConvertSelectToItem;