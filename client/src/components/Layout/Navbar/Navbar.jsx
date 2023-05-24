import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import { Logo } from "../Logo/Logo";

export const Navbar = ({ drawerRef, openDrawer }) => {
  return (
    <nav>
      <Box
        display='flex'
        position='sticky'
        justifyContent='space-between'
        h='80px'
        w='100%'
        shadow='0 2px 4px 0 rgba(0,0,0,.2)'
        alignItems={"center"}
        px='20px'
      >
        <Logo />
        <Box>
          <Box></Box>
          <Box display='flex' alignItems='center' gap='10px'>
            <button ref={drawerRef} onClick={openDrawer}>
              <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
            </button>
          </Box>
        </Box>
      </Box>
    </nav>
  );
};
