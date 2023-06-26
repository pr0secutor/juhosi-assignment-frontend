import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState();

  const fetchdata = async () => {
    const response = await axios
      .get("http://localhost:5000/fetchdata", {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .catch((error) => {
        console.log(error);
      });
    setData(response?.data.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  console.log(data);

  let unique_values = data
    ?.map((item) => item.created_by)
    .filter(
      (value, index, current_value) => current_value.indexOf(value) === index
    );

  console.log(unique_values);

  return (
    <Flex
      as={motion.div}
      height={"100vh"}
      flexDir={"column"}
      alignItems={"center"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
    >
      <Header />
    </Flex>
  );
};

export default AdminDashboard;
