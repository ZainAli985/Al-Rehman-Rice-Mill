import React, { useEffect, useState } from "react";
import styles from "./StatusBadge.module.css";

const StatusBadge = ({ initialMessage = "Under Progress" }) => {
  const [message, setMessage] = useState(initialMessage);
  const [visible, setVisible] = useState(true);

  // Optional: blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v);
    }, 700); // blink speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.badge} ${visible ? styles.visible : styles.hidden}`}>
        {message}
      </div>
    </div>
  );
};

export default StatusBadge;
