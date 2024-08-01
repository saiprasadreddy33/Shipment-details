// components/TableHeader.js
const TableHeader = ({ children }) => {
    return (
        <thead className="bg-gray-50">
            {children}
        </thead>
    );
};

export default TableHeader;