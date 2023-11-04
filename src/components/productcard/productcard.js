import React from "react";
import styles from "./productcard.module.css";

export default function Productcard({ title, description, rating, price }) {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{price}</p>
      <p>{rating}</p>
    </div>
  );
}
