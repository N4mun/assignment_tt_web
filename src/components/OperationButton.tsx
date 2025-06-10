import { IconButton } from "@mui/material";
import EditSquareIcon from '@mui/icons-material/EditSquare';

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function OperationButton({ onClick }: Props) {
    return (
        <IconButton onClick={onClick} aria-label="delete" size="small">
            <EditSquareIcon fontSize="small" />
        </IconButton>
    );
}