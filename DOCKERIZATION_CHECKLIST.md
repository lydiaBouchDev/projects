# Checklist de Dockerisation - Todo App Node.js

## 📋 Phase 1 : Dockerisation de Base

### Dockerfile
- [ ] Créer un Dockerfile multi-stage
- [ ] Utiliser node:20-alpine comme image de base
- [ ] Stage 1 : Build (installation et build)
- [ ] Stage 2 : Production (uniquement ce qui est nécessaire)
- [ ] Configurer USER node (non-root)
- [ ] Exposer le port 3000
- [ ] Ajouter HEALTHCHECK

### Docker Compose
- [ ] Créer docker-compose.yml
- [ ] Configurer le service app
- [ ] Définir les variables d'environnement
- [ ] Configurer les volumes si nécessaire
- [ ] Ajouter les health checks
- [ ] Configurer le réseau Docker

### Configuration
- [ ] Créer .dockerignore
- [ ] Créer .env.example
- [ ] Documenter les variables d'environnement

### Tests Locaux
- [ ] Build de l'image : `docker build -t todo-app .`
- [ ] Run du container : `docker run -p 3000:3000 todo-app`
- [ ] Test de l'application dans le navigateur
- [ ] Vérifier docker-compose : `docker-compose up`

## 🔒 Phase 2 : Sécurité

### Scan de Vulnérabilités
- [ ] Installer Trivy : `brew install trivy` ou équivalent
- [ ] Scanner l'image : `trivy image todo-app:latest`
- [ ] Corriger les vulnérabilités critiques
- [ ] Générer un rapport de sécurité

### Dockerfile Security
- [ ] Linting avec Hadolint : `hadolint Dockerfile`
- [ ] Vérifier pas de secrets hardcodés
- [ ] Utiliser une image de base récente et maintenue
- [ ] Minimiser le nombre de layers
- [ ] Supprimer les caches et fichiers temporaires

### Bonnes Pratiques
- [ ] Utiliser USER non-root
- [ ] Limiter les capabilities
- [ ] Configurer read-only filesystem si possible
- [ ] Ajouter --no-install-recommends pour apt
- [ ] Vérifier les permissions des fichiers

### Gestion des Secrets
- [ ] Pas de .env dans l'image
- [ ] Utiliser Docker secrets ou env vars
- [ ] Documenter toutes les variables requises
- [ ] Configurer .gitignore pour les secrets

## 🔄 Phase 3 : Intégration Continue (CI)

### Workflow CI (ci.yml)
- [ ] Créer `.github/workflows/ci.yml`
- [ ] Configurer les triggers (push, pull_request)
- [ ] Job : Lint du code avec ESLint
- [ ] Job : Lint du Dockerfile avec Hadolint
- [ ] Job : Build de l'image Docker
- [ ] Job : Tests unitaires (si applicable)
- [ ] Job : Scan de sécurité avec Trivy
- [ ] Configurer le cache des layers Docker

### Workflow Security (security.yml)
- [ ] Créer `.github/workflows/security.yml`
- [ ] Scan quotidien des vulnérabilités
- [ ] Vérification des dépendances npm audit
- [ ] Scan des secrets exposés (gitleaks)
- [ ] Rapport de conformité

### Configuration GitHub
- [ ] Ajouter secrets GitHub nécessaires
- [ ] Configurer les notifications
- [ ] Ajouter les badges dans README.md
- [ ] Configurer branch protection rules

## 🚀 Phase 4 : Déploiement Continu (CD)

### Registre d'Images
- [ ] Choisir un registre (Docker Hub / GHCR)
- [ ] Créer un compte si nécessaire
- [ ] Configurer les credentials dans GitHub Secrets
- [ ] Tester le push d'image manuellement

### Workflow CD (cd.yml)
- [ ] Créer `.github/workflows/cd.yml`
- [ ] Trigger sur push vers main
- [ ] Build de l'image de production
- [ ] Tag avec version sémantique
- [ ] Push vers le registre
- [ ] Créer une release GitHub

### Déploiement
- [ ] Choisir la plateforme de déploiement
- [ ] Configurer les credentials de déploiement
- [ ] Implémenter le déploiement automatique
- [ ] Configurer les health checks
- [ ] Tester le rollback

### Versioning
- [ ] Implémenter le versioning sémantique
- [ ] Tagger les releases
- [ ] Générer des release notes
- [ ] Documenter le processus de release

## 📚 Phase 5 : Documentation

### Documentation Technique
- [ ] Mettre à jour README.md principal
- [ ] Ajouter section "Démarrage avec Docker"
- [ ] Créer docs/ARCHITECTURE.md
- [ ] Créer docs/DEPLOYMENT.md
- [ ] Créer docs/SECURITY.md
- [ ] Ajouter diagrammes si nécessaire

### Documentation CI/CD
- [ ] Documenter les workflows GitHub Actions
- [ ] Lister les secrets requis
- [ ] Expliquer le processus de déploiement
- [ ] Documenter la procédure de rollback

### Guides
- [ ] Guide de démarrage rapide
- [ ] Guide de contribution
- [ ] Guide de dépannage (troubleshooting)
- [ ] FAQ

### Badges
- [ ] Badge du build status
- [ ] Badge de la sécurité
- [ ] Badge de la version
- [ ] Badge de la license

## 🧪 Phase 6 : Tests et Validation

### Tests de l'Image Docker
- [ ] Test de build : image se construit sans erreur
- [ ] Test de taille : image < 200 MB
- [ ] Test de démarrage : container démarre en < 10 sec
- [ ] Test fonctionnel : application accessible
- [ ] Test de santé : health check passe

### Tests CI/CD
- [ ] Pipeline CI s'exécute complètement
- [ ] Tous les jobs passent au vert
- [ ] Temps d'exécution < 5 minutes
- [ ] Cache fonctionne correctement
- [ ] Notifications arrivent

### Tests de Sécurité
- [ ] Scan Trivy : 0 vulnérabilité critique
- [ ] Hadolint : pas d'erreur
- [ ] Npm audit : pas de vulnérabilité haute
- [ ] Pas de secrets exposés

### Tests de Déploiement
- [ ] Déploiement automatique fonctionne
- [ ] Image taguée correctement
- [ ] Application accessible après déploiement
- [ ] Rollback fonctionne
- [ ] Logs accessibles

## 📊 Métriques à Vérifier

### Performance
- [ ] Taille de l'image finale : ______ MB (objectif < 200 MB)
- [ ] Temps de build : ______ min (objectif < 2 min)
- [ ] Temps de démarrage : ______ sec (objectif < 10 sec)
- [ ] Mémoire utilisée : ______ MB (objectif < 256 MB)

### CI/CD
- [ ] Temps du pipeline CI : ______ min (objectif < 5 min)
- [ ] Temps du pipeline CD : ______ min (objectif < 3 min)
- [ ] Taux de succès : ______ % (objectif > 95%)

### Sécurité
- [ ] Vulnérabilités critiques : ______ (objectif = 0)
- [ ] Vulnérabilités hautes : ______ (objectif < 3)
- [ ] Vulnérabilités moyennes : ______ (objectif < 5)
- [ ] Score de sécurité : ______ /100 (objectif > 80)

## 🎯 Validation Finale

### Checklist de Livraison
- [ ] Tous les fichiers requis créés
- [ ] Documentation complète et à jour
- [ ] Tous les tests passent
- [ ] Pipeline CI/CD fonctionnel
- [ ] Application déployée et accessible
- [ ] Rapport de sécurité généré
- [ ] Code review effectué
- [ ] Branch mergée dans main

### Démonstration
- [ ] Build local de l'image Docker
- [ ] Exécution avec Docker Compose
- [ ] Démonstration du pipeline CI
- [ ] Démonstration du pipeline CD
- [ ] Présentation des métriques
- [ ] Revue du rapport de sécurité

### Livrables Finaux
- [ ] Repository GitHub complet
- [ ] Image Docker publiée sur registre
- [ ] Documentation complète
- [ ] Rapport de projet
- [ ] Présentation (slides optionnel)

---

## 🔧 Commandes Utiles

### Docker
```bash
# Build de l'image
docker build -t todo-app:latest .

# Run du container
docker run -d -p 3000:3000 --name todo todo-app:latest

# Logs
docker logs todo

# Inspection
docker inspect todo

# Arrêt et suppression
docker stop todo && docker rm todo

# Scan de sécurité
trivy image todo-app:latest

# Lint du Dockerfile
hadolint Dockerfile
```

### Docker Compose
```bash
# Démarrage
docker-compose up -d

# Logs
docker-compose logs -f

# Arrêt
docker-compose down

# Rebuild
docker-compose up -d --build
```

### GitHub Actions
```bash
# Test local des workflows (avec act)
act -l                          # Liste les jobs
act push                        # Simule un push
act -j build                    # Exécute un job spécifique
```

### Git
```bash
# Tag de version
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Commit et push
git add .
git commit -m "feat: add Docker support"
git push origin main
```

---

**Date de création** : 2025-12-18
**Dernière mise à jour** : 2025-12-18
**Statut** : ⏳ En attente
