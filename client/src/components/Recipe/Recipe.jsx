import React, { useEffect, useState } from "react";
import { Box, Image, Badge, Button } from "@chakra-ui/react";
// import { StarIcon } from "@chakra-ui/icons";
import { pickRandomNumbers } from "./utils";
import { colors } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as RedPizza } from "../../assets/pizza-slice-solid-red.svg";
import { ReactComponent as GrayPizza } from "../../assets/pizza-slice-solid.svg";

export const Recipe = ({ recipe, getById }) => {
  const [colorIndexes, setColorIndexes] = useState([]);

  useEffect(() => {
    setColorIndexes(pickRandomNumbers(recipe.tags.length, colors.length));
  }, []);

  const renderDifficulty = () => {
    const difficulty = {};
    switch (recipe.difficulty) {
      case 1:
        difficulty.text = "Beginner";
        difficulty.color = "green";
        break;
      case 2:
        difficulty.text = "Intermediate";
        difficulty.color = "yellow";
        break;
      default:
        difficulty.text = "Advanced";
        difficulty.color = "red";
        break;
    }

    return (
      <Badge borderRadius='l' px='4' colorScheme={difficulty.color}>
        {difficulty.text}
      </Badge>
    );
  };

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={recipe.image} alt={recipe.title} />

      <Box p='6'>
        <Box display='flex' gap='10px' flexWrap='wrap' alignItems='baseline'>
          {recipe.tags.map((tag, index) => {
            return (
              <Badge
                borderRadius='xl'
                px='2'
                colorScheme={colors[colorIndexes[index]]}
              >
                {tag}
              </Badge>
            );
          })}
        </Box>

        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          mt='2'
        >
          Prep: {recipe.time.prepTime} minutes &bull; Cook:{" "}
          {recipe.time.cookTime} minutes
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {recipe.title}
        </Box>

        <Box>{recipe.description}</Box>

        <Box display='flex' mt='2' alignItems='center'>
          {renderDifficulty()}
        </Box>

        <Box display='flex' flexDirection='row-reverse'>
          <Button onClick={getById} colorScheme='teal'>
            Read More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
