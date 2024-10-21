# Étape 1 : Construire l'application avec Node.js et Vite
FROM node:18-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source de l'application
COPY . .

# Construire l'application avec Vite
RUN npm run build

# Étape 2 : Servir l'application avec un serveur léger (nginx)
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration Nginx personnalisée pour servir l'application avec réécriture des URL (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour le serveur Nginx
EXPOSE 80

# Démarrer Nginx lorsque le conteneur démarre
CMD ["nginx", "-g", "daemon off;"]
