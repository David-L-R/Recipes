import { Avatar, Box, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import React from "react";
import "./preventSelection.css";

export const Logo = () => {
  return (
    <LinkBox>
      <LinkOverlay href='/dashboard'>
        <Box
          display='flex'
          alignItems='center'
          gap='20px'
          className='prevent-select'
        >
          <Avatar
            name='Logo'
            src='https://img.uxwing.com/wp-content/themes/uxwing/download/fruits-vegetables/tomato-icon.png'
          />

          <Text
            fontSize='30px'
            as='b'
            color='tomato'
            fontFamily='Comic Sans MS, cursive'
          >
            this.recipe
          </Text>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};
