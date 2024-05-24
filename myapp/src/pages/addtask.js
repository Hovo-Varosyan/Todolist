import { useState } from "react";
import "../assets/style/pageStyle/add.scss";
import AlertMessage from "../component/Alert";
import server from "../api/api";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, CircularProgress } from "@mui/material";

const formSchema = {
  title: "",
  description: "",
};

export default function AddTask() {
  const [form, setForm] = useState(formSchema);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    server
      .post("/task/add", { ...form, status })
      .then((response) => {
        setForm(formSchema);
        setMessage([{ message: response.data.message, status: "success" }]);
        setStatus(false);
      })
      .catch((error) => {
        setMessage([{ message: "ERROR", status: "warning" }]);
      })
      .finally(() => setLoading(false));
  }

  return (
    <main className="user__container">
      <h1>Create a new task</h1>
      <section className="add">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Enter Task Title</label>
          <input
            type="text"
            onChange={handleChange}
            name="title"
            value={form.title}
            id="title"
            required
          />
          <label htmlFor="description">Enter Task description</label>
          <textarea
            id="description"
            value={form.description}
            onChange={handleChange}
            name="description"
            required
          ></textarea>
          <div className="form__radio">
            <div className="radio">
            <input
              type="radio"
              onChange={() => setStatus(false)}
              name="status"
              id="notdone"
              checked={!status}
              required
            />
            <div className="red">
              <label htmlFor="notdone">
                <HighlightOffOutlinedIcon sx={{ color: "#ff2222" }} />
              </label>
            </div>
          </div>
          <div className="radio">
            <input
              onChange={() => setStatus(true)}
              type="radio"
              name="status"
              id="done"
              checked={status}
              required
            />
            <div className="green">
              <label htmlFor="done">
                <CheckCircleOutlineIcon sx={{ color: "#24e424" }} />
              </label>
            </div>
          </div>
          </div>
          
          <Button variant="contained" type="submit" disabled={loading} sx={{width:'15%'}}>
            {loading && (
              <CircularProgress size={16} sx={{ marginRight: "10px" }} />
            )}
            ADD
          </Button>
        </form>
      </section>
      {message.length > 0 ? (
        <AlertMessage message={message} setMessage={setMessage} />
      ) : null}
    </main>
  );
}
