import React from "react";
import styles from "../styles/Home.module.css";
import Card from "./Card";
 
export default function CardList(props) {
  const {data}=props; 

  return (
    <div className={styles.CardList}>
      {(data).map((tool) => (
        <Card key={tool.id} {...{ tool }} />
      ))}
    </div>
  );
}

