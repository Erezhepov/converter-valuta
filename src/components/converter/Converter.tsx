import React from 'react';
import Btns from "../btns";
import ConvertItems from "../convert-items";
import ConvertDates from "../convert-dates";

const Converter: React.FC = () => {
    return (
        <div className={'converter-wrapper'}>
            <h1>Check live foreign currency exchange rates</h1>
            <div className="converter">
                <Btns />
                <div className="content">
                    <ConvertItems />
                    <ConvertDates />
                </div>
            </div>
        </div>
    );
};

export default Converter;