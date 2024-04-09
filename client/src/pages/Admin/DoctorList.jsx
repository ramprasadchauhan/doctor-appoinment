import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { Table } from "antd";
import { toast } from "react-hot-toast";
const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  const dispatch = useDispatch();
  const getDoctorData = async () => {
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

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await fetch("/api/admin/change-doctor-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          doctorId: record._id,
          userId: record.userId,
          status: status,
        }),
      });
      dispatch(hideLoading());
      const data = await resposne.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        getDoctorData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
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
            <h1
              onClick={() => changeDoctorStatus(record, "approved")}
              className="cursor-pointer hover:text-pink-500 "
            >
              Approved
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              onClick={() => changeDoctorStatus(record, "blocked")}
              className="cursor-pointer hover:text-pink-500 "
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <Table columns={columns} dataSource={doctors} rowKey="_id" />
    </Layout>
  );
};

export default DoctorList;
