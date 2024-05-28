import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { done } from "../store/Todostore";
import server from "../api/api";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, CircularProgress } from "@mui/material";

function DoneBtn({ id, status, btnLoading, setBtnLoading, setMessage }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (btnLoading.includes(id)) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [btnLoading]);
  async function handleDone() {
    const doneStatus = !status;
    setBtnLoading((prevState) => {
      return [...prevState, id];
    });
    server
      .post("/home", { id, status: doneStatus })
      .then((response) => {
        dispatch(done(id));
        setMessage([{ message: response.data.message, status: "success" }]);
      })
      .catch((response) =>
        setMessage([{ message: "ERROR", status: "warning" }])
      )
      .finally(() => {
        setBtnLoading((prevState) =>
          prevState.filter((itemId) => itemId !== id)
        );
      });
  }

  return (
    <>
      {loading !== true ? (
        <Button sx={{ width: "10px" }} onClick={handleDone}>
          {status ? (
            <CheckCircleOutlineIcon sx={{ color: "#24e424" }} />
          ) : (
            <HighlightOffOutlinedIcon sx={{ color: "#ff2222" }} />
          )}
        </Button>
      ) : (
        <CircularProgress size={16} />
      )}
    </>
  );
}

export default memo(DoneBtn);
