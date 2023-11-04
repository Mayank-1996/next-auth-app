import { getLocalStorage } from "@/helpers/localStorage";
import React, { useEffect } from "react";

export default function Resource() {
  useEffect(() => {
    fetch("https://dummyjson.com/auth/RESOURCE", {
      method: "GET" /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${getLocalStorage("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return <div>resource</div>;
}
