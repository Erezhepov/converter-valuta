import React, {useEffect, useState} from 'react';
import Select, {SingleValue} from "react-select";
import {IOption, ISelectItem} from "../types/type";
import {changeConvertedCode} from "../store/converter.slice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";


const ConvertSelectToItem: React.FC<ISelectItem> = ({options, initialOptions, isSwap}) => {
    const {base_code} = useAppSelector(state => state.converterState)
    const dispatch = useAppDispatch()
    const [selectedOptionTo, setSelectedOptionTo] = useState('KZT');
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
                    <Select defaultValue={'KZT'} styles={styles} onChange={onChangeTo} value={getValueTo()} className="react-select-container" classNamePrefix="react-select" options={options} />
                </div>
            </label>
        </div>
    );
};

export default ConvertSelectToItem;