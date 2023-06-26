import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    console.log(response);
    if (!response?.data.success) {
      alert("Invalid Credentials");
    }
    localStorage.setItem("token", response?.data.token);
    localStorage.setItem("email", email);
    if (response?.data.data.is_admin) navigate("/admindash");
    else navigate("/dash");
  };

  return (
    <Flex
      as={motion.div}
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.50"}
      initial={{ opacity: 0, }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"gray.900"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                focusBorderColor={"gray.500"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                focusBorderColor={"gray.500"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox colorScheme="gray">Remember me</Checkbox>
                <Link color={"gray.900"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"#151f21"}
                color={"white"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
