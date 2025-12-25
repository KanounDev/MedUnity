#  MedUnity - Application Web Médicale

Application web de présentation et gestion d'un cabinet médical.

Elle permet :
* Aux **patients** de consulter leurs examens médicaux.
* Aux **médecins** de gérer les dossiers patients.
* À l'**administrateur** de superviser l'ensemble du système.

---

##  Description du Projet

MedUnity combine une **présentation institutionnelle** du cabinet (accueil, services, contact) avec une **interface applicative sécurisée** pour la gestion des dossiers médicaux et la communication entre médecins et patients.

---

##  Objectifs Principaux

* **Informer** : Présenter le cabinet, son équipe et ses spécialités.
* **Digitaliser** : Offrir aux patients un espace personnel pour consulter leurs résultats et rendez-vous.
* **Collaborer** : Permettre aux médecins de partager les comptes rendus et analyses.
* **Sécuriser** : Garantir la confidentialité des données médicales.
* **Moderniser** : Proposer une interface simple et accessible sur tous les appareils.

---

##  Public Cible

| Utilisateur | Description des Accès / Besoins |
| :--- | :--- |
| **Patients** | Accéder à leurs résultats, prendre contact, comprendre les services. |
| **Médecins** | Gérer les dossiers médicaux, échanger des informations, accéder aux rapports. |
| **Personnel administratif** | Gérer les rendez-vous, dossiers et actualités du site. |
| **Visiteurs** | Découvrir le cabinet, ses médecins, ses prestations. |

---

##  Fonctionnalités

### Côté Public
* Page d'accueil avec présentation générale et actualités récentes.
* Page "**À propos**" avec historique, équipe médicale et galerie photo.
* Page des **services** avec liste des spécialités et tarifs.
* Page de **contact** avec formulaire.
* **Q/R** avec informations médicales et conseils de santé.

### Côté Patient
* **Authentification** personnelle sécurisée.
* Accès à l'historique des consultations.
* Consultation des **examens médicaux** (état : traité / en cours).
* **Téléchargement** des résultats médicaux.

### Côté Médecin
* **Authentification** sécurisée.
* Consultation et mise à jour des **dossiers patients**.
* Ajout et modification d'examens médicaux.
* Téléversement et partage de **rapports médicaux**.
* **Espace collaboratif** avec d'autres médecins.

### Côté Administrateur
* **Gestion** de la liste des docteurs (ajout, suppression, mise à jour).
* Gestion des activités médicales.
* Gestion des actualités publiées sur la plateforme.
* **Supervision complète** du système.

---

##  Stack Technique

| Domaine | Technologie | Note / Rôle |
| :--- | :--- | :--- |
| **Frontend** | Next.js | Application côté client |
| **Backend** | Nest.js | API et logique métier |
| **Base de données** | PostgreSQL | Stockage des données |
| **Architecture** | API REST | Communication client/serveur |
| **Notifications** | React Hot Toast | Affichage des messages d'alerte |
| **Styling** | CSS simple | Styles de l'interface |

---

##  Installation et Démarrage

### 1. Frontend (Next.js)

1.  **Cloner le dépôt**
    ```bash
    git clone https://github.com/KanounDev/MedUnity.git
    ```
2.  **Accéder au dossier du projet**
    ```bash
    cd MedUnity/medunity-frontend
    ```
3.  **Ajoutez le fichier .env.local sous MedUnity/medunity-frontend pour l'accès au serveur**
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:3002
    ```
4.  **Installation des dépendances**
    ```bash
    npm install
    ```
5.  **Démarrer le serveur de développement**
    ```bash
    npm run dev
    ```

### 2. Backend (Nest.js)

1.  **Accéder au dossier backend**
    ```bash
    cd MedUnity/medunity-backend
    ```
2.  **Installation des dépendances**
    ```bash
    npm install
    ```
3.  **Démarrer le serveur**
    ```bash
    npm run start:dev
    ```
    
### 3. Base de données PostgreSQL
#### Création de la base de données

Ouvrir PostgreSQL (psql ou pgAdmin) et créer la base de données :

```sql
CREATE DATABASE medunity;
```
#### Vérifier que la base existe et est accessible
#### Configuration de l’accès à la base de données
#### Créer un fichier .env dans medunity-backend :
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=admin
DB_DATABASE=medunity
GEMINI_API_KEY=AIzaSyCSmDvm-FQ98ltlnCEBzXbWobnzB5wB3Ho
```
#### Assurez-vous que ces valeurs correspondent à votre installation PostgreSQL locale.

#### Exécuter les migrations de la base de données
```bash
npm run migration:run
```
#### Import CSV into a table

Once your table exists:

Right-click the table → Import/Export.

In the dialog:

Filename → select your CSV file.

Format → choose CSV.

Check Header if your CSV has column names.

Optional: adjust Delimiter (usually ,).

Click OK → pgAdmin will insert the rows.
---

##  Sécurité

* **Gestion des rôles** : Patient / Médecin / Administrateur.
* **Accès restreint** selon le profil utilisateur.
* **Protection** des données médicales sensibles.
* API sécurisée avec **authentification JWT**.

---

## 👨‍💻 Réalisé par :

* Mohamed Kanoun
* Morsi Feki
* Mariem Ben Attia
