import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Gi3DStairs } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Flex
      as="nav"
      height={16}
      width={"100%"}
      position={"sticky"}
      top={0}
      justifyContent={"space-between"}
      p={4}
      bgColor={"gray.100"}
      alignItems={"center"}
      zIndex={1}
    >
      <Gi3DStairs style={{ fontSize: "40px" }} />
      <Button
        bg={"#151f21"}
        color={"white"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "md",
        }}
        leftIcon={<BiLogOutCircle />}
        onClick={logout}
      >
        Log Out
      </Button>
    </Flex>
  );
};

export default Header;
