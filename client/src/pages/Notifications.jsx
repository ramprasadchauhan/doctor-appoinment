import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import { setUser } from "../redux/userSlice";

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = (key) => {
    console.log(key);
  };
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const items = [
    {
      key: "1",
      label: "Unseen",
      children: (
        <>
          <div className="text-end cursor-pointer hover:text-pink-500 transition duration-200">
            <h1 onClick={() => markAsAllSeen()}>Mark all as seen</h1>
          </div>
          <div>
            {user?.unSeenNotification?.map((notification, i) => {
              return (
                <div
                  onClick={() => navigate(notification.onClickPath)}
                  className="p-2 border border-slate-100"
                  key={i}
                >
                  <p>{notification?.message}</p>
                </div>
              );
            })}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Seen",
      children: (
        <>
          <div className="text-end cursor-pointer hover:text-pink-500 transition duration-200">
            <h1 onClick={() => deleteAllNotification()}>Delete All</h1>
          </div>
          <div>
            {user?.seenNotification?.map((notification, i) => {
              return (
                <div
                  onClick={() => navigate(notification.onClickPath)}
                  className="p-2 border border-slate-100"
                  key={i}
                >
                  <p>{notification?.message}</p>
                </div>
              );
            })}
          </div>
        </>
      ),
    },
  ];
  const markAsAllSeen = async () => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/user/mark-all-notifications-as-seen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ userId: user._id }),
      });
      dispatch(hideLoading());
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.data));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const deleteAllNotification = async () => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/user/delete-all-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ userId: user._id }),
      });
      dispatch(hideLoading());
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.data));
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
      <h1 className="text-3xl font-medium text-center">Notifications</h1>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Layout>
  );
};

export default Notifications;
