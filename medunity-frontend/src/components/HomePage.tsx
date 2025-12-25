"use client";
import styles from "./HomePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { News } from '@/types';

const API_URL = 'http://localhost:3002';

export default function HomePage() {
  const router = useRouter();
  const [latestNews, setLatestNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await fetch(`${API_URL}/news`);
        if (res.ok) {
          const data: News[] = await res.json();
          if (data.length > 0) {
            // Sort by createdAt DESC and take the first (most recent)
            const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setLatestNews(sorted[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const getSummary = (news: News) => {
    if (news.paragraphs && news.paragraphs.length > 0) {
      return news.paragraphs[0]; // Use first paragraph as summary
    }
    return news.content.substring(0, 100) + '...'; // Truncate content if no paragraphs
  };

  return (


    <div className={styles.container}>
      <main className={styles.main}>
        {/* Left Column */}
        <div className={styles.sidebar}>
          <h3 className={styles.titleh}>Localisation</h3>
          <section className={styles.card}>
            <Image
              src="/map.png"
              alt="Map"
              width={300}
              height={220}
              className={styles.map}
            />
            <button className={styles.button}>Itinerary</button>
          </section>

          <h3 className={styles.titleh}>Working Hours</h3>
          <section className={styles.card}>
            <p><strong>From Monday to Friday:</strong><br />8:00 to 17:00</p>
            <p><strong>Saturday:</strong><br />8:00 to 13:00</p>
          </section>
        </div>

        {/* Center Column */}
        <div className={styles.center}>
          <div className={styles.banner}>
            <div className={styles.bannerText}>
              <h2>Welcome...</h2>
              <h3>Institut of Pathology <br /><span>MedUnity</span></h3>
            </div>
          </div>

          <div className={styles.spaces}>
            <div className={styles.spaceCard}>
              <Image src="/patient.png" alt="Patient" width={50} height={65} />
              <p>Patient Space</p>
              <button onClick={() => router.push("/PatientAuthentification")} className={styles.smallBtn}>
                View Result
              </button>
            </div>
            <div className={styles.spaceCard}>
              <Image src="/doctor.png" alt="Doctor" width={65} height={65} />
              <p>Doctor Space</p>
              <button onClick={() => router.push("/DoctorAuthentification")} className={styles.smallBtn}>
                View Result
              </button>
            </div>
          </div>
        </div>


        {/* Right Column */}
        <aside>
          <h3 className={styles.titleh}>News</h3>
          <div className={styles.news}>
            {loading ? (
              <p>Loading latest news...</p>
            ) : latestNews ? (
              <div className={styles.newsCard}>
                <Image
                  src={latestNews.image || "/doctor.jpeg"}
                  alt={latestNews.title}
                  width={280}
                  height={200}
                  className={styles.newsImage}
                />
                <p><strong>{latestNews.date}: {latestNews.title}</strong></p>
                <p>{getSummary(latestNews)}</p>
                <button onClick={() => router.push("/news")} className={styles.readMore}>
                  Read more
                </button>
              </div>
            ) : (
              <p>No news available.</p>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}