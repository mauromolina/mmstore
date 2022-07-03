import React, { FC, useState } from "react";

import { AnimateSharedLayout } from "framer-motion";
import { Grid, Stack, Text } from "@chakra-ui/react";

import { BuyButton, ProductItem, ProductModal } from "../components";
import {
  Product,
  CartAction,
  CartItem,
} from "../../interfaces/products.interfaces";
import { CartDrawer } from "../components/CartDrawer";
import { editCart } from '../selectors';

interface StoreScreenProps {
  products: Product[];
}

export const StoreScreen: FC<StoreScreenProps> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, toggleCart] = useState<boolean>(false);

  const handleEditCart = (product: Product, action: CartAction) => setCart(editCart(product, action));

  return (
    <>
      <Stack spacing={6}>
        {products.length ? (
          <Grid
            gridGap={8}
            templateColumns={{base: "repeat(auto-fill, minmax(240px, 1fr))", sm: "repeat(auto-fill, minmax(360px, 1fr))"}}
          >
            {products.map((prod) => (
              <ProductItem
                key={prod.id}
                product={prod}
                addToCart={(product) => handleEditCart(product, "increment")}
              />
            ))}
          </Grid>
        ) : (
          <Text color="gray.500" fontSize="lg" margin="auto">
            No hay productos
          </Text>
        )}
        {/* TODO: Animar botón */}
        <BuyButton cart={cart} toggleCart={toggleCart}/>
      </Stack>
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => toggleCart(false)}
        onDecrement={(product) => handleEditCart(product, "decrement")}
        onIncrement={(product) => handleEditCart(product, "increment")}
      />
    </>
  );
};
