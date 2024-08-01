// components/TableRow.js
const TableRow = ({ children }) => {
    return (
        <tr className="hover:bg-gray-100">
            {children}
        </tr>
    );
};

export default TableRow;