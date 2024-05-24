import React from 'react'
import { Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from '@mui/icons-material/EditNote';

const iconMap = {
    edit: <EditNoteIcon />,
    delete: <DeleteIcon />,
};

function FormButton({ loading, icon, btnVariant = 'outlined', func, text, type = 'button' }) {

    return (
        <Button
            variant={btnVariant}
            onClick={func ?? null}
            type={type}
            disabled={loading}
            startIcon={iconMap[icon]}
        >
            {loading && <CircularProgress size={16} sx={{ marginRight: '10px' }} />}{text}
        </Button>
    )
}

export default FormButton
