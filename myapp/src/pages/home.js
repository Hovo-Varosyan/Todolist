import { useEffect, useState } from "react";
import "../assets/style/home.scss";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useNavigate, useParams } from "react-router";
import DeleteBtn from "../component/DeleteBtn";
import DoneBtn from "../component/DoneBtn";
import TaskEdit from "../component/TaskEdit";
import { useDispatch, useSelector } from 'react-redux';
import { getState } from "../store/Todostore";
import AlertMessage from '../component/Alert';
import server from "../api/api";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



function Home() {
  const [show, setShow] = useState(false);
  const { list, length } = useSelector(state => state.todo)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [message, setMessage] = useState([])
  const params = useParams()

  useEffect(() => {
    server(`/${params?.page}` || '/')
      .then((response) => {
        dispatch(getState(response.data))
      })
      .catch((response) => console.log(response));
  }, [params]);

  useEffect(() => {
    if (list.length === 0 && length !== 0) {
      const url = parseInt(params.page) - 1
      navigate('/' + url);
    }
  }, [list]);

  return (
    <>

      <main>
        <div className="home__main">
          <h1>Task List</h1>
          {list.length !== 0 ? <>
            <table border='1' className="Table">
              <thead>
                <tr>
                  <th>N<sup>o</sup></th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th colSpan={2}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {list !== "empty" ? (
                  list.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          {++i + (parseInt(params.page - 1 || 0) * 50)}
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
            {parseInt(length) > 0 && list.length > 0 && <Stack spacing={2}>
              <Pagination count={Math.ceil(parseInt(length) / 50)} onChange={(e, value) => navigate(`/${value}`)} defaultPage={parseInt(params.page) || 1} color="primary" />
            </Stack>}
          </>
            : 'Loading...'}
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
