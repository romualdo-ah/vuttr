import React, { useEffect, useRef, useState } from "react";
import buttons_styles from "../styles/Buttons.module.css";
import styles from "../styles/Home.module.css";

import SearchBox from "./SearchBox";
import Image from "next/Image";

export default function TopBarInput({
  showModal,
  search,
  state,
  toggleSearchByTag,
}) {
  const CheckboxInputRef = useRef(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    // find current scroll position
    const currentScrollPos = window.pageYOffset;
    const deltaScroll = prevScrollPos - currentScrollPos;

    // console.log(deltaScroll);
    // setVisible(deltaScroll > 0);

    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    CheckboxInputRef.current.checked = state.searchingByTag;

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.searchingByTag, prevScrollPos, handleScroll]);

  return (
    <div

      className={
        // [
        styles.top_bar
        //   , visible ? styles.top_bar__sticky : ""].join(
        //   " "
        // )
      }
    >
      <div className={styles.search_controller}>
        <SearchBox {...{ state, search }} />
        <span>
          <input
            type="checkbox"
            name="tag_only"
            id="tag_only"
            defaultValue={state.searchingByTag}
            ref={CheckboxInputRef}
            onClick={() => {
              toggleSearchByTag(CheckboxInputRef.current.checked);
            }}
          />
          <label htmlFor="tag_only">search on tag only</label>
        </span>
      </div>
      <div>
        <button
          className={buttons_styles.add}
          type="button"
          onClick={() => showModal(true, null, true)}
          value="add"
        >
          <Image
            src="/White_Close_2px.svg"
            loading="eager"
            width={18}
            height={18}
            className={styles.plus_icon}
          />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}