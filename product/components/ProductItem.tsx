import { FC } from "react";

import { Button, Image, Stack, Text } from "@chakra-ui/react";

import { Product } from "../../interfaces";
import { parseCurrency } from "../../utils/currency";

interface ProductProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export const ProductItem: FC<ProductProps> = ({ product, addToCart }) => {

  return (
      <Stack
        key={product.id}
        alignItems="center"
        borderColor="gray.300"
        borderRadius="md"
        borderWidth={1}
        data-test-id="product"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack direction="row" padding={2} spacing={4} width="100%">
            <Stack spacing={1} width="100%" justifyContent="space-between">
              <Stack spacing={1}>
                <Text fontWeight="500">{product.title}</Text>
                <Text fontSize="sm" color="gray.500">{product.description}</Text>
              </Stack>
              <Stack alignItems="baseline" direction="row" justifyContent="space-between">
                <Text color="green.500" fontSize="sm" fontWeight="500">
                  {parseCurrency(product.price)}
                </Text>
                <Button
                  size="xs"
                  onClick={() => addToCart(product)}
                >
                  Agregar
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Image
            alt={product.description}
            backgroundColor="white"
            borderRadius="md"
            height={{base: 24, sm: 36}}
            loading="lazy"
            minWidth={{base: 24, sm: 36}}
            objectFit="contain"
            src={product.image}
            width={{base: 24, sm: 36}}
          />

        </Stack>
  );
};
