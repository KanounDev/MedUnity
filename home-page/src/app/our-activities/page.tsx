import HeroBanner from "@/components/HeroBanner";
import ActivitySection from "@/components/ActivitySection";
import styles from "./OurActivities.module.css";

export default function Activities() {
  return (
    <main className={styles.activities}>
      <HeroBanner title="OUR ACTIVITIES" />

      <section className={styles.content}>
        <h2>UN INSTITUT DE PATHOLOGIE À VOTRE SERVICE …</h2>
        <div className={styles.divider}></div>

        <ActivitySection
          imageSrc="/im1.png"
          imageAlt="Carte Paris-Lille"
          title="… Entre Paris et Lille"
          paragraphs={[
            "L’Institut de Pathologie des Hauts-de-France prend en charge des actes d’histologie et de cytologie et dispose d’une technique innovante de biologie moléculaire pour le génotypage des virus HPV dans le cadre du dépistage du cancer du col de l’utérus.",
            "L’Institut de Pathologie a une activité étendue à toute la région des Hauts-de-France ainsi qu’à Paris, la région parisienne, la Normandie, le Cotentin et la Bretagne, au sein d’établissements privés et hospitaliers et auprès de nombreux praticiens libéraux.",
          ]}
        />

        <ActivitySection
          imageSrc="/im4.png"
          imageAlt="Immunohistochimie"
          title="IMMUNOHISTOCHIMIE … Anticorps recherche antigène"
          paragraphs={[
            "L’immunohistochimie consiste à évaluer la réactivité des cellules à des anticorps dans le but de mieux caractériser les tumeurs pour mettre en place le traitement le plus adapté.",
            "Nous disposons d’un très large panel d’anticorps que nous évaluons régulièrement en fonction des données scientifiques publiées pour nous permettre une caractérisation très précise des tumeurs et des traitements auxquels elles seront sensibles.",
          ]}
          reverse
        />

        <ActivitySection
          imageSrc="/im2.png"
          imageAlt="Résultats rapides"
          title="… Pour permettre des résultats rapides et contrôlés"
          paragraphs={[
            "Les résultats des examens sont le plus souvent disponibles 24h à 48h après leur réception. Un exemplaire est transmis au médecin qui a réalisé le prélèvement et le plus souvent au médecin traitant. Le patient peut également recevoir un exemplaire.",
            "Les pathologistes de l’Institut de Pathologie des Hauts-de-France participent aux réunions de concertations pluri-disciplinaires (RCP). En cas de difficulté diagnostique, d’étroites relations avec des pathologistes experts français permettent de bénéficier de leur expérience.",
            "Dans le cadre de la médecine personnalisée, l’Institut de Pathologie des Hauts-de-France collabore avec les services de biologie moléculaire des CHU d’Amiens et de Lille.",
          ]}
        />

        <ActivitySection
          imageSrc="/im3.png"
          imageAlt="Histologie"
          title="HISTOLOGIE … Voir en grand l’infiniment petit"
          paragraphs={[
            "L’histologie est l’analyse des tissus, successivement à l’œil nu puis au microscope. Elle est pratiquée à partir de :",
          ]}
          listItems={[
            "Biopsies (sein, prostate, estomac, côlon, peau, …)",
            "Petites exérèses (polypes, lésions cutanées, …)",
            "Pièces opératoires correspondant à l’exérèse partielle ou complète d’un ou plusieurs organes (sein, vessie, prostate, côlon, …)",
          ]}
          reverse
        />

        <ActivitySection
          imageSrc="/im5.png"
          imageAlt="Biologie moléculaire"
          title="BIOLOGIE MOLECULAIRE … Ou la Médecine Personnalisée"
          paragraphs={[
            "La biologie moléculaire consiste à caractériser la molécule responsable de l’état pathologique. Elle est réalisée à partir des prélèvements confiés aux pathologistes.",
            "L’ensemble de ces recherches est actuellement pratiqué au sein de plateformes de génétique moléculaire mises en place par l’Institut National du Cancer (INCa). Nous collaborons avec les plateformes régionales (Amiens et Lille) pour réduire les délais de prise en charge thérapeutique des patients.",
          ]}
        />
      </section>
    </main>
  );
}
