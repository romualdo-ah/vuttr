import React, { useEffect } from "react";
// import styles from "./styles";
import styles from "../styles/Home.module.css";
import buttons_styles from "../styles/Buttons.module.css";
import Image from "next/Image";
import { motion, AnimatePresence } from "framer-motion";
import { cardVariant } from "../animations/AnimationVariants";

export default function Card({
  tool,
  state,
  search,
  showModal,
  toggleSearchByTag,
}) {
  const imageStyles = {
    width: "18px",
    height: "18px",
    minWidth: "initial",
    maxWidth: "initial",
    minHeight: "initial",
    maxHeight: "initial",
  };

  useEffect(() => {}, [state.searchingByTag, state.searchTerm, tool.tags]);
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={cardVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        key={tool.id}
        className={styles.card}
      >
        <div className={styles.card_header}>
          <a
            className={styles.toolLink}
            href={tool.link}
            title={tool.link}
            target="_blank"
          >
            {tool.title}
          </a>

          <span
            className={[buttons_styles.remove, styles.remove].join(" ")}
            onClick={() => showModal(false, tool.id, true)}
          >
            <div style={imageStyles}>
              <Image
                src="/Red_Close_2px.svg"
                width={18}
                height={18}
                alt="close button"
              />
            </div>{" "}
            Remove
          </span>
        </div>
        <p className={styles.description}>{tool.description}</p>
        <div className={styles.tags_container}>
          {tool.tags.map((tag) => {
            return (
              <span
                key={tag}
                className={[
                  tag === state.searchTerm &&
                    state.searchingByTag &&
                    styles.tag_highlighted,
                  styles.tag,
                ].join(" ")}
                onClick={() => {
                  search(tag), toggleSearchByTag(true);
                }}
              >
                #{tag}
              </span>
            );
          })}
          <style jsx>{`
            img {
              width: 18px;
              height: 18px;
            }
          `}</style>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
