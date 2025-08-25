import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()} Podkasti</p>
        
      </div>
    </footer>
  );
};

export default Footer;
