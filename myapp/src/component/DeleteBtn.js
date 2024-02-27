import React, { memo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../store/Todostore';

function DeleteBtn({ id, setMessage }) {
    const dispatch = useDispatch()

    function handleDelaete() {
        axios
            .delete(`http://localhost:8080/?id=${id}`,)
            .then((response) => {
                setMessage([response.data.message])
                dispatch(deleteTodo({ id }))
            })
            .catch((respons) => console.log(respons));
    }

    return (
        <>
            <Button onClick={handleDelaete} startIcon={<DeleteIcon />}>
                DELETE
            </Button>

        </>

    )
}

export default memo(DeleteBtn) 