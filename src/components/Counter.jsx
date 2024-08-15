/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Counter = ({ label, count, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <button 
        className="border border-gray-400 p-2"
        onClick={onDecrement}
      >
        -
      </button>
      <span className="border border-gray-400 p-2">{count}</span>
      <button 
        className="border border-gray-400 p-2"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
