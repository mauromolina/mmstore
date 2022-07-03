import { Dispatch, FC, SetStateAction } from "react";

import { Button, Image, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { CartItem, Product } from "../../interfaces";
import { parseCurrency } from "../../utils/currency";

interface ProductProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export const ProductItem: FC<ProductProps> = ({ product, addToCart }) => {

  return (
      <Stack
        key={product.id}
        borderColor="gray.200"
        borderRadius="md"
        borderWidth={1}
        boxShadow="md"
        data-test-id="product"
        padding={4}
        spacing={3}
      >
        <Stack direction="row">
          <Image
            alt={product.description}
            as={motion.img}
            backgroundColor="white"
            borderRadius="md"
            height={16}
            loading="lazy"
            objectFit="contain"
            src={product.image}
          />
          <Stack spacing={1}>

            <Text>{product.title}</Text>
            <Text color="green.500" fontSize="sm" fontWeight="500">
            {parseCurrency(product.price)}
            </Text>
          </Stack>
          </Stack>
          <Button
            colorScheme="primary"
            size="sm"
            onClick={() => addToCart(product)}
          >
            Agregar
          </Button>

        </Stack>
  );
};
