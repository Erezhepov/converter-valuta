import React from 'react';

export interface IErrors {
    children: any
}

const Errors: React.FC<IErrors> = ({children}) => {
    return (
        <div className={'error-data'}>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Errors;