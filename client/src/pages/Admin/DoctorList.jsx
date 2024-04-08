import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { Table } from "antd";
const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/admin/get-all-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h1>
          {record.firstName} {record.lastName}
        </h1>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" && (
            <h1 className="cursor-pointer hover:text-pink-500 ">Approved</h1>
          )}
          {record.status === "approved" && (
            <h1 className="cursor-pointer hover:text-pink-500 ">Block</h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default DoctorList;
