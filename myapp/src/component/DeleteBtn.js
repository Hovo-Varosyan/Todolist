import React, { memo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../store/Todostore';
import server from '../api/api';

function DeleteBtn({ id, setMessage }) {
    const dispatch = useDispatch()

    function handleDelaete() {
        server
            .delete(`/?id=${id}`,)
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