import { TextField, Box } from "@mui/material";

type Props = {
    label: string;
    value: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export default function InputField({ label, value, disabled = false, onChange, required = false }: Props) {
    return (
        <Box display="flex" alignItems="center" gap={1} mb={1}>
            <label style={{ minWidth: 80, textAlign: "right" }}>{label}</label>
            <TextField
                disabled={disabled}
                value={value}
                onChange={onChange}
                size="small"
                fullWidth
                required={required}
            />
            <span
                style={{
                    color: 'red',
                    marginLeft: 4,
                    fontSize: 18,
                    visibility: required ? 'visible' : 'hidden'
                }}
            >
                *
            </span>
        </Box>
    );
}