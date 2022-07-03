import { FC, useMemo } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Button, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";

import { CartItem, Product } from "../../interfaces";
import { parseCurrency } from "../../utils/currency";

interface BuyButtonProps {
  cart: CartItem[];
  toggleCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BuyButton: FC<BuyButtonProps> = ({ cart, toggleCart }) => {
  const text = useMemo(() => {
    return cart
      .reduce(
        (msg, prod) =>
          msg.concat(`* ${prod.title} - ${parseCurrency(prod.price)}\n`),
        ""
      )
      .concat(
        `\n Total: ${parseCurrency(
          cart.reduce((total, prod) => total + prod.price, 0)
        )}`
      );
  }, [cart]);

  const total = useMemo(
    () =>
      parseCurrency(
        cart.reduce((total, prod) => total + prod.price * prod.quantity, 0)
      ),
    [cart]
  );

  const quantity = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  return (
    <>
      {Boolean(cart.length) && (
        <Flex
          alignItems="center"
          bottom={4}
          justifyContent="center"
          position="sticky"
        >
          <Button
            boxShadow="xl"
            colorScheme="primary"
            onClick={() => toggleCart(true)}
            size="lg"
            width={{ base: "100%", sm: "fit-content" }}
          >
            <Stack direction="row" spacing={6} alignItems="center">
              <Stack direction="row" spacing={3} alignItems="center">
                <Text fontSize="md">Ver Pedido</Text>
                <Text
                  backgroundColor="rgba(0,0,0,0.25)"
                  borderRadius="sm"
                  color="gray.100"
                  fontSize="xs"
                  fontWeight="400"
                  paddingX={2}
                  paddingY={1}
                >
                  {quantity} items
                </Text>
                <Text fontSize="md">{total}</Text>
              </Stack>
            </Stack>
          </Button>
        </Flex>
      )}
    </>
  );
};
