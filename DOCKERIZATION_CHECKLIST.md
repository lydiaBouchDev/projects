# Checklist de Dockerisation - Todo App Node.js
## Projet 7 heures : Dockerisation, Optimisation & Sécurité

---

## 📋 Phase 1 : Dockerisation de Base (2h30)
**Temps : H0 → H2h30**

### Dockerfile Multi-Stage (1h30)
- [ ] Créer le fichier `Dockerfile` à la racine
- [ ] **Stage 1 - Builder**
  - [ ] FROM node:20-alpine AS builder
  - [ ] WORKDIR /app
  - [ ] COPY package*.json ./
  - [ ] RUN npm ci
  - [ ] COPY . .
- [ ] **Stage 2 - Production**
  - [ ] FROM node:20-alpine
  - [ ] WORKDIR /app
  - [ ] Copier uniquement les dépendances de production
  - [ ] Copier les fichiers de l'application
  - [ ] Configurer USER node (non-root)
  - [ ] EXPOSE 3000
  - [ ] Ajouter HEALTHCHECK
  - [ ] Ajouter labels (version, maintainer, etc.)
  - [ ] CMD ["node", "server.js"]

### Docker Compose (45 min)
- [ ] Créer `docker-compose.yml`
- [ ] Définir le service `app`
- [ ] Configurer build context
- [ ] Mapper le port 3000:3000
- [ ] Ajouter variables d'environnement (NODE_ENV, DATA_FILE)
- [ ] **Configurer volume pour la persistance des données**
  - [ ] Définir volume `todo-data`
  - [ ] Monter le volume sur `/app/data`
  - [ ] Variable DATA_FILE=/app/data/todos.json
- [ ] Configurer health check
- [ ] Ajouter restart policy (unless-stopped)
- [ ] Configurer limites de ressources (optionnel)
- [ ] Définir un réseau custom (optionnel)

### .dockerignore (15 min)
- [ ] Créer `.dockerignore`
- [ ] Ajouter node_modules/
- [ ] Ajouter .git/
- [ ] Ajouter *.log
- [ ] Ajouter .env
- [ ] Ajouter fichiers de documentation (optionnel)
- [ ] Ajouter fichiers de test

### Tests de Base (30 min)
- [ ] Build de l'image : `docker build -t nodejs-todo-app .`
- [ ] Vérifier la taille de l'image : `docker images nodejs-todo-app`
- [ ] Run du container : `docker run -d -p 3000:3000 --name todo nodejs-todo-app`
- [ ] Tester l'application : `curl http://localhost:3000` ou navigateur
- [ ] Vérifier les logs : `docker logs todo`
- [ ] Tester docker-compose : `docker-compose up`
- [ ] Vérifier le health check : `docker ps` (voir statut healthy)
- [ ] **Tester la persistance des données**
  - [ ] Ajouter un todo via l'interface
  - [ ] Redémarrer : `docker-compose restart`
  - [ ] Vérifier que le todo est toujours présent
- [ ] Arrêter et nettoyer : `docker-compose down`

**✅ Livrable Phase 1 :** Application fonctionnelle dans Docker avec persistance

---

## ⚡ Phase 2 : Optimisation (1h30)
**Temps : H2h30 → H4h**

### Optimisation du Dockerfile (45 min)
- [ ] **Layer Caching**
  - [ ] COPY package*.json avant l'installation
  - [ ] Regrouper les commandes RUN avec &&
  - [ ] Mettre les instructions qui changent peu en premier
- [ ] **Optimisation des dépendances**
  - [ ] Utiliser `npm ci` au lieu de `npm install`
  - [ ] Ajouter `--only=production` pour prod
  - [ ] Nettoyer le cache npm : `npm cache clean --force`
- [ ] **Nettoyage**
  - [ ] Supprimer les fichiers temporaires
  - [ ] Combiner les commandes RUN
  - [ ] Utiliser .dockerignore efficacement
- [ ] **Image de base**
  - [ ] Vérifier que node:20-alpine est utilisé
  - [ ] Éviter les versions `latest`

### Mesure des Métriques (15 min)
- [ ] Noter la taille initiale de l'image
- [ ] Compter le nombre de layers : `docker history nodejs-todo-app`
- [ ] Mesurer le temps de build : `time docker build -t nodejs-todo-app .`
- [ ] Mesurer le temps de démarrage
- [ ] Noter l'utilisation mémoire : `docker stats`

### Itération d'Optimisation (30 min)
- [ ] Rebuild avec optimisations
- [ ] Comparer les nouvelles métriques
- [ ] Ajuster si nécessaire pour atteindre < 150 MB
- [ ] Vérifier que l'application fonctionne toujours
- [ ] Documenter les optimisations appliquées

**✅ Livrable Phase 2 :** Image Docker < 150 MB

---

## 🔒 Phase 3 : Sécurité (2h)
**Temps : H4h → H6h**

### Installation des Outils (15 min)

**macOS :**
- [ ] Installer Trivy : `brew install trivy`
- [ ] Installer Hadolint : `brew install hadolint`

**Linux :**
- [ ] Installer Trivy (voir commandes dans PROJET_DOCKERISATION.md)
- [ ] Installer Hadolint (voir commandes dans PROJET_DOCKERISATION.md)

**Docker (alternative) :**
- [ ] Trivy : `docker pull aquasec/trivy`
- [ ] Hadolint : `docker pull hadolint/hadolint`

### Scan de Sécurité (30 min)

**Scan Trivy :**
- [ ] Scanner l'image : `trivy image nodejs-todo-app:latest`
- [ ] Générer rapport JSON : `trivy image -f json -o trivy-report.json nodejs-todo-app:latest`
- [ ] Analyser le rapport
- [ ] Noter les vulnérabilités critiques
- [ ] Noter les vulnérabilités hautes
- [ ] Identifier les packages vulnérables

**Lint Dockerfile :**
- [ ] Linter le Dockerfile : `hadolint Dockerfile`
- [ ] Noter tous les warnings et erreurs
- [ ] Comprendre chaque recommandation

### Corrections de Sécurité (45 min)

**Corrections Trivy :**
- [ ] Mettre à jour l'image de base si nécessaire
- [ ] Mettre à jour les dépendances npm : `npm update`
- [ ] Corriger les vulnérabilités critiques
- [ ] Corriger les vulnérabilités hautes (autant que possible)
- [ ] Rebuild l'image après chaque correction

**Corrections Hadolint :**
- [ ] Corriger DL3006 : Toujours tagger les images FROM
- [ ] Corriger DL3008 : Épingler les versions apt-get
- [ ] Corriger DL3009 : Nettoyer apt cache
- [ ] Corriger DL3015 : Éviter --no-cache avec apk
- [ ] Corriger tous les autres warnings

**Bonnes Pratiques :**
- [ ] Vérifier que USER node est configuré
- [ ] Vérifier que pas de secrets dans l'image
- [ ] Vérifier que .env n'est pas copié
- [ ] Vérifier les permissions des fichiers
- [ ] Ajouter labels de sécurité

### Re-scan et Validation (30 min)
- [ ] Nouveau scan Trivy après corrections
- [ ] Vérifier : 0 vulnérabilité critique ✅
- [ ] Vérifier : < 3 vulnérabilités hautes ✅
- [ ] Nouveau lint Hadolint
- [ ] Vérifier : 0 erreur Hadolint ✅
- [ ] Générer le rapport final
- [ ] Prendre des captures d'écran des résultats
- [ ] Documenter les vulnérabilités résiduelles (justification)

**✅ Livrable Phase 3 :** Image sécurisée avec 0 vulnérabilité critique

---

## 📚 Phase 4 : Documentation (1h)
**Temps : H6h → H7h**

### Mise à jour README.md (20 min)
- [ ] Ajouter section "🐳 Démarrage avec Docker"
- [ ] **Prérequis**
  - [ ] Docker 20.10+
  - [ ] Docker Compose 2.0+
- [ ] **Installation et Démarrage**
  - [ ] Commande de build
  - [ ] Commande de run
  - [ ] Commande docker-compose
- [ ] **Commandes Utiles**
  - [ ] Logs
  - [ ] Arrêt/Suppression
  - [ ] Stats
- [ ] **Variables d'Environnement**
  - [ ] Liste des variables
  - [ ] Valeurs par défaut
- [ ] Ajouter badges (optionnel)

### Création docs/DOCKER.md (20 min)
- [ ] Créer le dossier `docs/` si nécessaire
- [ ] Créer `docs/DOCKER.md`
- [ ] **Section 1 : Architecture**
  - [ ] Diagramme ou description de l'architecture
  - [ ] Explications du multi-stage build
  - [ ] Justification des choix techniques
- [ ] **Section 2 : Dockerfile Expliqué**
  - [ ] Explication ligne par ligne (sections clés)
  - [ ] Justification de chaque optimisation
- [ ] **Section 3 : Optimisations Appliquées**
  - [ ] Tableau comparatif avant/après
  - [ ] Liste des techniques utilisées
  - [ ] Résultats obtenus
- [ ] **Section 4 : Utilisation Avancée**
  - [ ] Variables d'environnement
  - [ ] Volumes (si applicable)
  - [ ] Réseau (si applicable)

### Création docs/SECURITY.md (15 min)
- [ ] Créer `docs/SECURITY.md`
- [ ] **Section 1 : Checklist de Sécurité**
  - [ ] Liste des bonnes pratiques appliquées
  - [ ] Cocher chaque élément
- [ ] **Section 2 : Rapport de Scan Trivy**
  - [ ] Résumé du scan initial
  - [ ] Résumé du scan final
  - [ ] Tableau comparatif
- [ ] **Section 3 : Rapport Hadolint**
  - [ ] Résultat du lint
  - [ ] Corrections appliquées
- [ ] **Section 4 : Vulnérabilités Résiduelles**
  - [ ] Liste des vulnérabilités non critiques restantes
  - [ ] Justification pour chacune
  - [ ] Plan de mitigation (si applicable)
- [ ] **Section 5 : Recommandations**
  - [ ] Bonnes pratiques pour la maintenance
  - [ ] Fréquence des scans recommandée

### Tests Finaux et Validation (5 min)
- [ ] Build propre sans cache : `docker build --no-cache -t nodejs-todo-app .`
- [ ] Vérifier le succès du build
- [ ] Lancer l'application : `docker-compose up -d`
- [ ] Tester l'accès : `curl http://localhost:3000`
- [ ] Vérifier la documentation (liens, typos)
- [ ] Vérifier que tous les fichiers sont créés
- [ ] Créer un README dans docs/ (index des docs)

**✅ Livrable Phase 4 :** Projet complet et documenté

---

## 📊 Tableau de Suivi des Métriques

Remplir au fur et à mesure :

| Métrique | Avant Optimisation | Après Optimisation | Objectif | Atteint ? |
|----------|-------------------|-------------------|----------|-----------|
| Taille image | _____ MB | _____ MB | < 150 MB | ⬜ |
| Nombre de layers | _____ | _____ | < 15 | ⬜ |
| Temps de build | _____ min | _____ sec | < 2 min | ⬜ |
| Temps démarrage | _____ sec | _____ sec | < 10 sec | ⬜ |
| Vulnérabilités critiques | _____ | _____ | 0 | ⬜ |
| Vulnérabilités hautes | _____ | _____ | < 3 | ⬜ |
| Erreurs Hadolint | _____ | _____ | 0 | ⬜ |
| Utilisation mémoire | _____ MB | _____ MB | < 256 MB | ⬜ |

---

## 🎯 Checklist de Validation Finale

Avant de soumettre le projet, vérifier :

### Fonctionnel
- [ ] `docker build -t nodejs-todo-app .` → ✅ Succès
- [ ] `docker run -d -p 3000:3000 nodejs-todo-app` → ✅ Succès
- [ ] `curl http://localhost:3000` → ✅ Réponse 200 OK
- [ ] `docker-compose up` → ✅ Démarre sans erreur
- [ ] Application accessible dans le navigateur → ✅
- [ ] Toutes les fonctionnalités Todo fonctionnent → ✅

### Optimisation
- [ ] `docker images nodejs-todo-app` → ✅ Taille < 150 MB
- [ ] `docker history nodejs-todo-app` → ✅ Layers < 15
- [ ] Multi-stage build présent → ✅
- [ ] Layer caching optimisé → ✅
- [ ] Temps de démarrage < 10 sec → ✅

### Sécurité
- [ ] `trivy image nodejs-todo-app` → ✅ 0 critique
- [ ] `trivy image nodejs-todo-app` → ✅ < 3 hautes
- [ ] `hadolint Dockerfile` → ✅ 0 erreur
- [ ] USER non-root configuré → ✅
- [ ] Pas de secrets dans l'image → ✅
- [ ] .env non copié → ✅

### Documentation
- [ ] README.md mis à jour avec section Docker → ✅
- [ ] docs/DOCKER.md créé et complet → ✅
- [ ] docs/SECURITY.md créé avec rapports → ✅
- [ ] Tableau de métriques rempli → ✅
- [ ] Tous les liens fonctionnent → ✅
- [ ] Pas de typos majeures → ✅

### Fichiers Requis
- [ ] Dockerfile → ✅
- [ ] docker-compose.yml → ✅
- [ ] .dockerignore → ✅
- [ ] .env.example → ✅ (déjà créé)
- [ ] docs/DOCKER.md → ✅
- [ ] docs/SECURITY.md → ✅
- [ ] README.md (mis à jour) → ✅

### Git
- [ ] Tous les fichiers ajoutés → ✅
- [ ] Commit avec message descriptif → ✅
- [ ] Push vers la branche → ✅

---

## 🔧 Commandes de Référence Rapide

### Build & Run
```bash
# Build
docker build -t nodejs-todo-app .
docker build --no-cache -t nodejs-todo-app .  # Sans cache

# Run
docker run -d -p 3000:3000 --name todo nodejs-todo-app
docker run -it -p 3000:3000 nodejs-todo-app  # Mode interactif

# Compose
docker-compose up
docker-compose up -d              # Détaché
docker-compose up --build         # Rebuild
docker-compose down               # Arrêt
```

### Debug & Inspection
```bash
# Logs
docker logs todo
docker logs -f todo              # Follow
docker-compose logs -f

# Shell
docker exec -it todo sh

# Stats
docker stats todo
docker stats --no-stream

# Inspection
docker inspect nodejs-todo-app
docker history nodejs-todo-app
docker images nodejs-todo-app
```

### Sécurité
```bash
# Trivy
trivy image nodejs-todo-app:latest
trivy image -f json -o report.json nodejs-todo-app:latest
trivy image --severity HIGH,CRITICAL nodejs-todo-app:latest

# Hadolint
hadolint Dockerfile
hadolint --ignore DL3006 Dockerfile  # Ignorer une règle
```

### Nettoyage
```bash
# Container
docker stop todo
docker rm todo
docker stop todo && docker rm todo

# Image
docker rmi nodejs-todo-app
docker rmi $(docker images -q nodejs-todo-app)

# Tout nettoyer
docker system prune -a
docker volume prune
```

---

## 💡 Conseils pour Réussir

### Gestion du Temps
- ⏱️ Commencer par un Dockerfile simple qui fonctionne
- ⏱️ Optimiser progressivement, ne pas viser la perfection immédiate
- ⏱️ Scanner tôt et souvent (ne pas attendre la phase 3)
- ⏱️ Documenter au fur et à mesure (pas uniquement à la fin)

### Optimisation
- 📦 Mesurer avant/après chaque changement
- 📦 Tester fréquemment (build + run + test)
- 📦 Garder une copie de travail avant changements majeurs
- 📦 Utiliser docker build --progress=plain pour voir les détails

### Sécurité
- 🔒 Ne pas paniquer devant un long rapport Trivy
- 🔒 Se concentrer d'abord sur les vulnérabilités critiques
- 🔒 Lire les descriptions pour comprendre l'impact
- 🔒 Documenter les vulnérabilités qu'on ne peut pas corriger

### Documentation
- 📝 Prendre des notes pendant le développement
- 📝 Capturer les commandes utilisées
- 📝 Faire des captures d'écran des résultats
- 📝 Utiliser des exemples concrets

---

## 📈 Grille d'Auto-Évaluation (100 points)

### Dockerisation (30 points)
- [ ] Dockerfile multi-stage (15 pts) → _____ / 15
- [ ] Docker Compose (10 pts) → _____ / 10
- [ ] .dockerignore (5 pts) → _____ / 5
**Total Dockerisation** : _____ / 30

### Optimisation (25 points)
- [ ] Taille < 150 MB (10 pts) → _____ / 10
- [ ] Layer caching (5 pts) → _____ / 5
- [ ] Bonnes pratiques (5 pts) → _____ / 5
- [ ] Métriques documentées (5 pts) → _____ / 5
**Total Optimisation** : _____ / 25

### Sécurité (30 points)
- [ ] 0 vulnérabilité critique (15 pts) → _____ / 15
- [ ] Hadolint sans erreur (5 pts) → _____ / 5
- [ ] USER non-root (5 pts) → _____ / 5
- [ ] Gestion secrets (5 pts) → _____ / 5
**Total Sécurité** : _____ / 30

### Documentation (15 points)
- [ ] README.md (5 pts) → _____ / 5
- [ ] docs/DOCKER.md (5 pts) → _____ / 5
- [ ] docs/SECURITY.md (5 pts) → _____ / 5
**Total Documentation** : _____ / 15

### Bonus (10 points max)
- [ ] Scripts automatisation (3 pts) → _____ / 3
- [ ] Image < 100 MB (3 pts) → _____ / 3
- [ ] Tests automatisés (2 pts) → _____ / 2
- [ ] Doc exemplaire (2 pts) → _____ / 2
**Total Bonus** : _____ / 10

**SCORE TOTAL** : _____ / 100 (+ bonus)

---

**Date de création** : 2025-12-18
**Dernière mise à jour** : 2025-12-18
**Version** : 2.0 (7 heures - Sans CI/CD)
**Statut** : ⏳ Prêt à commencer
