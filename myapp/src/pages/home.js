import axios from "axios";
import { useEffect, useState } from "react";
import "../assets/style/table.scss";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useNavigate } from "react-router";
import DeleteBtn from "../component/DeleteBtn";
import DoneBtn from "../component/DoneBtn";
import TaskEdit from "../component/TaskEdit";
import { useDispatch, useSelector } from 'react-redux';
import { getState } from "../store/Todostore";
import AlertMessage from '../component/Alert';



function Home() {
  const [show, setShow] = useState(false);
  const todoList = useSelector(state => state.todo)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [message, setMessage] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((respons) => dispatch(getState(respons.data.list)))
      .catch((respons) => console.log(respons));
  }, []);


  return (
    <>

      <main>
        <div className="home__main">
          <h1>Task List</h1>
          {todoList.length !== 0 ? (
            <table border='1' className="Table">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th colSpan={2}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {todoList !== "empty" ? (
                  todoList.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          {i}
                        </td>
                        <td> {e.title}</td>
                        <td>{e.description}</td>
                        <td>
                          <DoneBtn id={e._id} setMessage={setMessage} status={e.status} />
                        </td>
                        <td>
                          <Button variant="contained" onClick={() => navigate(`/task/${e._id}`)} color="primary">
                            <RemoveRedEyeSharpIcon />
                          </Button>
                        </td>
                        <td>
                          <DeleteBtn id={e._id} setMessage={setMessage} />
                        </td>
                        <td>
                          <Button variant="outlined" onClick={() => setShow(e._id)} ><EditIcon />Edit</Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Empty</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : 'Loading...'}
        </div>
      </main>
      {
        show && <TaskEdit id={show} setMessage={setMessage} setShow={setShow} />
      }
       {
                message.length > 0 ? <AlertMessage message={message} setMessage={setMessage} /> : null
      }
    </>
  );
}
export default Home;
