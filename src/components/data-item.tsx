import React from 'react';

interface IPropsDataItem {
    currency: string
    float: number
    supported_codes: []
    sum: number | null
}

const DataItem: React.FC<IPropsDataItem> = ({currency, sum, float, supported_codes}) => {
    console.log(sum)
    return (
        <div className="data-item">
            <div>
                <span>{currency}</span>
                <div className="amount">
                    {sum ? Number(sum).toFixed(float) : 'Unknown'}
                </div>
            </div>
            <p>
                {supported_codes?.find(c => c[0] === currency)?.[1]}
            </p>
        </div>
    );
};

export default DataItem;