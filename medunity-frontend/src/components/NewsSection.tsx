"use client";
import styles from "./NewsSection.module.css";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { News } from '@/types';

const API_URL = "http://localhost:3002"; // Your NestJS backend

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_URL}/news`);
        if (!res.ok) throw new Error("Unable to load news");
        const data = await res.json();
        
        // Handle paragraphs to content mapping
        const mappedNews = data.map((n: any) => ({
          ...n,
          content: n.paragraphs ? n.paragraphs.join('\n\n') : n.content || ''
        }));
        
        setNewsItems(mappedNews);
      } catch (err) {
        setError("Error loading news");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className={styles.container}>
        <p className="text-center py-20 text-gray-600">Loading news...</p>
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
      {newsItems.length === 0 ? (
        <p className="text-center py-16 text-gray-500">
          No news have been added yet.
        </p>
      ) : (
        newsItems.map((news, index) => {
          const paragraphs = news.content.split(/\r?\n\s*\r?\n/);
          return (
            <div key={news.id}>
              <div className={styles.newsCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={news.image?.trim() || '/placeholder-news.jpg'}
                    alt={news.title}
                    width={300}
                    height={200}
                    className={styles.image}
                  />
                </div>
                <div className={styles.text}>
                  <h3>{news.title}</h3>
                  <span className={styles.date}>{news.date}</span>
                  {paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              {index < newsItems.length - 1 && <hr className={styles.divider} />}
            </div>
          );
        })
      )}
    </section>
  );
}