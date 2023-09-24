import React, {useEffect, useState} from 'react';
import Select, {SingleValue} from "react-select";
import {IOption, ISelectItem} from "../types/type";
import {changeBaseCode} from "../store/converter.slice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

const ConvertSelectFromItem: React.FC<ISelectItem> = ({options, initialOptions, isSwap}) => {
    const {converted_code} = useAppSelector(state => state.converterState)
    const dispatch = useAppDispatch()
    const [selectedOptionFrom, setSelectedOptionFrom] = useState('USD');
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
    const styles = {
        menuList: (base: any) => ({
            ...base,
            "::-webkit-scrollbar": {
                width: "10px",
                height: "50px",
            },
            "::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: '5px',
            },
            "::-webkit-scrollbar-thumb": {
                background: "#FA5897",
                borderRadius: '3px',
                height: '20px'
            },
        })
    }
    return (
        <div className="convert-item">
            <label htmlFor="">
                <span>From</span>
                <div className={'custom-select'}>
                    <Select styles={styles} onChange={onChangeFrom} value={getValueFrom()} className="react-select-container" classNamePrefix="react-select" options={options} />
                </div>
            </label>
        </div>
    );
};

export default ConvertSelectFromItem;