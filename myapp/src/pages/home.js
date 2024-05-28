import { useEffect, useState } from "react";
import "../assets/style/pageStyle/home.scss";
import {  CircularProgress, IconButton } from "@mui/material";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import { useNavigate, useParams } from "react-router";
import TaskEdit from "../component/TaskEdit";
import { useDispatch, useSelector } from "react-redux";
import { getState } from "../store/Todostore";
import AlertMessage from "../component/Alert";
import server from "../api/api";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DoneBtn from "../component/DoneBtn";
import DeleteBtn from "../component/DeleteBtn";
import EditIcon from "@mui/icons-material/Edit";

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
      <main className="home__main">
        <div className="home__main__div">
          <h1>Task List</h1>
          {list.length !== 0 && list !== "empty" ? (
            <>
              {list.map((e, i) => {
                let loading = btnLoading.includes(e._id);
                return (
                  <div className="todo">
                    <div className="status">
                      <DoneBtn
                        id={e._id}
                        btnLoading={btnLoading}
                        setBtnLoading={setBtnLoading}
                        setMessage={setMessage}
                        status={e.status}
                      />
                    </div>
                    <div className="text">
                      <h5>{e.title}</h5>
                      <p>{e.description}</p>
                      <p>
                        <span>{e.date}</span>-<span>{e.time}</span>
                      </p>
                    </div>

                    <div className="button">
                      <IconButton
                        disabled={loading}
                        className="icon_btn"
                        onClick={() => navigate(`/task/${e._id}`)}
                      >
                        {loading ? (
                          <CircularProgress size={18} />
                        ) : (
                          <RemoveRedEyeSharpIcon />
                        )}
                      </IconButton>
                      <DeleteBtn
                        id={e._id}
                        setMessage={setMessage}
                        btnLoading={btnLoading}
                        setBtnLoading={setBtnLoading}
                      />
                      <IconButton
                        disabled={loading}
                        className="icon_btn"
                        onClick={() => setShow(e._id)}
                      >
                        {loading ? (
                          <CircularProgress size={18} />
                        ) : (
                          <EditIcon />
                        )}
                      </IconButton>
                    </div>
                  </div>
                );
              })}
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
          ) : list === "empty" ? (
            <div className="todo">Empty</div>
          ) : (
            <h3>Loading...</h3>
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
