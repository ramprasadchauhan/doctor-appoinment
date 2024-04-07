import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
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
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
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
