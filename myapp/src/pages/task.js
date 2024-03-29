import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/style/pageStyle/task.scss";
import server from "../api/api";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

function Task() {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    server(`/task/${id}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {data && (
        <main className="task__main user__container">
          <h1>{data.title}</h1>
          <div>
            <span>
              {data.status ? (
                <CheckCircleOutlineIcon sx={{ color: "#24e424" }} />
              ) : (
                <HighlightOffOutlinedIcon sx={{ color: "#ff2222" }} />
              )}
            </span>
            <p>{data.description}</p>
          </div>
        </main>
      )}
    </>
  );
}
export default Task;
