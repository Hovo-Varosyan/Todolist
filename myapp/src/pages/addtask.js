
import { useState } from "react";
import "../assets/style/add.scss";
import axios from "axios";
import AlertMessage from '../component/Alert';

export default function AddTask() {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState([])

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/task/add", { title, description, status })
      .then((response) =>setMessage([response.data.message]) )
      .catch((response) => {
        alert("error");
        console.log(response);
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
              checked
              required
            />
            <div className="red">
              <label htmlFor="notdone"> Not Done</label>
            </div>
          </div>
          <div className="radio">
            <input
              onChange={() => setStatus(true)}
              type="radio"
              name="done"
              id="done"
              required
            />
            <div className="green">
              <label htmlFor="done"> Done</label>

            </div>

          </div>

          <input type="submit" value="Add" />
        </form>
      </section>
      {
        message.length > 0 ? <AlertMessage message={message} setMessage={setMessage} /> : null
      }
    </main>
  );
}
