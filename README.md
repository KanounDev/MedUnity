MedUnity – Plateforme Médicale en Ligne

MedUnity est une application web permettant aux patients de consulter l’état de leurs examens médicaux (traité / en cours), aux docteurs de gérer les examens, et à l’administrateur de gérer les ressources du système.
Le projet utilise Next.js, Nest.js, MongoDB et du CSS simple.

##Fonctionnalités

#Côté Patient
Consulter ses examens médicaux
Vérifier si un examen est traité
Interface simple et intuitive

#Côté Docteur
Ajouter un nouvel examen pour un patient
Modifier / mettre à jour l’état d’un examen
Gestion des dossiers patients
Côté Administrateur
Gérer la liste des docteurs (ajout, suppression, mise à jour)
Gérer la liste des activités médicales
Gérer la liste des actualités (news) publiées dans la plateforme

##Fonctionnalités techniques

#Frontend : Next.js + React
#Backend : Nest.js
#Base de données : MongoDB
#Architecture : API REST
#Gestion data : TanStack React Query
#Notifications : React Hot Toast

##Steps To Create & Run the Next.js App
1. Create a new Next.js project with TypeScript
npx create-next-app@latest medunity-admin --typescript

2. Move into project folder
cd medunity-admin

3. Install extra dependencies
npm i @heroicons/react lucide-react @headlessui/react @tanstack/react-query

4. (Optional but recommended) Install a toast library
npm i react-hot-toast

5. Run the server
npm run dev

##Backend Setup (Nest.js)
1. Move into backend folder
cd medunity-backend

2. Install dependencies
npm install

3. Create .env file
MONGODB_URI=mongodb://localhost:27017/medunity
PORT=3000
JWT_SECRET=your_secret_here

4. Run the server
npm run start:dev

##Sécurité
Gestion des rôles : Patient / Docteur / Admin
Accès restreint selon le profil
Données médicales protégées

#Auteur
Ben Attia Mariem
Feki Morsi
Kanoun Mohamed
