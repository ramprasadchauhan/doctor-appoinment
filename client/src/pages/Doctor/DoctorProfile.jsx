import { useEffect, useState } from "react";
import DoctorForm from "../../components/DoctorForm";
import Layout from "../../components/Layout";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/doctor/get-doctor-info-by-user-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId: params.userId,
        }),
      });
      dispatch(hideLoading());
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setDoctor(data.data);
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
    getDoctorData();
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/doctor/update-doctor-profile", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: user._id,
          timings: [
            values.timings[0].format("HH:mm"),
            values.timings[1].format("HH:mm"),
          ],
        }),
      });
      dispatch(hideLoading());
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        toast("Redirect to login page");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1>Doctor Profile</h1>
      {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
    </Layout>
  );
};

export default DoctorProfile;
