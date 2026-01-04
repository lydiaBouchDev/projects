# Projet Master 2 - Application de Messagerie en Temps Réel (Type Discord)

**Durée : 7 heures**
**Technologies : Node.js + Angular ou React**

---

## 📋 Contexte du Projet

Vous êtes chargé(e) de développer une application de messagerie instantanée simplifiée inspirée de Discord. L'application doit permettre aux utilisateurs de communiquer en temps réel au sein de différents canaux (channels).

---

## 🎯 Objectifs Pédagogiques

- Maîtriser le développement d'une application full-stack avec Node.js
- Implémenter une communication en temps réel avec WebSocket (Socket.io)
- Concevoir une API RESTful sécurisée
- Développer une interface utilisateur moderne et réactive (Angular ou React)
- Gérer l'authentification et les sessions utilisateurs
- Manipuler une base de données NoSQL (MongoDB)

---

## 🛠️ Spécifications Techniques

### Backend (Node.js)
- **Framework** : Express.js
- **Communication temps réel** : Socket.io
- **Base de données** : MongoDB (ou alternative : fichiers JSON)
- **Authentification** : JWT (JSON Web Tokens) ou sessions Express
- **Architecture** : REST API + WebSocket

### Frontend (Au choix)
- **Option 1** : React + Socket.io-client
- **Option 2** : Angular + Socket.io-client
- **Styling** : CSS/SCSS ou framework UI (Material-UI, Bootstrap, Tailwind...)

---

## 📱 Fonctionnalités Requises

### 🔴 Fonctionnalités Obligatoires (Priorité Haute)

#### 1. Authentification Utilisateur
- [ ] Inscription d'un nouvel utilisateur (pseudo, email, mot de passe)
- [ ] Connexion avec identifiants
- [ ] Déconnexion
- [ ] Stockage sécurisé des mots de passe (hachage bcrypt)
- [ ] Protection des routes (middleware d'authentification)

#### 2. Gestion des Canaux (Channels)
- [ ] Création d'un canal par un utilisateur
- [ ] Liste de tous les canaux disponibles
- [ ] Rejoindre un canal existant
- [ ] Affichage du canal actif

#### 3. Messagerie en Temps Réel
- [ ] Envoi de messages texte dans un canal
- [ ] Réception des messages en temps réel (Socket.io)
- [ ] Affichage de l'historique des messages d'un canal
- [ ] Affichage de l'auteur et de l'heure de chaque message
- [ ] Notification lors de la connexion/déconnexion d'utilisateurs

#### 4. Interface Utilisateur
- [ ] Page de connexion/inscription
- [ ] Vue principale avec :
  - Barre latérale listant les canaux
  - Zone de chat principale
  - Zone de saisie de message
- [ ] Interface responsive (mobile friendly)
- [ ] Indicateur visuel du canal actif

### 🟡 Fonctionnalités Optionnelles (Bonus)

- [ ] Affichage de la liste des utilisateurs connectés
- [ ] Émojis ou réactions aux messages
- [ ] Suppression de ses propres messages
- [ ] Messages privés entre utilisateurs
- [ ] Notifications sonores pour nouveaux messages
- [ ] Avatar utilisateur personnalisable
- [ ] Formatage du texte (gras, italique, code)
- [ ] Recherche dans l'historique des messages

---

## 📊 Architecture Suggérée

### Structure Backend
```
backend/
├── server.js                 # Point d'entrée
├── config/
│   └── database.js          # Configuration MongoDB
├── models/
│   ├── User.js              # Modèle utilisateur
│   ├── Channel.js           # Modèle canal
│   └── Message.js           # Modèle message
├── routes/
│   ├── auth.js              # Routes authentification
│   ├── channels.js          # Routes canaux
│   └── messages.js          # Routes messages
├── middleware/
│   └── auth.js              # Middleware authentification
└── socket/
    └── socketHandler.js     # Gestion Socket.io
```

### Structure Frontend (React)
```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Chat/
│   │   │   ├── ChannelList.jsx
│   │   │   ├── ChatArea.jsx
│   │   │   └── MessageInput.jsx
│   │   └── Layout/
│   │       └── MainLayout.jsx
│   ├── services/
│   │   ├── api.js           # Appels API REST
│   │   └── socket.js        # Configuration Socket.io
│   ├── context/
│   │   └── AuthContext.jsx  # Contexte authentification
│   └── App.jsx
```

---

## 🗄️ Modèles de Données

### User (Utilisateur)
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Channel (Canal)
```javascript
{
  _id: ObjectId,
  name: String (unique),
  description: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date
}
```

### Message
```javascript
{
  _id: ObjectId,
  content: String,
  author: ObjectId (ref: User),
  channel: ObjectId (ref: Channel),
  createdAt: Date
}
```

---

## 🔌 API REST à Implémenter

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Récupérer l'utilisateur connecté

### Canaux
- `GET /api/channels` - Liste tous les canaux
- `POST /api/channels` - Créer un canal
- `GET /api/channels/:id` - Détails d'un canal

### Messages
- `GET /api/channels/:id/messages` - Historique des messages
- `POST /api/channels/:id/messages` - Envoyer un message (alternative REST)

---

## 🔄 Événements WebSocket (Socket.io)

### Événements Client → Serveur
- `join_channel` - Rejoindre un canal
- `send_message` - Envoyer un message
- `leave_channel` - Quitter un canal
- `typing` - Indicateur de saisie (bonus)

### Événements Serveur → Client
- `new_message` - Nouveau message reçu
- `user_joined` - Utilisateur rejoint le canal
- `user_left` - Utilisateur quitte le canal
- `channel_created` - Nouveau canal créé

---

## ⏱️ Gestion du Temps Suggérée

| Phase | Durée | Tâches |
|-------|-------|--------|
| **Setup & Architecture** | 30 min | Configuration projet, installation dépendances, structure |
| **Backend - Auth** | 1h15 | Modèles, routes auth, middleware, JWT |
| **Backend - Channels & Messages** | 1h | Routes REST, modèles, logique métier |
| **Backend - Socket.io** | 45 min | Configuration WebSocket, événements temps réel |
| **Frontend - Structure** | 30 min | Setup React/Angular, routing, composants de base |
| **Frontend - Auth** | 45 min | Formulaires login/register, gestion token |
| **Frontend - Chat UI** | 1h30 | Liste canaux, zone chat, saisie messages |
| **Frontend - Socket Integration** | 45 min | Connexion Socket.io, événements temps réel |
| **Tests & Debug** | 45 min | Tests fonctionnels, corrections bugs |

**Total : 7 heures**

---

## 📦 Livrables Attendus

### Code Source
1. **Dépôt Git** avec historique de commits cohérent
2. **README.md** comprenant :
   - Instructions d'installation
   - Commandes de démarrage
   - Liste des technologies utilisées
   - Captures d'écran (optionnel)

### Documentation Technique
3. **Architecture** : Schéma ou description de l'architecture
4. **API Documentation** : Liste des endpoints avec exemples

### Application Fonctionnelle
5. Backend démarrant sans erreur (`npm start`)
6. Frontend démarrant sans erreur (`npm start`)
7. Base de données accessible (MongoDB local ou conteneur)

---

## 📝 Critères d'Évaluation

| Critère | Points | Détails |
|---------|--------|---------|
| **Fonctionnalités** | /8 | Toutes les fonctionnalités obligatoires implémentées |
| **Qualité du code** | /4 | Structure, lisibilité, conventions de nommage |
| **Architecture** | /3 | Séparation des responsabilités, modularité |
| **Sécurité** | /2 | Hachage mots de passe, validation inputs, protection routes |
| **Interface utilisateur** | /2 | Ergonomie, design, responsive |
| **Documentation** | /1 | README complet et clair |
| **Bonus** | +2 | Fonctionnalités optionnelles implémentées |

**Total : /20 (+ bonus)**

---

## 🚀 Pour Démarrer

### 1. Initialisation du Backend
```bash
mkdir discord-app && cd discord-app
mkdir backend && cd backend
npm init -y
npm install express mongoose socket.io jsonwebtoken bcryptjs cors dotenv
npm install --save-dev nodemon
```

### 2. Initialisation du Frontend (React)
```bash
cd ..
npx create-react-app frontend
cd frontend
npm install socket.io-client axios react-router-dom
```

### 3. MongoDB
```bash
# Option 1 : MongoDB local
mongod

# Option 2 : MongoDB avec Docker
docker run -d -p 27017:27017 --name discord-mongo mongo
```

---

## 💡 Conseils

1. **Commencez simple** : Implémentez d'abord les fonctionnalités de base, optimisez ensuite
2. **Testez régulièrement** : Vérifiez chaque fonctionnalité avant de passer à la suivante
3. **Utilisez Postman** : Testez votre API avant d'intégrer le frontend
4. **Socket.io** : Testez les événements WebSocket avec les DevTools du navigateur
5. **Git** : Commitez régulièrement avec des messages clairs
6. **Documentation** : Commentez votre code au fur et à mesure

---

## 📚 Ressources Utiles

- [Documentation Express.js](https://expressjs.com/)
- [Documentation Socket.io](https://socket.io/docs/)
- [Documentation React](https://react.dev/)
- [Documentation Angular](https://angular.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)

---

## ⚠️ Contraintes

- Utilisation **obligatoire** de Node.js pour le backend
- Communication temps réel **obligatoire** avec Socket.io
- Au moins **80% des fonctionnalités obligatoires** doivent être implémentées
- Le code doit être **versionné avec Git**
- L'application doit être **démarrable localement**

---

## 🎓 Modalités de Rendu

- **Deadline** : [À définir par l'enseignant]
- **Format** : Lien vers dépôt Git (GitHub/GitLab) ou archive ZIP
- **Présentation** : Démonstration de 10 minutes de l'application fonctionnelle

---

**Bon courage ! 🚀**
