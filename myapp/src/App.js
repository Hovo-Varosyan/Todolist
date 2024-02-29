import { Route, Routes } from "react-router";
import Login from "./pages/login";
import Registr from "./pages/registration";
import AddTask from "./pages/addtask";
import axios from "axios";
import Home from "./pages/home";
import './assets/style/style.scss'
import Task from "./pages/task";
import LoginRoute from './component/routesentings/loginroute'
import PrivateRoute from './component/routesentings/privateroute'
import Admin from "./pages/Admin";
import NotFound from "./pages/Notfound";

function App() {

  return (
    <>
      <Routes>
        <Route element={< LoginRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registr" element={<Registr />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/:page?" element={<Home />} />
          <Route path="/task/:id" element={<Task />} />
          {
            document.cookie.split(';').includes(" t_role=admin") && <Route path="/userlist" element={<Admin />} />
          }
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
