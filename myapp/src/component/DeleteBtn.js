import React, { memo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../store/Todostore";
import server from "../api/api";

function DeleteBtn({ id, setMessage }) {
  const dispatch = useDispatch();
  const [disabled, setDisabled]= useState()
  function handleDelaete() {
    setDisabled(true);
    server
      .delete(`/home?id=${id}`)
      .then((response) => {
        dispatch(deleteTodo({ id }));
        setMessage([{ message: response.data.message, status: 'success' }]);
      })
      .catch((error) => {
        console.log(error)
        setMessage([{ message: "ERROR", status: 'warning' }])
      });
  }

  return (
    <>
      <Button onClick={() => {  handleDelaete() }}  startIcon={<DeleteIcon />}>
        DELETE
      </Button>
    </>
  );
}

export default memo(DeleteBtn);
