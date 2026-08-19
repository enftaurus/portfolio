import React from "react";
import styles from "./WarpDivider.module.css";

export const WarpDivider: React.FC = () => {
  return (
    <div className={styles.warpDivider}>
      <div className={styles.warpInner} />
    </div>
  );
};
