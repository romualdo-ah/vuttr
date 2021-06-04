import React from "react";
import styles from "../styles/Home.module.css";
import Card from "./Card";
import useAppContext from "../contexts/AppContext";
import { initialFetcher, url } from "../hooks/fetchers";
import useSWR from "swr";

export default function CardList(props) {
  const {data}=props;
  //  const {tool_items_list} = useSWR(url, { initialData: data});

  return (
    <div className={styles.CardList}>
      {(data).map((tool) => (
        <Card key={tool.id} {...{ tool }} />
      ))}
    </div>
  );
}

