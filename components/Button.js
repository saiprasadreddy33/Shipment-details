// components/Button.js
const Button = ({ variant, children, onClick }) => {
    const baseStyle = "px-4 py-2 rounded-md font-semibold focus:outline-none";
    const variantStyle = variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700";

    return (
        <button className={`${baseStyle} ${variantStyle}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;