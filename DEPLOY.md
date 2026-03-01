# Continental Galaxy Roleplay - Deployment Guide

## 🚀 Railway Deploy (Ajánlott)

### 1. GitHub Repository létrehozása
1. Menj a [GitHub.com](https://github.com)
2. Kattints "+" → "New repository"
3. Név: `continental-galaxy-role`
4. "Create repository" (ne adj hozzá README-t)
5. Kövesd az "or push an existing existing repository" utasításokat

### 2. Railway Projekt létrehozása
1. Menj a [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Válaszd ki a `continental-galaxy-role` repository-t

### 3. PostgreSQL hozzáadása
A Railway projektben:
1. Click "New" → "Database" → "PostgreSQL"
2. Wait for it to provision

### 4. Deploy
1. Click "Deploy"
2. Várj amíg le nem fut a build
3. Click the generated URL

## 📋 Environment Variables

A Railway automatikusan beállítja:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - 3000 (Railway default)

## 🔧 Alternatív: Helyi futtatás

```bash
# Telepítés
npm install

# Adatbázis séma push
npm run db:push

# Fejlesztési mód
npm run dev

# Production build
npm run build
npm start
```

## 🌐 Domain beállítás

Railway után:
1. Railway project → Settings → Domains
2. Add custom domain (pl. continentalrp.com)
3. Kövesd a DNS beállításokat

## 📁 Fájlok

- `railway.json` - Railway konfiguráció
- `.replit` - Replit konfiguráció
- `vercel.json` - Vercel konfiguráció (frontend only)

## ✅ Ellenőrzés

Deployment után teszteld:
- `/` - Főoldal
- `/api/rules` - Szabályok API
- `/api/staff` - Staff API
