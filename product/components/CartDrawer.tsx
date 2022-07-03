import { FC, useMemo, useEffect } from "react";

import {
  Button,
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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu pedido</DrawerHeader>

          <DrawerBody>
            {items.length ? (
              <Stack divider={<Divider />} spacing={4}>
                {items.map((product) => (
                  <Stack key={product.id} direction="row">
                    <Stack width="100%">
                      <Stack direction="row" justifyContent="space-between">
                        <Text fontWeight="500">{product.title}</Text>
                        <Text color="green.400">
                          {parseCurrency(product.price * product.quantity)}
                        </Text>
                      </Stack>
                      <Stack direction="row">
                        <Button size="xs" onClick={() => onDecrement(product)}>
                          {" "}
                          -{" "}
                        </Button>
                        <Text>{product.quantity}</Text>
                        <Button size="xs" onClick={() => onIncrement(product)}>
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
              <Button
                as={Link}
                colorScheme="whatsapp"
                isExternal
                size="lg"
                width="100%"
                leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff" alt="Whatsapp"/>}
                href={`https://wa.me/5491141414141?text=${encodeURIComponent(
                  text
                )}`}
              >
                Completar pedido ({total})
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
