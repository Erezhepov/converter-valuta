import React from 'react';

interface IBtns {
    setActiveContent: (content: string) => void
}

const Btns: React.FC<IBtns> = ({setActiveContent}) => {
    return (
        <div className="btns">
            <button onClick={() => setActiveContent('main')} className={'active'}>Convert</button>
            <button onClick={() => setActiveContent('history')}>History</button>
        </div>
    );
};

export default Btns;