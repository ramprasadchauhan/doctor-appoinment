import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { Table } from "antd";
const UserList = () => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/admin/get-all-users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setUsers(data.data);
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
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, records) => (
        <div className="flex">
          <h1>Block</h1>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default UserList;
