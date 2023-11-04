import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, useRef } from "react";
import styles from "../styles/Products.module.css";
import Productcard from "@/components/productcard/productcard";
import debounce from "lodash/debounce";

const url = "https://dummyjson.com";

export default function products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isLogin } = useAppContext();
  const router = useRouter();
  const selectedCategories = useRef({});
  const [limit, setLimit] = useState(0);
  useEffect(() => {
    if (isLogin === false) {
      router.push("/login");
    }
  }, [isLogin]);

  useEffect(() => {
    async function callApis() {
      const promises = [
        `${url}/products?limit=${limit}`,
        `${url}/products/categories`,
      ];
      let res = await Promise.all(
        promises.map((promise) => fetch(promise).then((res) => res.json()))
      );
      setProducts(res[0].products);
      setCategories(res[1]);
    }
    callApis();
  }, [limit]);

  const searchProducts = useCallback(
    debounce((e) => {
      fetch(`https://dummyjson.com/products/search?q=${e.target.value}`)
        .then((res) => res.json())
        .then((res) => {
          setProducts(res.products);
        });
    }, 2000),
    []
  );

  const fetchCategory = (category) => {
    if (selectedCategories.current[category]) {
      return;
    }
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((res) => {
        selectedCategories.current = {};
        selectedCategories.current[category] = category;
        setProducts(res.products);
      });
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="search products"
        onChange={searchProducts}
      />
      <input
        type="number"
        placeholder="setLimit"
        onChange={(e) => setLimit(e.target.value)}
      />
      <div className={styles.categories}>
        {categories.map((category) => {
          return (
            <div
              className={
                selectedCategories.current[category]
                  ? styles.selected
                  : styles.category
              }
              onClick={() => fetchCategory(category)}
            >
              {category}
            </div>
          );
        })}
      </div>
      <div className={styles.products}>
        {products.map((prd) => (
          <Productcard {...prd} />
        ))}
      </div>
    </div>
  );
}
