import React from "react";
import style from "./Loader.module.css";

export const Loader = () => {
  return (
    <section className={style.loader}>
      <div className={style.slider} style={{ '--i': 0 }}></div>
      <div className={style.slider} style={{ '--i': 1 }}></div>
      <div className={style.slider} style={{ '--i': 2 }}></div>
      <div className={style.slider} style={{ '--i': 3 }}></div>
      <div className={style.slider} style={{ '--i': 4 }}></div>
    </section>
  );
};
