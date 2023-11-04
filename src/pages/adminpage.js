import React, { useState } from "react";
import styles from "../styles/adminpage.module.css";

export default function Admin() {
  const [currentTab, setCurrentTab] = useState(1);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const addProduct = () => {
    if (title.length === 0) {
      return;
    }
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        /* other product data */
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const updateProduct = () => {
    if (title.length === 0 || id.length === 0) {
      return;
    }
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };
  const deleteProduct = () => {
    if (id.length === 0) {
      return;
    }
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const onClickHandler = () => {
    if (currentTab === 1) {
      addProduct();
    } else if (currentTab === 2) {
      updateProduct();
    } else {
      deleteProduct();
    }
    setId("");
    setTitle("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {" "}
        <button
          onClick={() => setCurrentTab(1)}
          className={currentTab === 1 ? styles.selected_tab : styles.tab}
        >
          Add Product
        </button>
        <button
          onClick={() => setCurrentTab(2)}
          className={currentTab === 2 ? styles.selected_tab : styles.tab}
        >
          Update a Product
        </button>
        <button
          onClick={() => setCurrentTab(3)}
          className={currentTab === 3 ? styles.selected_tab : styles.tab}
        >
          Delete a Product
        </button>
      </div>

      <section className={styles.data}>
        {currentTab !== 1 ? (
          <input
            type="text"
            placeholder="id"
            className={styles.inputs}
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
        ) : null}
        {currentTab !== 3 ? (
          <input
            type="text"
            placeholder="title"
            className={styles.inputs}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        ) : null}
        <button className={styles.submit} onClick={onClickHandler}>
          {currentTab === 1 ? "Add" : currentTab === 2 ? "Update" : "Delete"}
        </button>
      </section>
    </div>
  );
}
