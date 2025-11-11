import React from "react";
import styles from "./ActivitySection.module.css";

interface ActivitySectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
  reverse?: boolean;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({
  imageSrc,
  imageAlt,
  title,
  paragraphs,
  listItems,
  reverse = false,
}) => {
  return (
    <div className={`${styles.section} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className={styles.textContainer}>
        <h3>{title}</h3>
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
        {listItems && (
          <ul>
            {listItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
