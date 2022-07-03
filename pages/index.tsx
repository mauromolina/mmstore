import { FC } from "react";
import { GetStaticProps } from "next";

import api from "../product/api";
import { Product } from "../interfaces";

import { StoreScreen } from "../product/screens";

interface HomePageProps {
  products: Product[];
}

const HomePage: FC<HomePageProps> = ({ products }) => {
  return <StoreScreen products={products} />;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};

export default HomePage;
