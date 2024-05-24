import { useEffect, useState } from "react";
import "../assets/style/pageStyle/home.scss";
import { Button, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import { useNavigate, useParams } from "react-router";
import DeleteBtn from "../component/DeleteBtn";
import DoneBtn from "../component/DoneBtn";
import TaskEdit from "../component/TaskEdit";
import { useDispatch, useSelector } from "react-redux";
import { getState } from "../store/Todostore";
import AlertMessage from "../component/Alert";
import server from "../api/api";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Home() {
  const [show, setShow] = useState(false);
  const { list, length } = useSelector((state) => state.todo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);
  const [btnLoading, setBtnLoading] = useState([]);
  const params = useParams();

  useEffect(() => {
    server(`/home/${params?.page}` || "/home")
      .then((response) => {
        dispatch(getState(response.data));
      })
      .catch((response) => console.log(response));
  }, [params]);

  useEffect(() => {
    if (list === "empty" && parseInt(params.page) > 1) {
      const url = parseInt(params.page) - 1;
      navigate("/home/" + url);
    }
  }, [list]);

  return (
    <>
      <main>
        <div className="home__main">
          <h1>Task List</h1>
          {list.length !== 0 ? (
            <>
              <table border="1" className="Table">
                <thead>
                  <tr>
                    <th>
                      N<sup>o</sup>
                    </th>
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
                        <tr key={e._id}>
                          <td>{++i + parseInt(params.page - 1 || 0) * 50}</td>
                          <td> {e.title}</td>
                          <td>{e.description}</td>
                          <td>
                            <DoneBtn
                              id={e._id}
                              btnLoading={btnLoading}
                              setBtnLoading={setBtnLoading}
                              setMessage={setMessage}
                              status={e.status}
                            />
                          </td>
                          <td>
                            <Button
                              variant="contained"
                              onClick={() => navigate(`/task/${e._id}`)}
                              color="primary"
                            >
                              <RemoveRedEyeSharpIcon />
                            </Button>
                          </td>
                          <td>
                            <DeleteBtn
                              id={e._id}
                              setMessage={setMessage}
                              btnLoading={btnLoading}
                              setBtnLoading={setBtnLoading}
                            />
                          </td>
                          <td>
                            <Button
                              disabled={btnLoading.includes(e._id)}
                              variant="outlined"
                              onClick={() => setShow(e._id)}
                            >
                              {btnLoading.includes(e._id) && <CircularProgress size={16} sx={{ marginRight: "10px" }} />}
                              <EditIcon />
                              Edit
                            </Button>
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
              {parseInt(length) > 0 && list.length > 0 && (
                <Stack className="" spacing={2}>
                  <Pagination
                    count={Math.ceil(parseInt(length) / 50)}
                    onChange={(e, value) => navigate(`/home/${value}`)}
                    page={parseInt(params.page || 1)}
                    size="large"
                    color="primary"
                  />
                </Stack>
              )}
            </>
          ) : (
            "Loading..."
          )}
        </div>
      </main>
      {show && (
        <TaskEdit
          id={show}
          setMessage={setMessage}
          btnLoading={btnLoading}
          setBtnLoading={setBtnLoading}
          setShow={setShow}
        />
      )}
      {message.length > 0 ? (
        <AlertMessage message={message} setMessage={setMessage} />
      ) : null}
    </>
  );
}
export default Home;
