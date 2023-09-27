import React, {useState} from 'react';
import Buttons from "../buttons";
import ConvertItems from "../convert-items";
import ConvertDates from "../convert-dates";
import HistoryContent from "../history-content";



const Converter: React.FC = () => {
    const [activeContent, setActiveContent] = useState('main')
    return (
        <div className={'converter-wrapper'}>
            <h1>Check live foreign currency exchange rates</h1>
            <div className="converter">
                <Buttons activeContent={activeContent} setActiveContent={setActiveContent} />
                <div className="content">
                    {activeContent === 'main' && (
                        <>
                            <ConvertItems />
                            <ConvertDates />
                        </>
                    )}
                    {activeContent === 'history' && <HistoryContent />}
                </div>
            </div>
        </div>
    );
};

export default Converter;