import { FC, useMemo, useEffect } from "react";

import {
  Button,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { CartItem, Product } from "../../interfaces";

import { parseCurrency } from "../../utils/currency";

interface CartDrawerProps extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

export const CartDrawer: FC<CartDrawerProps> = ({
  items,
  onClose,
  onDecrement,
  onIncrement,
  ...props
}) => {
  const total = useMemo(
    () =>
      parseCurrency(
        items.reduce((total, prod) => total + prod.price * prod.quantity, 0)
      ),
    [items]
  );

  const quantity = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const text = useMemo(
    () =>
      items
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title}${
                product.quantity > 1 ? ` (X${product.quantity})` : ``
              } - ${parseCurrency(product.price * product.quantity)}\n`
            ),
          ``
        )
        .concat(`\nTotal: ${total}`),
    [items, total]
  );

  useEffect(() => {
    if (!items.length) {
      onClose();
    }
  }, [items.length, onClose]);

  return (
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay>
        <DrawerContent paddingTop={4}>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader paddingX={4}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack
                fontWeight="500"
                direction="row"
                fontSize={{ base: "2xl", sm: "3xl" }}
              >
                <Text>Tu pedido</Text>{" "}
                <Text color="gray.400">({quantity})</Text>
              </Stack>
              {/* <DrawerCloseButton /> */}
              <CloseButton onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody paddingX={4}>
            {items.length ? (
              <Stack divider={<Divider />} spacing={4}>
                {items.map((product) => (
                  <Stack key={product.id} direction="row">
                    <Stack width="100%">
                      <Stack
                        fontWeight="500"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text fontSize="lg">{product.title}</Text>
                        <Text>
                          {parseCurrency(product.price * product.quantity)}
                        </Text>
                      </Stack>
                      <Stack direction="row">
                        <Button
                          size="xs"
                          onClick={() => onDecrement(product)}
                          colorScheme="primary"
                          borderRadius={999}
                        >
                          {" "}
                          -{" "}
                        </Button>
                        <Text fontWeight={500}>{product.quantity}</Text>
                        <Button
                          size="xs"
                          onClick={() => onIncrement(product)}
                          colorScheme="primary"
                          borderRadius={999}
                        >
                          {" "}
                          +{" "}
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Text color="gray.400">No hay elementos en tu carrito</Text>
            )}
          </DrawerBody>

          {Boolean(items.length) && (
            <DrawerFooter>
              <Stack width="100%" spacing={4}>
                <Divider />
                <Stack
                  alignItems="center"
                  direction="row"
                  fontSize="lg"
                  fontWeight="500"
                  justifyContent="space-between"
                >
                  <Text>Total</Text>
                  <Text>{total}</Text>
                </Stack>
                <Button
                  as={Link}
                  colorScheme="whatsapp"
                  isExternal
                  size="lg"
                  width="100%"
                  leftIcon={
                    <Image
                      src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"
                      alt="Whatsapp"
                    />
                  }
                  href={`https://wa.me/5491141414141?text=${encodeURIComponent(
                    text
                  )}`}
                >
                  Completar pedido
                </Button>
              </Stack>
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
