import React, { FC } from 'react'
import { Flex, Image } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface ProductModalProps {
    selectedImg: string,
    setSelectedImg: React.Dispatch<React.SetStateAction<string>>
}

export const ProductModal: FC<ProductModalProps> = ({ selectedImg, setSelectedImg }) => {
  return (
    <AnimatePresence>
        {selectedImg && (
          <Flex
            alignItems="center"
            as={motion.div}
            backgroundColor="rgba(0,0,0,0.5)"
            height="100%"
            justifyContent="center"
            key="backdrop"
            layoutId={selectedImg}
            left={0}
            onClick={() => setSelectedImg(null)}
            position="fixed"
            top={0}
            width="100%"
          >
            <Image key="image" src={selectedImg} alt="Selected Img" />
          </Flex>
        )}
      </AnimatePresence>
  )
}
