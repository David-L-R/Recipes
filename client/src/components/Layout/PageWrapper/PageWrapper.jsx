import React from "react";
import { Navbar } from "../Navbar/Navbar";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text,
  useDisclosure,
  useRadio,
} from "@chakra-ui/react";

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
      {children}
    </>
  );
};
