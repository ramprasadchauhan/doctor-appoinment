import Layout from "../components/Layout";

import { hideLoading, showLoading } from "../redux/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/user/apply-doctor-account", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: user._id,
          // timings: [
          //   moment(values.timings[0]).format("HH:mm"),
          //   moment(values.timings[1]).format("HH:mm"),
          // ],
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
      <h1 className="font-bold text-center mt-10 text-4xl text-pink-500">
        Apply Doctor
      </h1>
      <div className="w-full">
        <DoctorForm onFinish={onFinish} />
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
