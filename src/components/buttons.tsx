import React from 'react';

interface IBtns {
    setActiveContent: (content: string) => void
    activeContent: string
}

const Buttons: React.FC<IBtns> = ({setActiveContent, activeContent}) => {
    return (
        <div className="btns">
            <button className={activeContent === 'main' ? 'active default-btn': 'default-btn'} onClick={() => setActiveContent('main')} >Convert</button>
            <button className={activeContent === 'history' ? 'active default-btn' : 'default-btn'} onClick={() => setActiveContent('history')}>History</button>
        </div>
    );
};

export default Buttons;