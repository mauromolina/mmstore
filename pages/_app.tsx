import { FC } from "react";
import { AppProps } from "../node_modules/next/app";
import {
  ChakraProvider,
  Container,
  Image,
  Heading,
  Text,
  Box,
  Divider,
  Link,
  Stack,
  Flex,
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
        <Container
          backgroundColor="white"
          borderRadius="sm"
          maxWidth="container.xl"
          padding={4}
        >
          <Stack spacing={8}>
            <Stack marginBottom={4} spacing={0}>
              <Image
                borderRadius="lg"
                height="100%"
                maxHeight={64}
                src={APP_INFO.banner}
                alt="Page Logo"
              />
              <Stack
                direction={{ base: "column", sm: "row" }}
                alignItems="center"
                spacing={{ base: 3, sm: 6 }}
              >
                <Box
                  padding={1}
                  backgroundColor="white"
                  marginTop={{base: -12, sm: -16}}
                  borderRadius={9999}
                  minWidth={{ base: 24, sm: 32 }}
                >
                  <Image
                    borderRadius={999}
                    width={{ base: 24, sm: 32 }}
                    height={{ base: 24, sm: 32 }}
                    borderWidth={4}
                    src={APP_INFO.avatar}
                    alt="Page Logo"
                  />
                </Box>
                <Stack
                  spacing={3}
                  textAlign={{ base: "center", sm: "left" }}
                  alignItems={{ base: "center", sm: "flex-start" }}
                >
                  <Heading>{APP_INFO.title}</Heading>
                  <Text color="gray.500" fontWeight="500" fontSize="lg">
                    {APP_INFO.description}
                  </Text>
                  <Stack direction="row">
                    {APP_INFO.social.map(
                      (social) => (
                        <Link key={social.name} isExternal href={social.url}>
                          <Flex
                          alignItems="center"
                          justifyContent="center"
                          width={10}
                          height={10}
                          borderRadius={9999}
                          backgroundColor="primary.500"
                          color="white"
                        >
                          <Image
                            src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                            alt={`${social}`}
                          />
                        </Flex>
                        </Link>
                      )
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Component {...pageProps} />
          </Stack>
          <Divider marginY={4} />
          <Text textAlign="center">
            © Copyright {new Date().getFullYear()}. Desarrollado por{" "}
            <Link isExternal href="https://www.linkedin.com/in/mauro-molina/">
              Mauro Molina
            </Link>
          </Text>
        </Container>
      </ChakraProvider>
    </>
  );
};

export default App;
