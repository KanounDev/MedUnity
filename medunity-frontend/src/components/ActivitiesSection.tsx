// components/ActivitiesSection.tsx
import styles from "./ActivitiesSection.module.css";
import Image from "next/image";

export default function ActivitiesSection() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>UN INSTITUT DE PATHOLOGIE À VOTRE SERVICE …</h1>
      <p className={styles.subtitle}>
        Découvrez nos expertises en histologie, cytologie, immunohistochimie et biologie moléculaire
      </p>

      {/* Block 1 */}
      <div className={styles.activityCard}>
        <div className={styles.imageWrapper}>
          <Image src="/im1.png" alt="Carte Hauts-de-France" width={500} height={400} className={styles.image} />
        </div>
        <div className={styles.text}>
          <h3>… Entre Paris et Lille</h3>
          <p>
            L’Institut de Pathologie des Hauts-de-France prend en charge des actes d’histologie et de cytologie et dispose d’une technique innovante de biologie moléculaire pour le génotypage des virus HPV dans le cadre du dépistage du cancer du col de l’utérus.
          </p>
          <p>
            L’Institut de Pathologie a une activité étendue à toute la région des Hauts-de-France ainsi qu’à Paris, la région parisienne, la Normandie, le Cotentin et la Bretagne, au sein d’établissements privés et hospitaliers et auprès de nombreux praticiens libéraux.
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Block 2 */}
      <div className={styles.activityCard}>
        <div className={styles.imageWrapper}>
          <Image src="/im4.png" alt="Immunohistochimie" width={500} height={400} className={styles.image} />
        </div>
        <div className={styles.text}>
          <h3>IMMUNOHISTOCHIMIE … Anticorps recherche antigène</h3>
          <p>
            L’immunohistochimie consiste à évaluer la réactivité des cellules à des anticorps dans le but de mieux caractériser les tumeurs pour mettre en place le traitement le plus adapté.
          </p>
          <p>
            Nous disposons d’un très large panel d’anticorps que nous évaluons régulièrement en fonction des données scientifiques publiées pour nous permettre une caractérisation très précise des tumeurs et des traitements auxquels elles seront sensibles.
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Block 3 */}
      <div className={styles.activityCard}>
        <div className={styles.imageWrapper}>
          <Image src="/im2.png" alt="Résultats rapides" width={500} height={400} className={styles.image} />
        </div>
        <div className={styles.text}>
          <h3>… Pour permettre des résultats rapides et contrôlés</h3>
          <p>
            Les résultats des examens sont le plus souvent disponibles 24h à 48h après leur réception. Un exemplaire est transmis au médecin qui a réalisé le prélèvement et le plus souvent au médecin traitant. Le patient peut également recevoir un exemplaire.
          </p>
          <p>
            En cas de difficulté diagnostique, d’étroites relations avec des pathologistes experts français permettent de bénéficier de leur expérience. Dans le cadre de la médecine personnalisée, l’Institut collabore avec les CHU d’Amiens et de Lille.
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Block 4 */}
      <div className={styles.activityCard}>
        <div className={styles.imageWrapper}>
          <Image src="/im3.png" alt="Histologie" width={500} height={400} className={styles.image} />
        </div>
        <div className={styles.text}>
          <h3>HISTOLOGIE … Voir en grand l’infiniment petit</h3>
          <p>
            L’histologie est l’analyse des tissus, successivement à l’œil nu puis au microscope. Elle est pratiquée à partir de :
          </p>
          <ul>
            <li>Biopsies (sein, prostate, estomac, côlon, peau, …)</li>
            <li>Petites exérèses (polypes, lésions cutanées, …)</li>
            <li>Pièces opératoires correspondant à l’exérèse partielle ou complète d’un ou plusieurs organes</li>
          </ul>
          <p>
            Seul l’examen histologique par un médecin pathologiste permet d’affirmer un diagnostic de cancer.
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Block 5 */}
      <div className={styles.activityCard}>
        <div className={styles.imageWrapper}>
          <Image src="/im5.png" alt="Biologie moléculaire" width={500} height={400} className={styles.image} />
        </div>
        <div className={styles.text}>
          <h3>BIOLOGIE MOLECULAIRE … Ou la Médecine Personnalisée</h3>
          <p>
            La biologie moléculaire consiste à caractériser la molécule responsable de l’état pathologique. Elle est réalisée à partir des prélèvements confiés aux pathologistes.
          </p>
          <p>
            Nous collaborons avec les plateformes régionales (Amiens et Lille) pour réduire les délais de prise en charge thérapeutique des patients.
          </p>
        </div>
      </div>
    </section>
  );
}