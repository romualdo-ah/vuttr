import React from "react";
import styles from "../styles/Home.module.css";
import {motion} from "framer-motion";
import {headerVariant} from "../animations/AnimationVariants";

function Hero() {
  return (
    <motion.div
    variants={headerVariant}
    initial="initial"
    animate="animate"

    className={styles.hero}>
      <h1 className={styles.Hero_title}>VUTTR</h1>

      <h2 className={styles.Hero_description}>Very useful Tools to Remember</h2>
    </motion.div>
  );
}

export default Hero;
