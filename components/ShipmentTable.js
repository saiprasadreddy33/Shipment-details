"use client";

import { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ShipmentForm from './ShipmentForm';
import Table from './Table';
import Input from './Input';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import Dialog from './Dialog';
import DialogActions from './DialogActions';
import DialogContent from './DialogContent';
import DialogTitle from './DialogTitle';
import TableCell from './TableCell';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Spinner from './Spinner';
import ConfirmDialog from './ConfirmDialog';

const supabase = createClientComponentClient();

const ShipmentTable = () => {
    const [shipments, setShipments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentShipment, setCurrentShipment] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter, setFilter] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [shipmentToDelete, setShipmentToDelete] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUser(user);
            fetchShipments(user.id);
        }
    };

    const fetchShipments = async (userId) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('shipments')
            .select('*')
            .eq('user_id', userId); // Assuming there is a 'user_id' field in your shipments table
        if (!error) setShipments(data);
        setLoading(false);
    };

    useEffect(() => {
        if (filter) {
            const options = shipments
                .filter(shipment =>
                    (shipment.tracking_number?.toLowerCase() || '').includes(filter.toLowerCase())
                )
                .map(shipment => shipment.tracking_number);
            setDropdownOptions([...new Set(options)]);
            setShowSuggestions(true);
        } else {
            setDropdownOptions([]);
            setShowSuggestions(false);
        }
    }, [filter, shipments]);

    const handleEdit = (shipment) => {
        setCurrentShipment(shipment);
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
        setCurrentShipment(null);
    };

    const handleSave = async () => {
        fetchShipments(user.id);
        handleClose();
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const handleDelete = async (id) => {
        setConfirmDelete(true);
        setShipmentToDelete(id);
    };

    const confirmDeleteShipment = async () => {
        if (shipmentToDelete) {
            const { error } = await supabase.from('shipments').delete().eq('id', shipmentToDelete);
            if (!error) {
                fetchShipments(user.id);
                setConfirmDelete(false);
                setShipmentToDelete(null);
            } else {
                alert("Please try again")
            }
        }
    };

    const getFormattedDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    const filteredShipments = shipments.filter(shipment =>
        (shipment.tracking_number?.toLowerCase() || '').includes(filter.toLowerCase()) ||
        (shipment.customer_name?.toLowerCase() || '').includes(filter.toLowerCase()) ||
        (shipment.invoice_number?.toLowerCase() || '').includes(filter.toLowerCase()) ||
        (shipment.customer_number?.toLowerCase() || '').includes(filter.toLowerCase())
    );

    const totalPages = Math.ceil(filteredShipments.length / rowsPerPage);
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    return (
        <div className="w-full">
            <div className="flex justify-between items-start mb-4">
                <div className="relative flex-grow">
                    <Input
                        placeholder="Filter shipments..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                    {showSuggestions && dropdownOptions.length > 0 && (
                        <div className="absolute bg-white border border-gray-300 mt-1 shadow-lg z-10 w-full rounded-lg">
                            {dropdownOptions.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setFilter(option);
                                        setShowSuggestions(false);
                                    }}
                                    className="p-2 cursor-pointer hover:bg-blue-50 transition duration-200"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={() => { setCurrentShipment({}); setIsEditing(true); }}
                    className="ml-4 self-start bg-green-500 hover:bg-green-600 text-white rounded-full py-2 px-4 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Create New Shipment
                </Button>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <div className="w-full overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tracking Number</TableHead>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Invoice Number</TableHead>
                                <TableHead>Customer Number</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredShipments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((shipment) => (
                                <TableRow key={shipment.id}>
                                    <TableCell>{shipment.tracking_number}</TableCell>
                                    <TableCell>{shipment.customer_name}</TableCell>
                                    <TableCell>{shipment.invoice_number}</TableCell>
                                    <TableCell>{shipment.customer_number}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleEdit(shipment)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(shipment.id)}
                                            className="text-red-500 hover:text-red-700 ml-2"
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <div className="flex justify-between mt-3">
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-1 min-w-[100px]">
                                        <h4 className="text-gray-500 text-sm">Displaying</h4>
                                        <span className="font-bold text-sm">{page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, filteredShipments.length)} of {filteredShipments.length}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <h4 className="text-gray-500 text-sm">Rows Per Page:</h4>
                                        <div className="select flex items-center gap-3 px-3 text-sm py-1 border rounded-lg cursor-pointer border-gray-300">
                                            <select value={rowsPerPage} onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))} className="w-full focus:outline-none">
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={15}>15</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleChangePage(Math.max(page - 1, 0))}
                                        disabled={page === 0}
                                        className="pagination text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ArrowBackIosIcon />
                                    </button>
                                    {[...Array(totalPages).keys()].slice(startPage, endPage + 1).map((index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleChangePage(index)}
                                            className={`pagination px-2 py-1 ${index === page ? 'bg-blue-500 text-white rounded-md' : 'text-gray-600 cursor-pointer'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handleChangePage(Math.min(page + 1, totalPages - 1))}
                                        disabled={page >= totalPages - 1}
                                        className="pagination text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ArrowForwardIosIcon />
                                    </button>
                                </div>
                            </div>
                        </TableFooter>
                    </Table>
                </div>
            )}

            <Dialog open={isEditing} onClose={handleClose}>
                <DialogTitle>{currentShipment?.id ? 'Edit Shipment' : 'Create Shipment'}</DialogTitle>
                <DialogContent>
                    <ShipmentForm shipment={currentShipment} onSave={handleSave} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                  
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={confirmDelete}
                onConfirm={confirmDeleteShipment}
                onCancel={() => setConfirmDelete(false)}
                title="Confirm Deletion"
                content="Are you sure you want to delete this shipment? This action cannot be undone."
            />
        </div>
    );
};

export default ShipmentTable;
