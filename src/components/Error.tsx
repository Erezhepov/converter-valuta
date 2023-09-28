import React from 'react';

export interface IError {
    text: string
}

const Error: React.FC<IError> = ({text}) => {
    return (
        <div className={'error-data'}>
            {text}
        </div>
    );
};

export default Error;