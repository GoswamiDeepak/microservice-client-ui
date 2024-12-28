import React from 'react';

type PropTypes = {
    handleQtyChange: (qty: number) => void;
    children: React.ReactNode;
};

const QtyChanger = ({ handleQtyChange, children }: PropTypes) => {
    return (
        <div className="flex items-center bg-gray-100 rounded-full">
            <button
                onClick={() => {
                    handleQtyChange(-1);
                }}
                className="w-10 h-10 rounded-full hover:bg-gray-200 flex justify-center items-center ">
                -
            </button>
            <span className="w-8 text-center">{children}</span>
            <button
                onClick={() => {
                    handleQtyChange(+1);
                }}
                className="w-10 h-10 rounded-full hover:bg-gray-200 flex justify-center items-center ">
                +
            </button>
        </div>
    );
};

export default QtyChanger;
