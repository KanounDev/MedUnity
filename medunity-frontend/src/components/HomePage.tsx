"use client";
import styles from "./HomePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

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
            <div className={styles.newsCard}>
              <Image
                src="/doctor.jpeg"
                alt="Resident Doctor"
                width={280}
                height={200}
                className={styles.newsImage}
              />
              <p><strong>November 2025: Change of resident doctor</strong></p>
              <p>
                Every six months, our institute welcomes a new resident doctor from
                the University Hospital. Welcome, Agathe...
              </p>
              <button onClick={() => router.push("/news")} className={styles.readMore}>
                Read more
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}