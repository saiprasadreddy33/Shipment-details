// components/Input.js
const Input = ({ placeholder, value, onChange }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded-md p-2 mb-4"
        />
    );
};

export default Input;