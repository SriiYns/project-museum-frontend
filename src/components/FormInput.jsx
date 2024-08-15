import React from "react";

const FormInput = ({ label, type = "text", id, name, value, onChange }) => {
    return (
        <div className="flex flex-col w-1/2 mx-auto mb-4">
            <label className="text-sm font-bold text-gray-700" htmlFor={id}>
                {label}
            </label>
            <input
                className="p-2 mt-2 border border-gray-400 rounded"
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FormInput;
