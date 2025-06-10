import { Modal, Box, Typography, Button } from '@mui/material';
import InputField from './InputField';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User } from '../services/userService';

type Props = {
    open: boolean;
    user: User;
    onChange: (field: keyof User, value: string) => void;
    onSave: () => void;
    onClose: () => void;
    onDelete?: () => void;
    title: string;
    isEdit?: boolean;
    message?: string | null;
};

export default function UserFormModal({
    open, user, onChange, onSave, onClose, onDelete, title, isEdit = false, message
}: Props) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                p: 4,
                bgcolor: 'background.paper',
                m: 'auto',
                mt: 10,
                width: 400,
                borderRadius: 4,
                boxShadow: 24,
                outline: 'none'
            }}>
                <Typography variant="h6" gutterBottom fontWeight={700} color={isEdit ? "primary" : "success.main"}>
                    {title}
                </Typography>
                {message && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {message}
                    </Typography>
                )}
                {isEdit && (
                    <InputField
                        disabled
                        label="HN:"
                        value={user.user_id !== undefined ? String(user.user_id).padStart(6, '0') : ''}
                    />
                )}
                <InputField
                    label="ชื่อ:"
                    value={user.user_firstname}
                    onChange={e => onChange('user_firstname', e.target.value)}
                    required
                />
                <InputField
                    label="นามสกุล:"
                    value={user.user_lastname}
                    onChange={e => onChange('user_lastname', e.target.value)}
                    required
                />
                <InputField
                    label="เบอร์ติดต่อ:"
                    value={user.user_phone}
                    onChange={e => onChange('user_phone', e.target.value)}
                    required
                />
                <InputField
                    label="Email:"
                    value={user.user_email}
                    onChange={e => onChange('user_email', e.target.value)}
                    required
                />
                <Box display="flex" gap={2} mt={2} justifyContent="center">
                    <Button variant="outlined" size="small" startIcon={<CancelIcon />} onClick={onClose}>Cancle</Button>
                    <Button variant="contained" size="small" startIcon={<SaveAsIcon />} onClick={onSave}>
                        {isEdit ? "Save" : "Add"}
                    </Button>
                    {isEdit && (
                        <Button variant="contained" size="small" color='error' startIcon={<DeleteIcon />} onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}