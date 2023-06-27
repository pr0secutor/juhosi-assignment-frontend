import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { api } from "../utils/api";

const AdminDashboard = () => {
  const [data, setData] = useState();
  const fetchdata = async () => {
    const options = {
      method: "GET",
      headers: {
        "access-token": localStorage.getItem("token"),
      },
    };

    // const response = await fetch(`${api}/fetchdata`, options)

    const response = await axios
      .get(`${api}/fetchdata`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(response);
    setData(response?.data.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  console.log(data);
  
  if(data) var arrayData = Array.from(data);
  console.log(arrayData);
  

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
      <TableContainer w={"65%"} mt={20}>
        <Table variant={"simple"}>
          <TableCaption>User Data</TableCaption>
          <Thead>
            <Tr>
              <Th>Cusotomer ID</Th>
              <Th>Quantity</Th>
              <Th>Weight</Th>
              <Th>Box Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {Array.from(data).map((item) => {
              return(
                <Tr>
                  <Td>{item[3]}</Td>
                  <Td>{item[1]}</Td>
                  <Td>{item[2]}</Td>
                  <Td>{item[0]}</Td>
                </Tr>
              )
            })} */}
            <Tr>
              <Td>{data?.[0]?.customer_id}</Td>
              <Td>{data?.[0]?.quantity_sum}</Td>
              <Td>{data?.[0]?.weight_sum}</Td>
              <Td>{data?.[0]?.box_count_sum}</Td>
            </Tr>
            <Tr>
              <Td>{data?.[1]?.customer_id}</Td>
              <Td>{data?.[1]?.quantity_sum}</Td>
              <Td>{data?.[1]?.weight_sum}</Td>
              <Td>{data?.[1]?.box_count_sum}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default AdminDashboard;
