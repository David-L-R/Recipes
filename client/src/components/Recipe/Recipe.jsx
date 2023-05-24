import React, { useEffect, useState } from "react";
import { Box, Image, Badge, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { pickRandomNumbers } from "./utils";
import { colors } from "./constants";

export const Recipe = ({ recipe, getById }) => {
  const [colorIndexes, setColorIndexes] = useState([]);

  useEffect(() => {
    setColorIndexes(pickRandomNumbers(recipe.tags.length, colors.length));
  }, []);

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
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            Difficulty
          </Box>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < recipe.difficulty ? "teal.500" : "gray.300"}
              />
            ))}
        </Box>

        <Button onClick={getById}>Get Recipe By ID</Button>
      </Box>
    </Box>
  );
};