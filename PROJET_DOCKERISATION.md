# Énoncé de Projet : Dockerisation et Optimisation de l'Application Todo

## 1. Contexte du Projet

L'application Todo Node.js existante nécessite une containerisation avec Docker pour assurer une portabilité optimale. Ce projet vise à créer une image Docker optimisée et sécurisée, en appliquant les meilleures pratiques de l'industrie.

**Durée estimée** : 7 heures
**Niveau** : Intermédiaire

## 2. Objectifs du Projet

### 2.1 Objectifs Principaux
- Containeriser l'application avec Docker
- Optimiser l'image Docker pour réduire la taille et améliorer les performances
- Implémenter les meilleures pratiques de sécurité Docker
- Documenter le processus de dockerisation

### 2.2 Objectifs Spécifiques
- Réduire la taille de l'image Docker finale à moins de 150 MB
- Atteindre un score de sécurité sans vulnérabilités critiques
- Temps de démarrage du container inférieur à 10 secondes
- Documentation complète du processus

## 3. Livrables Attendus

### 3.1 Configuration Docker

#### A. Dockerfile Multi-Stage Optimisé (2h)

**Caractéristiques requises :**
- **Multi-stage build** avec au minimum 2 stages (build + production)
- Stage 1 (Builder) : Installation des dépendances et préparation
- Stage 2 (Production) : Image finale légère avec uniquement le nécessaire
- Utilisation d'une image de base Alpine Linux (`node:20-alpine`)
- Layer caching optimisé
- Installation uniquement des dépendances de production
- Exécution avec un utilisateur non-root
- Health check configuré
- Labels pour métadonnées

**Structure recommandée :**
```dockerfile
# Stage 1: Builder
FROM node:20-alpine AS builder
# Installation et build

# Stage 2: Production
FROM node:20-alpine
# Copie uniquement les fichiers nécessaires
```

**Critères d'acceptation :**
- ✅ Image finale < 150 MB
- ✅ Temps de build < 2 minutes
- ✅ Pas de fichiers de développement dans l'image finale
- ✅ Utilisateur non-root configuré
- ✅ Health check fonctionnel

#### B. Docker Compose (1h)

**Configuration requise :**
- Service principal pour l'application
- Variables d'environnement externalisées
- Volumes pour les logs (optionnel)
- Configuration réseau avec nom custom
- Health checks configurés
- Restart policy appropriée
- Limites de ressources (CPU, mémoire)

**Exemple de services :**
```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

**Critères d'acceptation :**
- ✅ Démarrage complet en moins de 15 secondes
- ✅ Application accessible sur http://localhost:3000
- ✅ Redémarrage automatique en cas d'échec
- ✅ Variables d'environnement bien configurées

#### C. .dockerignore (15 min)

**Fichiers à exclure :**
- node_modules/
- npm-debug.log
- .git/
- .gitignore
- README.md (optionnel)
- docs/
- tests/
- .env (si existe)
- *.md (optionnel)

**Critères d'acceptation :**
- ✅ Contexte de build optimisé
- ✅ Réduction du temps de build
- ✅ Pas de fichiers sensibles inclus

### 3.2 Sécurité (2h)

#### A. Analyse et Correction des Vulnérabilités

**Outils à utiliser :**

1. **Trivy** - Scan de vulnérabilités
   ```bash
   # Installation
   brew install trivy  # macOS
   # ou
   wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -

   # Utilisation
   trivy image nodejs-todo-app:latest
   ```

2. **Hadolint** - Linting du Dockerfile
   ```bash
   # Installation
   brew install hadolint  # macOS
   # ou
   docker pull hadolint/hadolint

   # Utilisation
   hadolint Dockerfile
   ```

**Tâches de sécurité :**
- [ ] Scanner l'image avec Trivy
- [ ] Générer un rapport de vulnérabilités
- [ ] Corriger les vulnérabilités critiques et hautes
- [ ] Lint du Dockerfile avec Hadolint
- [ ] Corriger tous les warnings du Dockerfile
- [ ] Vérifier les permissions des fichiers

**Critères d'acceptation :**
- ✅ **Zéro vulnérabilité critique**
- ✅ Maximum 3 vulnérabilités hautes
- ✅ Aucune erreur Hadolint
- ✅ Rapport de sécurité documenté

#### B. Bonnes Pratiques de Sécurité

**Checklist de sécurité obligatoire :**

1. **Image de base**
   - [ ] Utilisation d'une image officielle et maintenue
   - [ ] Version spécifique (pas de tag `latest` en production)
   - [ ] Image Alpine pour réduire la surface d'attaque

2. **Utilisateur non-root**
   - [ ] Création ou utilisation d'un utilisateur non-root
   - [ ] Pas d'exécution en tant que root
   - [ ] Permissions appropriées sur les fichiers

3. **Secrets et configuration**
   - [ ] Pas de secrets hardcodés dans le Dockerfile
   - [ ] Utilisation de variables d'environnement
   - [ ] Fichier .env.example fourni
   - [ ] .env dans .gitignore et .dockerignore

4. **Optimisation de sécurité**
   - [ ] Suppression des packages de build inutiles
   - [ ] Nettoyage des caches (npm, apt)
   - [ ] Minimisation du nombre de layers
   - [ ] Exposition minimale des ports

5. **Labels et métadonnées**
   - [ ] Labels pour traçabilité
   - [ ] Version de l'application
   - [ ] Informations de maintenance

#### C. Gestion des Secrets

**Pratiques à implémenter :**
- Variables d'environnement via docker-compose
- Fichier .env.example avec des valeurs par défaut
- Documentation de toutes les variables requises
- Avertissement sur les secrets dans la documentation

**Exemple de configuration :**
```env
NODE_ENV=production
PORT=3000
# Ajouter d'autres variables selon les besoins
```

### 3.3 Optimisation de l'Image (1h30)

#### A. Techniques d'Optimisation

**1. Multi-Stage Build**
- Séparation claire entre build et production
- Copie sélective des artifacts
- Réduction de la taille finale

**2. Layer Caching**
- Ordre optimal des instructions
- COPY package*.json avant npm install
- Instructions peu changeantes en premier

**3. Optimisation des dépendances**
- `npm ci` au lieu de `npm install`
- `--production` pour dépendances de production uniquement
- `--only=production` pour npm install
- Suppression du cache npm

**4. Nettoyage**
- Suppression des fichiers temporaires
- Nettoyage des caches apt (si utilisé)
- Suppression des packages de build

**Exemple d'optimisations :**
```dockerfile
# Mauvais
RUN npm install
RUN npm cache clean --force

# Bon
RUN npm ci --only=production && \
    npm cache clean --force
```

#### B. Métriques d'Optimisation

**Objectifs à atteindre :**

| Métrique | Objectif | Mesure |
|----------|----------|--------|
| Taille de l'image | < 150 MB | `docker images` |
| Nombre de layers | < 15 | `docker history` |
| Temps de build | < 2 min | `time docker build` |
| Temps de démarrage | < 10 sec | `time docker run` |
| Utilisation mémoire | < 256 MB | `docker stats` |

**Commandes de vérification :**
```bash
# Taille de l'image
docker images nodejs-todo-app

# Analyse des layers
docker history nodejs-todo-app:latest

# Inspection détaillée
docker inspect nodejs-todo-app:latest

# Stats en temps réel
docker stats
```

### 3.4 Documentation (1h30)

#### A. Documentation Technique

**Fichiers à créer/mettre à jour :**

1. **README.md** (mise à jour)
   - [ ] Section "Démarrage avec Docker"
   - [ ] Prérequis (Docker, Docker Compose)
   - [ ] Commandes de build et run
   - [ ] Guide de dépannage
   - [ ] Variables d'environnement

2. **docs/DOCKER.md** (nouveau)
   - [ ] Architecture Docker détaillée
   - [ ] Explications du Dockerfile
   - [ ] Choix techniques et justifications
   - [ ] Optimisations appliquées

3. **docs/SECURITY.md** (nouveau)
   - [ ] Checklist de sécurité
   - [ ] Rapport de scan Trivy
   - [ ] Vulnérabilités identifiées et corrigées
   - [ ] Bonnes pratiques implémentées

#### B. Guide d'Utilisation Docker

**Contenu minimum requis :**

```markdown
## Démarrage Rapide avec Docker

### Prérequis
- Docker 20.10+
- Docker Compose 2.0+

### Installation et Démarrage

1. Build de l'image :
   \`\`\`bash
   docker build -t nodejs-todo-app .
   \`\`\`

2. Lancement avec Docker :
   \`\`\`bash
   docker run -d -p 3000:3000 --name todo-app nodejs-todo-app
   \`\`\`

3. Lancement avec Docker Compose :
   \`\`\`bash
   docker-compose up -d
   \`\`\`

### Commandes Utiles
- Logs : \`docker logs todo-app\`
- Arrêt : \`docker stop todo-app\`
- Suppression : \`docker rm todo-app\`
```

#### C. Documentation des Optimisations

**Tableau comparatif à fournir :**

| Aspect | Avant | Après | Amélioration |
|--------|-------|-------|--------------|
| Taille image | ~XXX MB | ~XXX MB | -XX% |
| Temps build | X min | X min | -XX% |
| Vulnérabilités | X critical | 0 critical | 100% |
| Layers | XX | XX | -XX% |

## 4. Spécifications Techniques

### 4.1 Stack Technologique
- **Containerisation** : Docker 20.10+, Docker Compose 2.0+
- **Image de base** : node:20-alpine
- **Outils de sécurité** : Trivy, Hadolint
- **Documentation** : Markdown

### 4.2 Structure des Fichiers à Créer

```
project-root/
├── Dockerfile                      # Dockerfile multi-stage optimisé ⭐
├── docker-compose.yml              # Configuration Docker Compose ⭐
├── .dockerignore                   # Exclusions Docker ⭐
├── .env.example                    # ✅ Déjà créé
├── docs/
│   ├── DOCKER.md                   # Documentation Docker ⭐
│   └── SECURITY.md                 # Documentation sécurité ⭐
├── scripts/
│   ├── build.sh                    # Script de build (optionnel)
│   └── scan.sh                     # Script de scan sécurité (optionnel)
├── README.md                       # Mise à jour avec section Docker ⭐
├── PROJET_DOCKERISATION.md         # ✅ Ce document
└── DOCKERIZATION_CHECKLIST.md      # ✅ Checklist de suivi

⭐ = À créer/modifier
```

### 4.3 Variables d'Environnement

**Variables requises :**
```env
# Application
NODE_ENV=production
PORT=3000
APP_NAME=nodejs-todo-app

# Docker (optionnel)
DOCKER_IMAGE_NAME=nodejs-todo-app
DOCKER_IMAGE_TAG=latest
```

## 5. Planning de Réalisation (7 heures)

### Phase 1 : Dockerisation de Base (2h30)
**Horaire : H0 → H2h30**

**Tâches :**
- Création du Dockerfile multi-stage (1h30)
  - Stage builder avec installation des dépendances
  - Stage production avec image optimisée
  - Configuration utilisateur non-root
  - Health check
- Configuration Docker Compose (45 min)
  - Service application
  - Variables d'environnement
  - Health checks et restart policy
- Création du .dockerignore (15 min)
- Tests de base (30 min)
  - Build de l'image
  - Lancement du container
  - Vérification fonctionnelle

**Livrable :** Application fonctionnelle dans Docker

### Phase 2 : Optimisation (1h30)
**Horaire : H2h30 → H4h**

**Tâches :**
- Optimisation du Dockerfile (45 min)
  - Layer caching
  - npm ci au lieu de npm install
  - Nettoyage des caches
  - Optimisation de l'ordre des instructions
- Mesure des métriques (15 min)
  - Taille de l'image
  - Nombre de layers
  - Temps de build
- Itération d'optimisation (30 min)
  - Ajustements basés sur les métriques
  - Tests de performance

**Livrable :** Image Docker optimisée < 150 MB

### Phase 3 : Sécurité (2h)
**Horaire : H4h → H6h**

**Tâches :**
- Installation des outils (15 min)
  - Trivy pour scan de vulnérabilités
  - Hadolint pour lint du Dockerfile
- Scan de sécurité (30 min)
  - Scan Trivy de l'image
  - Analyse du rapport
  - Lint avec Hadolint
- Corrections de sécurité (45 min)
  - Correction des vulnérabilités critiques
  - Correction des warnings Hadolint
  - Application des bonnes pratiques
- Re-scan et validation (30 min)
  - Nouveau scan après corrections
  - Génération du rapport final
  - Documentation des vulnérabilités résiduelles

**Livrable :** Image sécurisée avec 0 vulnérabilité critique

### Phase 4 : Documentation et Validation (1h)
**Horaire : H6h → H7h**

**Tâches :**
- Mise à jour README.md (20 min)
  - Section Docker
  - Guide de démarrage
  - Commandes utiles
- Création docs/DOCKER.md (20 min)
  - Architecture
  - Explications techniques
- Création docs/SECURITY.md (15 min)
  - Rapport de sécurité
  - Checklist appliquée
- Tests finaux et validation (5 min)
  - Build propre
  - Lancement fonctionnel
  - Vérification de la documentation

**Livrable :** Projet complet et documenté

## 6. Critères de Succès

### 6.1 Critères Techniques (Obligatoires)

- [ ] **Image Docker fonctionnelle**
  - Build sans erreur
  - Application accessible sur port 3000
  - Toutes les fonctionnalités opérationnelles

- [ ] **Optimisation**
  - Taille de l'image < 150 MB
  - Multi-stage build implémenté
  - Layer caching optimisé
  - Temps de démarrage < 10 secondes

- [ ] **Sécurité**
  - 0 vulnérabilité critique
  - Maximum 3 vulnérabilités hautes
  - Utilisateur non-root configuré
  - Pas de secrets exposés
  - Hadolint sans erreur

- [ ] **Docker Compose**
  - Configuration fonctionnelle
  - Health checks actifs
  - Variables d'environnement externalisées

- [ ] **Documentation**
  - README.md mis à jour
  - docs/DOCKER.md créé
  - docs/SECURITY.md créé
  - Commandes documentées

### 6.2 Critères Qualité (Recommandés)

- [ ] Code Dockerfile propre et commenté
- [ ] Labels de métadonnées présents
- [ ] Scripts d'aide créés (build.sh, scan.sh)
- [ ] Rapport comparatif avant/après optimisation
- [ ] Health check pertinent et fonctionnel

## 7. Grille d'Évaluation (100 points)

### Dockerisation (30 points)
- Dockerfile multi-stage fonctionnel (15 pts)
- Docker Compose configuré correctement (10 pts)
- .dockerignore approprié (5 pts)

### Optimisation (25 points)
- Taille de l'image < 150 MB (10 pts)
- Layer caching optimisé (5 pts)
- Bonnes pratiques d'optimisation (5 pts)
- Métriques documentées (5 pts)

### Sécurité (30 points)
- Scan Trivy : 0 vulnérabilité critique (15 pts)
- Hadolint : pas d'erreur (5 pts)
- Utilisateur non-root (5 pts)
- Gestion des secrets (5 pts)

### Documentation (15 points)
- README.md mis à jour (5 pts)
- docs/DOCKER.md complet (5 pts)
- docs/SECURITY.md avec rapport (5 pts)

### Bonus (max 10 points)
- Scripts d'automatisation (+3 pts)
- Optimisation avancée (< 100 MB) (+3 pts)
- Tests automatisés (+2 pts)
- Documentation exemplaire (+2 pts)

## 8. Ressources et Outils

### 8.1 Documentation Officielle
- [Docker Documentation](https://docs.docker.com/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Docker Security](https://docs.docker.com/engine/security/)

### 8.2 Outils Requis
- Docker Desktop / Docker Engine (20.10+)
- Docker Compose (2.0+)
- Trivy (scanner de vulnérabilités)
- Hadolint (linter Dockerfile)

### 8.3 Installation des Outils

**macOS :**
```bash
# Docker Desktop (inclut Docker et Docker Compose)
# Télécharger depuis https://www.docker.com/products/docker-desktop

# Trivy
brew install trivy

# Hadolint
brew install hadolint
```

**Linux (Ubuntu/Debian) :**
```bash
# Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose
sudo apt-get install docker-compose-plugin

# Trivy
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy

# Hadolint
sudo wget -O /usr/local/bin/hadolint https://github.com/hadolint/hadolint/releases/latest/download/hadolint-Linux-x86_64
sudo chmod +x /usr/local/bin/hadolint
```

## 9. Commandes Utiles

### Build et Run
```bash
# Build de l'image
docker build -t nodejs-todo-app:latest .

# Run simple
docker run -d -p 3000:3000 --name todo nodejs-todo-app:latest

# Run avec variables d'environnement
docker run -d -p 3000:3000 -e NODE_ENV=production --name todo nodejs-todo-app:latest

# Docker Compose
docker-compose up -d
docker-compose down
docker-compose logs -f
```

### Inspection et Debug
```bash
# Voir les images
docker images

# Historique des layers
docker history nodejs-todo-app:latest

# Inspection détaillée
docker inspect nodejs-todo-app:latest

# Logs du container
docker logs todo

# Shell dans le container
docker exec -it todo sh

# Stats en temps réel
docker stats todo
```

### Nettoyage
```bash
# Arrêt et suppression du container
docker stop todo && docker rm todo

# Suppression de l'image
docker rmi nodejs-todo-app:latest

# Nettoyage complet
docker system prune -a
```

### Sécurité
```bash
# Scan Trivy
trivy image nodejs-todo-app:latest

# Scan avec sortie JSON
trivy image -f json -o report.json nodejs-todo-app:latest

# Lint Dockerfile
hadolint Dockerfile

# Scan des secrets (avec gitleaks si installé)
gitleaks detect --source . -v
```

## 10. Conseils et Astuces

### 10.1 Pour l'Optimisation
- Commencez par un Dockerfile simple, optimisez ensuite
- Mesurez avant et après chaque optimisation
- Utilisez `docker build --no-cache` pour tester sans cache
- Comparez avec `docker images` après chaque build

### 10.2 Pour la Sécurité
- Scannez régulièrement pendant le développement
- Ne négligez pas les vulnérabilités moyennes
- Lisez attentivement les rapports Trivy
- Documentez les vulnérabilités non corrigées avec justification

### 10.3 Pour Gagner du Temps
- Utilisez le cache Docker intelligemment
- Testez fréquemment (ne pas attendre la fin)
- Gardez une version de travail avant d'optimiser
- Automatisez avec des scripts bash

## 11. Livrables Finaux

À la fin du projet, vous devez avoir :

- ✅ **Dockerfile** multi-stage optimisé et fonctionnel
- ✅ **docker-compose.yml** configuré correctement
- ✅ **.dockerignore** avec exclusions appropriées
- ✅ **docs/DOCKER.md** avec documentation technique
- ✅ **docs/SECURITY.md** avec rapport de sécurité
- ✅ **README.md** mis à jour avec section Docker
- ✅ Image Docker < 150 MB avec 0 vulnérabilité critique
- ✅ Application fonctionnelle et testée
- ✅ Rapport de métriques (avant/après)

## 12. Critères de Validation Finale

Avant de considérer le projet terminé, vérifiez :

- [ ] `docker build -t nodejs-todo-app .` → Succès
- [ ] `docker run -d -p 3000:3000 nodejs-todo-app` → Succès
- [ ] `curl http://localhost:3000` → Réponse 200 OK
- [ ] `docker images nodejs-todo-app` → Taille < 150 MB
- [ ] `trivy image nodejs-todo-app` → 0 critique
- [ ] `hadolint Dockerfile` → Pas d'erreur
- [ ] `docker-compose up` → Démarrage sans erreur
- [ ] Documentation complète et lisible
- [ ] Tous les fichiers committés et pushés

---

**Date de création** : 2025-12-18
**Version** : 2.0 (Simplifiée - 7 heures)
**Focus** : Dockerisation, Optimisation, Sécurité
**Statut** : ⏳ Prêt à démarrer
