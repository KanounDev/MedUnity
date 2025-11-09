import styles from "./Sidebar.module.css";

type SidebarProps = {
  patients: { id: number; name: string }[];
  onSelect: (id: number) => void;
};

export default function Sidebar({ patients, onSelect }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <h2>List of patients</h2>
      <ul>
        {patients.map((p) => (
          <li
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={styles["patient-item"]}
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
