import { useState } from "react";
import "../assets/style/pageStyle/add.scss";
import AlertMessage from "../component/Alert";
import server from "../api/api";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
export default function AddTask() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    server
      .post("/task/add", { title, description, status })
      .then((response) => {
        setMessage([{message:response.data.message, status:"success"}]);
        setStatus(false);
      })
      .catch((error) => {
          setMessage([{message:"ERROR", status:'warning'}])    
      });
  }

  return (
    <main className="user__container">
      <h1>Create a new task</h1>
      <section className="add">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Enter Task Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            required
          />
          <label htmlFor="description">Enter Task description</label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            required
          ></textarea>
          <div className="radio">
            <input
              type="radio"
              onChange={() => setStatus(false)}
              name="done"
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
              name="done"
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
          <input type="submit" value="Add" />
        </form>
      </section>
      {message.length > 0 ? (
        <AlertMessage message={message} setMessage={setMessage} />
      ) : null}
    </main>
  );
}
