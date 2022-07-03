import { FC, useMemo } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Button, Flex, Image, Link } from '@chakra-ui/react'

import { CartItem, Product } from '../../interfaces';
import { parseCurrency } from '../../utils/currency';

interface BuyButtonProps {
    cart: CartItem[],
    toggleCart: React.Dispatch<React.SetStateAction<boolean>>
}

export const BuyButton: FC<BuyButtonProps> = ({cart, toggleCart}) => {

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
    
    
  return (
    <>
      {Boolean(cart.length) && (
        <Flex
          alignItems="center"
          justifyContent="center"
          bottom={4}
          position="sticky"
          >
          <Button
            colorScheme="whatsapp"
            width={{base: "100%", sm: "fit-content"}}
            size="lg"
            onClick={() => toggleCart(true)}
          >
            Ver Pedido: ({cart.reduce((acc, item) => acc + item.quantity, 0)} productos)
          </Button>
        </Flex>
      )}
    </>
  )
}
