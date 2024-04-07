import { useEffect } from "react";

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
  return <div>Home</div>;
};

export default Home;
