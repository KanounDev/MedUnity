import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/solid';
import HomePage from "@/components/HomePage";
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.hero}>
      <main>
        <HomePage />
      </main>
    </div>
  );
}
