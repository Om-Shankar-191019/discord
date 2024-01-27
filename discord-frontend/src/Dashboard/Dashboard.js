import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { useSelector } from "react-redux";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
// import { logout } from "../shared/utils/auth";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    if (currentUser) {
      connectWithSocketServer();
    }
  }, [currentUser]);
  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Dashboard;
