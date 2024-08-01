// components/TableFooter.js
const TableFooter = ({ children }) => {
    return (
        <tfoot className="bg-gray-50">
            <tr>
                <td colSpan="100%">
                    {children}
                </td>
            </tr>
        </tfoot>
    );
};

export default TableFooter;
