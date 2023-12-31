import React, {useEffect, useState} from 'react';
import Select, {SingleValue} from "react-select";
import {IOption, ISelectItem} from "../types/type";
import {changeBaseCode} from "../store/converter.slice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {getStyles} from "../helpers/style";

const ConvertSelectFromItem: React.FC<ISelectItem> = ({options, initialOptions, isSwap}) => {
    const {base_code, converted_code} = useAppSelector(state => state.converterState)
    const dispatch = useAppDispatch()
    const [selectedOptionFrom, setSelectedOptionFrom] = useState(base_code);
    const onChangeFrom = (e: SingleValue<string | IOption>) => {
        const value = (e as IOption).value
        setSelectedOptionFrom(value)
        dispatch(changeBaseCode(value))

    }
    const getValueFrom = () => {
        if (!options.length){
            return selectedOptionFrom ? initialOptions.find(c => c.value === selectedOptionFrom) : ''
        }
        return selectedOptionFrom ? options.find(c => c.value === selectedOptionFrom) : ''
    }
    useEffect(() => {
        if(isSwap){
            setSelectedOptionFrom(converted_code)
            dispatch(changeBaseCode(converted_code))
        }
    }, [isSwap]);

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

export default ConvertSelectFromItem;