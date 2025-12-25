// components/ActivitiesSection.tsx
"use client";
import { useState, useEffect } from 'react';
import styles from "./ActivitiesSection.module.css";
import Image from "next/image";
import { Activity } from '@/types';

const API_URL = "http://localhost:3002"; // Your NestJS backend

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${API_URL}/activities`);
        if (!res.ok) throw new Error("Unable to load activities");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        setError("Error loading activities");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <section className={styles.container}>
        <p className="text-center py-20 text-gray-600">Loading activities...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.container}>
        <p className="text-center py-20 text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>A MODERN MEDICAL CLINIC AT YOUR SERVICE...</h1>
      <p className={styles.subtitle}>
        Discover our expertise in cardiology, pediatrics, neurology, radiology, general medicine, and advanced diagnostic services
      </p>

      {activities.length === 0 ? (
        <p className="text-center py-16 text-gray-500">
          No activities have been added yet.
        </p>
      ) : (
        activities.map((activity, index) => (
          <div key={activity.id}>
            <div className={styles.activityCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={activity.image?.trim() || '/placeholder-activity.jpg'}
                  alt={activity.title}
                  width={500}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.text}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
            </div>
            {index < activities.length - 1 && <hr className={styles.divider} />}
          </div>
        ))
      )}
    </section>
  );
}