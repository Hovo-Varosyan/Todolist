import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { done } from "../store/Todostore";
import server from "../api/api";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

function DoneBtn({ id, status, setMessage }) {
  const dispatch = useDispatch();

  function handleDone() {
    const doneStatus = status === true ? false : true;
    server
      .post("/home", { id, status: doneStatus })
      .then((response) => {
        dispatch(done(id));
        setMessage([{message:response.data.message, status:'success'}]);
      })
      .catch((response) =>  setMessage([{message:"ERROR", status:'warning'}])    );
  }

  return (
    <>
      <button
        className={status ? "table__green" : "table__red"}
        onClick={handleDone}
      >
        {status ? (
          <CheckCircleOutlineIcon sx={{ color: "#24e424" }} />
        ) : (
          <HighlightOffOutlinedIcon sx={{ color: "#ff2222" }} />
        )}
      </button>
    </>
  );
}

export default memo(DoneBtn);
