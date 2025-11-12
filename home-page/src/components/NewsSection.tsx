"use client";
import HeroBanner from "./HeroBanner";
import styles from "./NewsSection.module.css";
import Image from "next/image";

export default function NewsSection() {
return (
    <>
    <section>
        <HeroBanner title="OUR NEWS" />
    </section>
    <section className={styles.container}>
    {/* News 1 */}
    <div className={styles.newsCard}>
        <div className={styles.imageWrapper}>
        <Image
            src="/doctor.jpeg"
            alt="Doctor"
            width={200}
            height={200}
            className={styles.image}
        />
        </div>
        <div className={styles.text}>
        <p>
            The Institute of Pathology MedUnify is accredited to host and train
            medical residents.
        </p>
        <p>
            Welcome to Agathe, a resident from the Amiens University Hospital,
            who is joining our team for 6 months with the desire to deepen her
            knowledge in Thoracic and Urological Pathology.
        </p>
        </div>
    </div>

    <hr className={styles.divider} />

    {/* News 2 */}
    <div className={styles.newsCard}>
        <div className={styles.imageWrapper}>
        <Image
            src="/meetup.jpeg"
            alt="Meet-up event"
            width={300}
            height={200}
            className={styles.image}
        />
        </div>
        <div className={styles.text}>
        <p>
            On September 16, 2025, starting at 6 PM, the September Meet-up #1
            will take place at i-Path. This monthly gathering is an opportunity
            to discuss innovation, create synergies, and imagine the projects of
            tomorrow.
        </p>
        <p>
            These Meet-ups are regular events bringing together innovation
            stakeholders from the region. The meeting will be a chance to
            introduce each other’s centers of expertise, challenges, and
            ambitions, to brainstorm collaborative projects, and to find
            complementary skills and more.
        </p>
        </div>
    </div>

    <hr className={styles.divider} />

    {/* News 3 */}
    <div className={styles.newsCard}>
        <div className={styles.imageWrapper}>
        <Image
            src="/fair.jpeg"
            alt="Picardie Fair"
            width={300}
            height={250}
            className={styles.image}
        />
        </div>
        <div className={styles.text}>
        <p>
            i-Path est présent pour sa 84ème édition de la foire exposition de
            Picardie qui se tient à Amiens du 6 au 15 juin 2025!
        </p>
        <p>
            Retrouvons-nous à la Foire dans le village de l’innovation qui met
            en lumière de acteurs et dispositifs innovants du territoire. Venez
            nous rendre visite et scannez le QR Code!
        </p>
        </div>
    </div>
    </section>
    </>
);
}
