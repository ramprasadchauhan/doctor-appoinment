import { useEffect } from "react";
import Layout from "../components/Layout";

const Home = () => {
  const getData = async () => {
    try {
      const res = await fetch("/api/user/get-user-info-by-id", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="min-h-screen">
      <Layout>
        <div>Apply Doctor</div>
      </Layout>
    </div>
  );
};

export default Home;
