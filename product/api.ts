import axios from "axios";
import { Product } from "../interfaces";
import Papa from "papaparse";
import { APP_INFO } from '../app/constants';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        APP_INFO.sheet,
        {
          responseType: "blob",
        }
      )
      .then(
        (response) =>
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const products = results.data as Product[]
                return resolve(products.map(prod => ({
                    ...prod,
                    price: Number(prod.price)
                })))
              },
              error: (error) => reject(error.message),
            });
          })
      );
  },
};
