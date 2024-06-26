/* eslint-disable no-unused-vars */
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
const Register = () => {
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
    <div className="authentication min-h-screen bg-gradient-to-r from-violet-200 to-pink-200 flex justify-center items-center">
      <div className="authentication-form card bg-white p-4 rounded w-[450px]">
        <h1 className="text-center bg-orange-500 text-white p-2 rounded font-bold ">
          Nice To meet You
        </h1>
        <Form onFinish={onFinish} className="mt-4" layout="vertical">
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <button
            type="summit"
            className="py-2 text-center uppercase mt-4 w-full border bg-green-600 text-white rounded hover:bg-green-700"
          >
            Register
          </button>
        </Form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have you an account ? </span>
          <Link to="/login" className="text-blue-500 hover:text-pink-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
