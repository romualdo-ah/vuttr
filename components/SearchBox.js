import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/Image";

export default function SearchBox({ state, search }) {

  const [searchBoxInputValue,setSearchBoxInputValue] = useState(state.searchTerm);
  useEffect(() => {
    setSearchBoxInputValue(state.searchTerm);
  }, [state.searchTerm]);
  return (
    <label htmlFor="search" className={styles.search_box}>
      <Image
        src="/Icon-Search-2px.svg"
        height={18}
        width={18}
        alt="Search Icon"
        className={styles.search_icon}
      />

      <input
        type="text"
        className={styles.input} 
        value={searchBoxInputValue}
        name="search"
        placeholder="search"
        autoComplete="off"
        id="search"
        onChange={(e) => search(e.target.value)}
      />
    </label>
  );
}
