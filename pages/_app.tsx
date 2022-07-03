import { FC } from "react";
import { AppProps } from "../node_modules/next/app";
import {
  ChakraProvider,
  Container,
  Image,
  Heading,
  VStack,
  Text,
  Box,
  Divider,
  Link,
} from "@chakra-ui/react";
import theme from "../theme";
import Head from "next/head";
import { APP_INFO } from "../app/constants";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Mi tienda online - MM</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <meta content="mauromolina" name="author" />
        <meta content="Mauro Molina" name="copyright" />
      </Head>
      <ChakraProvider theme={theme}>
        <Box padding={4}>
          <Container
            backgroundColor="white"
            borderRadius="sm"
            boxShadow="md"
            maxWidth="container.xl"
            padding={4}
          >
            <VStack marginBottom={4}>
              <Image
                borderRadius={999}
                src={APP_INFO.avatar}
                alt="Page Logo"
              />
              <Heading>{APP_INFO.title}</Heading>
              <Text>{APP_INFO.description}</Text>
            </VStack>
            <Divider marginY={4} />
            <Component {...pageProps} />
            <Divider marginY={4} />
            <Text textAlign="center">
              © Copyright {new Date().getFullYear()}. Desarrollado por{" "}
              <Link isExternal href="https://www.linkedin.com/in/mauro-molina/">
                Mauro Molina
              </Link>
            </Text>
          </Container>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
