// components/TablePagination.js
const TablePagination = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
    return (
        <tr>
            <td colSpan="5">
                <div className="flex justify-between items-center p-4">
                    <span>
                        Rows per page:
                        <select
                            value={rowsPerPage}
                            onChange={onRowsPerPageChange}
                            className="ml-2 border border-gray-300 rounded-md"
                        >
                            {[5, 10, 25].map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </span>
                    <span>
                        Page {page + 1} of {Math.ceil(count / rowsPerPage)}
                    </span>
                    <button onClick={() => onPageChange(null, Math.max(0, page - 1))} disabled={page === 0}>
                        Previous
                    </button>
                    <button onClick={() => onPageChange(null, Math.min(Math.ceil(count / rowsPerPage) - 1, page + 1))} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                        Next
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TablePagination;