import Layout from "../components/Layout";
import { Form, Row, Col, Input, TimePicker } from "antd";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
        body: JSON.stringify({ ...values, userId: user._id }),
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
      <h1 className="font-bold text-center mt-10 text-4xl text-pink-500">
        Apply Doctor
      </h1>
      <div className="w-full">
        <Form onFinish={onFinish} layout="vertical">
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true }]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Website"
                name="website"
                rules={[{ required: true }]}
              >
                <Input placeholder="Website" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <h1 className="mt-3">Professional Information</h1>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Specialization"
                name="specialization"
                rules={[{ required: true }]}
              >
                <Input placeholder="Specialization" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Experience"
                name="experience"
                rules={[{ required: true }]}
              >
                <Input placeholder="Experience" type="number" min={0} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Fee Per Cunsultation"
                name="feePerCunsultation"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Fee Per Cunsultation"
                  type="number"
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                required
                label="Timings"
                name="timings"
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <div className=" flex justify-end items-center">
            <button
              className=" mt-4 border px-4 py-2 border-gray-300 bg-red-600 text-white uppercase rounded-md hover:bg-red-700 active:bg-red-800"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
