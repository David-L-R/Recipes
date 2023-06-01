import React from "react";
import { Navbar } from "../Navbar/Navbar";
import styled from "styled-components";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 20px;
`;

export const PageWrapper = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerButton = React.useRef();

  return (
    <>
      <Navbar drawerRef={drawerButton} openDrawer={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={drawerButton}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Dan Abramov</DrawerHeader>

          <DrawerBody>
            <Text>Profile</Text>
            <Text>Settings</Text>
            <Text>My Favorites</Text>
            <Text>My Recipes</Text>
          </DrawerBody>

          <DrawerFooter>Logout</DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Body>{children}</Body>
    </>
  );
};
