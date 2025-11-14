# MedUnity - Application Web Médicale
Application web de présentation et gestion d'un cabinet médical permettant aux patients de consulter leurs examens médicaux, 
aux médecins de gérer les dossiers patients, et à l'administrateur de superviser l'ensemble du système.


# Description du Projet
MedUnity combine une présentation institutionnelle du cabinet (accueil, services, contact) avec une interface applicative sécurisée 
pour la gestion des dossiers médicaux et la communication entre médecins et patients.

# Objectifs Principaux
  Informer : présenter le cabinet, son équipe et ses spécialités
  Digitaliser : offrir aux patients un espace personnel pour consulter leurs résultats et rendez-vous
  Collaborer : permettre aux médecins de partager les comptes rendus et analyses
  Sécuriser : garantir la confidentialité des données médicales
  Moderniser : proposer une interface simple et accessible sur tous les appareils

# Public Cible
 Patients : Accéder à leurs résultats, prendre contact, comprendre les services
 Médecins : Gérer les dossiers médicaux, échanger des informations, accéder aux rapports
 Personnel administratif : Gérer les rendez-vous, dossiers et actualités du site
 Visiteurs : Découvrir le cabinet, ses médecins, ses prestations

# Fonctionnalités
  Côté Public
  Page d'accueil avec présentation générale et actualités récentes
  Page "À propos" avec historique, équipe médicale et galerie photo
  Page des services avec liste des spécialités et tarifs
  Page de contact avec formulaire 
  Q/R avec informations médicales et conseils de santé

  Côté Patient
  Authentification personnelle sécurisée
  Accès à l'historique des consultations
  Consultation des examens médicaux (état : traité / en cours)
  Téléchargement des résultats médicaux
  
  Côté Médecin
  Authentification sécurisée
  Consultation et mise à jour des dossiers patients
  Ajout et modification d'examens médicaux
  Téléversement et partage de rapports médicaux
  Espace collaboratif avec d'autres médecins

 Côté Administrateur
  Gestion de la liste des docteurs (ajout, suppression, mise à jour)
  Gestion des activités médicales
  Gestion des actualités publiées sur la plateforme
  Supervision complète du système

# Stack Technique
  Frontend : Next.js 
  Backend : Nest.js
  Base de données : MongoDB
  Architecture : API REST
  Notifications : React Hot Toast
  Styling : CSS simple

 # Installation et Démarrage
  Frontend (Next.js)
  Création du projet
   npx create-next-app@latest medunity-admin --typescript
  Accéder au dossier du projet
   cd medunity-frontend
  Installation des dépendances
   npm i @heroicons/react lucide-react @headlessui/react @tanstack/react-query react-hot-toast
  Démarrer le serveur de développement
   npm run dev

  Backend (Nest.js)
   Accéder au dossier backend
    cd medunity-backend
   Installation des dépendances
    npm install
   Démarrer le serveur
    npm run start:dev
   
# Sécurité
 Gestion des rôles : Patient / Médecin / Administrateur
 Accès restreint selon le profil utilisateur
 Protection des données médicales sensibles
 API sécurisée avec authentification JWT


# Réalisé par :
Mohamed Kanoun
Morsi Feki
Mariem Ben Attia




