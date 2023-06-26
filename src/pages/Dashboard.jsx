import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const checkAuth = async () => {
    const response = await axios
      .get(`${api}/checkauth`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
    console.log(response);
    if (!response?.data?.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const [date, setDate] = useState();
  const [company, setCompany] = useState();
  const [owner, setOwner] = useState();
  const [item, setItem] = useState();
  const [quantity, setQuantity] = useState();
  const [weight, setWeight] = useState();
  const [requestForShipment, setRequestForShipment] = useState();
  const [trackingID, setTrackingID] = useState();
  const [shipmentSize, setShipmentSize] = useState();
  const [boxCount, setBoxCount] = useState();
  const [specification, setSpecification] = useState();
  const [checklistQuantity, setChecklistQuantity] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date && item && quantity && weight && trackingID) {
      const response = await axios.post("http://localhost:5000/order", {
        created_by: localStorage.getItem("email"),
        order_date: date,
        company,
        owner,
        item,
        quantity,
        weight,
        request: requestForShipment,
        tracking_id: trackingID,
        shipment_size: shipmentSize,
        box_count: boxCount,
        specification,
        checklist_quantity: checklistQuantity,
      });
      if (!response.data.success) {
        console.log("Order not created");
      }
      setDate("");
      setCompany("");
      setOwner("");
      setItem("");
      setQuantity("");
      setWeight("");
      setRequestForShipment("");
      setTrackingID("");
      setShipmentSize("");
      setBoxCount("");
      setSpecification("");
      setChecklistQuantity("");
    } else alert("Please fill the required fields");
  };

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
      <VStack width={{ base: "80%", md: "55%" }} mt={10}>
        <FormControl id="order_date" isRequired>
          <FormLabel>Order Date</FormLabel>
          <Input
            type="date"
            focusBorderColor={"gray.500"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="company">
          <FormLabel>Company</FormLabel>
          <Input
            type="text"
            pattern="[a-zA-Z0-9 ]+"
            focusBorderColor={"gray.500"}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </FormControl>
        <FormControl id="owner">
          <FormLabel>Owner</FormLabel>
          <Input
            type="text"
            pattern="[a-zA-Z0-9 ]+"
            focusBorderColor={"gray.500"}
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </FormControl>
        <FormControl id="item" isRequired>
          <FormLabel>Item</FormLabel>
          <Input
            type="text"
            focusBorderColor={"gray.500"}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </FormControl>
        <FormControl id="quantity" isRequired>
          <FormLabel>Quantity</FormLabel>
          <NumberInput
            step={1}
            min={1}
            max={30}
            precision={0}
            focusBorderColor={"gray.500"}
            value={quantity}
            onChange={(val) => setQuantity(val)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="weight" isRequired>
          <FormLabel>Weight</FormLabel>
          <NumberInput
            step={0.01}
            min={1}
            precision={2}
            focusBorderColor={"gray.500"}
            value={weight}
            onChange={(val) => setWeight(val)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="request_for_shipment">
          <FormLabel>Request For Shipment</FormLabel>
          <Input
            type="text"
            focusBorderColor={"gray.500"}
            value={requestForShipment}
            onChange={(e) => setRequestForShipment(e.target.value)}
          />
        </FormControl>
        <FormControl id="tracking_id" isRequired>
          <FormLabel>Tracking ID</FormLabel>
          <Input
            type="number"
            focusBorderColor={"gray.500"}
            value={trackingID}
            onChange={(e) => setTrackingID(e.target.value)}
          />
        </FormControl>
        <FormControl id="shipment_size">
          <FormLabel>Shipment Size</FormLabel>
          <Input
            type="text"
            focusBorderColor={"gray.500"}
            value={shipmentSize}
            onChange={(e) => setShipmentSize(e.target.value)}
          />
        </FormControl>
        <FormControl id="box_count">
          <FormLabel>Box Count</FormLabel>
          <NumberInput
            step={1}
            min={1}
            max={90}
            precision={0}
            focusBorderColor={"gray.500"}
            value={boxCount}
            onChange={(val) => setBoxCount(val)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="specification">
          <FormLabel>Specification</FormLabel>
          <Input
            type="text"
            focusBorderColor={"gray.500"}
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
          />
        </FormControl>
        <FormControl id="checklist_quantity">
          <FormLabel>Checklist Quantity</FormLabel>
          <Input
            type="text"
            focusBorderColor={"gray.500"}
            value={checklistQuantity}
            onChange={(e) => setChecklistQuantity(e.target.value)}
          />
        </FormControl>
        <Button
          bg={"#151f21"}
          color={"white"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "md",
          }}
          mt={10}
          mb={10}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </VStack>
    </Flex>
  );
};

export default Dashboard;
