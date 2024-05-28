import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../store/Todostore";
import server from "../api/api";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteBtn({ id, setMessage, setBtnLoading, btnLoading }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (btnLoading.includes(id)) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [btnLoading]);

  async function handleDelaete(e) {
    setBtnLoading((prevState) => {
      return [...prevState, id];
    });
    e.preventDefault();
    server
      .delete(`/home?id=${id}`)
      .then((response) => {
        dispatch(deleteTodo({ id }));
        setMessage([{ message: response.data.message, status: "success" }]);
      })
      .catch((error) => {
        setMessage([{ message: "ERROR", status: "warning" }]);
      })
      .finally(() => {
        setBtnLoading((prevState) =>
          prevState.filter((itemId) => itemId !== id)
        );
      });
  }

  return (
    <IconButton
      aria-label="delete"
      onClick={handleDelaete}
      className="icon_btn"
      disabled={loading}
    >
      {loading ? <CircularProgress size={18} /> : <DeleteIcon />}
    </IconButton>
  );
}

export default memo(DeleteBtn);
