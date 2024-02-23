import React, { memo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import axios from 'axios';

function DeleteBtn ({id})  {

    function handleDelaete() {
        axios
            .delete(`http://localhost:8080/?id=${id}`,)
            .then((respons) => alert("sucessful"))
            .catch((respons) => console.log(respons));
    }

    return (
        <Button onClick={handleDelaete} startIcon={<DeleteIcon />}>
            DELETE
        </Button>
    )
}

export default memo(DeleteBtn) 