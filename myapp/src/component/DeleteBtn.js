import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../store/Todostore";
import server from "../api/api";
import FormButton from "./FormButton";

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
    <>
      <FormButton
        icon={'delete'}
        loading={loading}
        func={handleDelaete}
        text={"DELETE"}
        onClick={handleDelaete}
      />
    </>
  );
}

export default memo(DeleteBtn);
