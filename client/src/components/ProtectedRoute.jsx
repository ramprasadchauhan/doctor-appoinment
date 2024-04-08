/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertSlice";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/user/get-user-info-by-id", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      const data = await res.json();
      console.log(data);
      if (data.success) {
        dispatch(setUser(data.data));
      } else {
        dispatch(hideLoading());
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
    // getUser();
  }, [user]);

  console.log(user);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
