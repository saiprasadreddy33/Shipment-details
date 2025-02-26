// components/TableBody.js
const TableBody = ({ children }) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {children}
        </tbody>
    );
};

export default TableBody;