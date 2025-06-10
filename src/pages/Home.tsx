import { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Button } from '@mui/material';
import type { User } from '../services/userService';
import OperationButton from "../components/OperationButton";
import UserFormModal from "../components/๊UserFormModal";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useUsers from "../hooks/useUsers";

const columns = [
    { field: 'operation_button', headerName: 'Operation' },
    { field: 'user_id', headerName: 'HN เจ้าของ' },
    { field: 'user_firstname', headerName: 'ชื่อเจ้าของ' },
    { field: 'user_phone', headerName: 'เบอร์ติดต่อ' },
    { field: 'user_email', headerName: 'อีเมล' },
];

const Home = () => {
    const { users, fetchUsers, addUser, editUser, removeUser } = useUsers();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Modal state
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<User>({
        user_firstname: "",
        user_lastname: "",
        user_phone: "",
        user_email: "",
    });
    const [message, setMessage] = useState<string | null>(null);

    // Fetch users on mount
    useEffect(() => {
        fetchUsers();
        document.title = 'หน้าหลัก';
    }, [fetchUsers]);

    // Pagination
    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Modal handlers
    const handleOpen = (user: User) => {
        setSelectedUser(user);
        setOpenModal(true);
        setMessage(null);
    };
    const handleClose = () => {
        setOpenModal(false);
        setSelectedUser(null);
        setMessage(null);
    };
    const handleOpenAdd = () => {
        setNewUser({ user_firstname: "", user_lastname: "", user_phone: "", user_email: "" });
        setOpenAddModal(true);
        setMessage(null);
    };
    const handleCloseAdd = () => {
        setOpenAddModal(false);
        setMessage(null);
    };

    // Form change handlers
    const handleInputChange = (field: keyof User, value: string) => {
        if (selectedUser) setSelectedUser({ ...selectedUser, [field]: value });
    };
    const handleAddInputChange = (field: keyof User, value: string) => {
        setNewUser({ ...newUser, [field]: value });
    };

    // CRUD handlers
    const handleSave = async () => {
        if (selectedUser) {
            try {
                await editUser(selectedUser);
                window.alert("บันทึกข้อมูลสำเร็จ");
                setOpenModal(false);
                setSelectedUser(null);
                setMessage(null);
            } catch (error: any) {
                setMessage(error?.response?.data?.message);
            }
        }
    };
    const handleAddUser = async () => {
        try {
            await addUser(newUser);
            window.alert("เพิ่มเจ้าของสำเร็จ");
            setOpenAddModal(false);
            setMessage(null);
        } catch (error: any) {
            setMessage(error?.response?.data?.message);
        }
    };
    const handleDelete = async () => {
        if (selectedUser && selectedUser.user_id !== undefined) {
            if (window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
                try {
                    await removeUser(selectedUser.user_id);
                    window.alert("ลบข้อมูลสำเร็จ");
                    setOpenModal(false);
                    setSelectedUser(null);
                    setMessage(null);
                } catch (error: any) {
                    setMessage(error?.response?.data?.message);
                }
            }
        }
    };

    // Pagination data
    const displayRows = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Container sx={{ mt: 5, mb: 5 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                    ค้นหาเจ้าของ
                </Typography>
                <Box ml="auto">
                    <Button
                        variant="contained"
                        size="medium"
                        color="success"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleOpenAdd}
                        sx={{ borderRadius: 3, boxShadow: 2, px: 3 }}
                    >
                        เพิ่มเจ้าของ
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 4, boxShadow: 6 }} elevation={3}>
                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.field}
                                        align="center"
                                        sx={{
                                            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: 16,
                                            borderTopLeftRadius: col.field === 'operation_button' ? 16 : 0,
                                            borderTopRightRadius: col.field === 'user_email' ? 16 : 0,
                                        }}
                                    >
                                        {col.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayRows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center" sx={{ color: '#888', fontStyle: 'italic' }}>
                                        ไม่พบข้อมูล
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayRows.map((user) => (
                                    <TableRow
                                        key={user.user_id}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        sx={{
                                            transition: 'background 0.2s',
                                            '&:hover': { backgroundColor: '#e3f2fd' }
                                        }}
                                    >
                                        <TableCell align="center">
                                            <OperationButton onClick={() => handleOpen(user)} />
                                        </TableCell>
                                        <TableCell align="center">
                                            {user.user_id !== undefined
                                                ? String(user.user_id).padStart(6, '0')
                                                : ''}
                                        </TableCell>
                                        <TableCell align="center">
                                            <span
                                                style={{
                                                    color: "#1976d2",
                                                    cursor: "pointer",
                                                    textDecoration: "underline",
                                                    fontWeight: 500
                                                }}
                                                onClick={() => handleOpen(user)}
                                            >
                                                {user.user_firstname} {user.user_lastname}
                                            </span>
                                        </TableCell>
                                        <TableCell align="center">{user.user_phone}</TableCell>
                                        <TableCell align="center">{user.user_email}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton
                    showLastButton
                    sx={{
                        '.MuiTablePagination-toolbar': { background: '#f5f5f5', borderRadius: 2 },
                        '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': { fontWeight: 500 }
                    }}
                />
            </Paper>


            <UserFormModal
                open={openModal}
                user={selectedUser || { user_firstname: "", user_lastname: "", user_phone: "", user_email: "" }}
                onChange={handleInputChange}
                onSave={handleSave}
                onClose={handleClose}
                onDelete={handleDelete}
                title="ข้อมูลเจ้าของ"
                isEdit
                message={message}
            />

            <UserFormModal
                open={openAddModal}
                user={newUser}
                onChange={handleAddInputChange}
                onSave={handleAddUser}
                onClose={handleCloseAdd}
                title="เพิ่มเจ้าของ"
                message={message}
            />
        </Container>
    );
};

export default Home;