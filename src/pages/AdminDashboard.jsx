import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { api } from "../utils/api";

const AdminDashboard = () => {
  const [data, setData] = useState();
  const fetchdata = async () => {
    const response = await axios
      .get("https://sql-app.onrender.com/fetchdata", {
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

  // if (data!==undefined) {
  //   var customer1QuantitySum=0;
  //   data.forEach(element => {
      
  //   });
  // }

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
