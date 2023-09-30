import React, {useState} from 'react';

interface IInputItem {
    title: string
    initialValue: number
    sendValue: (value: number) => void
    maxValue: number
}

const InputItem: React.FC<IInputItem> = ({title, sendValue, initialValue, maxValue}) => {
    const [value, setValue] = useState<number>(initialValue || 1)
    const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(+e.target.value)
    }
    return (
        <div className="convert-item">
            <label htmlFor="">
                <span>{title}</span>
                <input min={1} max={maxValue} inputMode={"numeric"} onBlur={() => sendValue(value)} onChange={changeValueHandler} type={'number'} value={value} className={'input'} />
            </label>
        </div>
    );
};

export default InputItem;