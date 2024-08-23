import { useEffect, useState } from "react";
import "../assets/style/pageStyle/edit.scss";
import CloseButton from "react-bootstrap/CloseButton";
import { useDispatch } from "react-redux";
import { todoEdit } from "../store/Todostore";
import server from "../api/api";
import FormButton from "./FormButton";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

export default function TaskEdit({
  id,
  btnLoading,
  setBtnLoading,
  setShow,
  setMessage,
}) {
  const [data, setData] = useState(false);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (btnLoading.includes(id)) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [btnLoading]);

  async function handleEdit(e) {
    setBtnLoading((prevState) => {
      return [...prevState, id];
    });
    e.preventDefault();
    server
      .patch("/home", {
        title: data.title,
        description: data.description,
        status: data.status,
        id: data._id,
      })
      .then((response) => {
        dispatch(todoEdit({ ...response.data.data }));
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

  const { data: todoData, isSuccess, isError, isPending } = useQuery({
    queryKey: ['editTodo', id],
    queryFn: () => server
      .get(`/task/${id}`)
      .then(res => { return res.data })
  }
  )
  useEffect(() => {
    if (isSuccess) {
      setData(todoData);
    }
  }, [isSuccess]);


  if (isError) {
    return <div className="main__div" onClick={handleClose}>
      <div>
        500 Server Error
      </div>
    </div>
  }
  function handleClose() {
    setData(false);
    setShow(false);
  }
  console.log(data)
  return (
    <div className="main__div" onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="edit__header">
          <h1>Edit task</h1>
          <CloseButton aria-label="Hide" onClick={handleClose} />
        </div>

        <section className="edit">
          {isPending ? <CircularProgress /> : (
            data && <form onSubmit={handleEdit}>
              <label htmlFor="title">Enter Task Title</label>
              <input
                type="text"
                onChange={(e) => setData({ ...data, title: e.target.value })}
                name="title"
                id="title"
                value={data.title}
                required
              />
              <label htmlFor="description">Enter Task description</label>
              <textarea
                id="description"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                name="description"
                value={data.description}
                required
              ></textarea>
              <div className="radio">
                <input
                  type="radio"
                  onChange={() => setData({ ...data, status: false })}
                  name="done"
                  id="notdone"
                  checked={!data.status}
                  required
                />
                <div className="red">
                  <label htmlFor="notdone"> Not Done</label>
                </div>
              </div>
              <div className="radio">
                <input
                  onChange={() => setData({ ...data, status: true })}
                  type="radio"
                  name="done"
                  id="done"
                  checked={data.status}
                  required
                />
                <div className="green">
                  <label htmlFor="done"> Done</label>
                </div>
              </div>
              <FormButton
                type={"submit"}
                btnVariant={"contained"}
                loading={loading}
                icon={"edit"}
                text={"EDIT"}
              />
            </form>
          )
          }
        </section>
      </div>
    </div>
  );
}
