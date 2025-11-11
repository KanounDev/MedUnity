import React from "react";
import styles from "./HeroBanner.module.css";

interface HeroBannerProps {
  title: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title }) => {
  return (
    <section className={styles.hero}>
      <h1>{title}</h1>
    </section>
  );
};

export default HeroBanner;
