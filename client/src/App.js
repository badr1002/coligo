import './App.scss';
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRoutes, useNavigate } from "react-router-dom";

import AppLayout from './components/layouts/AppLayout';
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Pages/Home";


import { logout } from "./redux/actions/auth";
import { clearMessage } from "./redux/actions/message";
import CheckWordExam from './components/quizze/checkWordExam';



const App = () => {
  const [isAutheticated, setisAutheticated] = useState(false);
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
    
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setisAutheticated(true);
    } else {
      setisAutheticated(false)
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isAutheticated) {
      if (["/login", "/register"].includes(location.pathname)) navigate(location.pathname);
      else navigate('/login');
    } else {
      //navigate(location.pathname);
    }
  }, [navigate, isAutheticated]);


  return (
    useRoutes([
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <AppLayout onLogOut={logOut} currentUser={currentUser} />,
        children: [
          {
            path: "/", element: <Home auth={isAutheticated} />,
          },
          {
            path: "/Schedule", element: <CheckWordExam />,
          },
          {
            path: "/Courses", element: <Home auth={isAutheticated} />,
          },
          {
            path: "/Gradebook", element: <Home auth={isAutheticated} />,
          },
          {
            path: "/Performance", element: <Home auth={isAutheticated} />,
          },
          {
            path: "/Announcement", element: <Home auth={isAutheticated} />,
          },

        ],
      },
    ])
  )
}



export default App;
