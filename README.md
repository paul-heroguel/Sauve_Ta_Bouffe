<p align="center">
  <img src="image/logo.png" alt="Logo SauveTaBouffe" width="120">
</p>

<h1 align="center">SauveTaBouffe</h1>

<p align="center">
  Site web de lutte contre le gaspillage alimentaire dans le Nord-Pas-de-Calais.<br>
  <i>A website fighting food waste in northern France.</i>
</p>

<p align="center">
  <a href="https://heroguelp-collab.github.io/Sauve_Ta_Bouffe/"><b>🌐 Voir le site en ligne · Live demo</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
</p>

---

## 🇫🇷 Présentation

SauveTaBouffe récupère les invendus des supermarchés et commerces locaux, les stocke
dans ses entrepôts, puis les revend sous forme de paniers à prix réduits.
Ce site vitrine et de réservation permet aux utilisateurs de choisir un panier,
de le réserver et de suivre leurs commandes.

### Fonctionnalités

- 🧺 **Paniers anti-gaspi** : Solo, Duo et Familial, avec ajout au panier
- 🛒 **Panier d'achat** avec compteur dans la barre de navigation
- 📅 **Réservation** d'un retrait avec génération d'un **QR code**
- 📦 **Suivi des commandes** (statut et étapes) et **facture téléchargeable**
- 👤 **Espace compte** : inscription et connexion
- 🌍 Pages disponibles en **français et en anglais**
- 📱 **Responsive** avec menu mobile

> Les données (compte, panier, réservations) sont stockées dans le navigateur
> via `localStorage` : aucun serveur n'est nécessaire.

### Lancer le projet

Aucune installation : clonez le dépôt et ouvrez `index.html` dans un navigateur.

```bash
git clone https://github.com/heroguelp-collab/Sauve_Ta_Bouffe.git
cd Sauve_Ta_Bouffe
open index.html   # ou double-cliquez sur le fichier
```

### Structure

```
├── index.html            Accueil
├── about.html            À propos
├── prestations.html      Fonctionnement, paniers, avis, FAQ
├── reservation.html      Réservation d'un retrait
├── panier.html           Panier d'achat
├── compte.html           Inscription / connexion
├── mes-commandes.html    Suivi des commandes et factures
├── equipe.html           L'équipe
├── contact.html          Contact
├── *-en.html             Versions anglaises
├── app.js                Logique commune (navigation, panier, commandes)
├── style.css             Styles
└── image/                Logos, photos et médias
```

---

## 🇬🇧 Overview

SauveTaBouffe collects unsold food from supermarkets and local shops and resells it
as discounted baskets. Users can pick a basket, book a pickup with a QR code,
track their orders and download invoices. Built with plain HTML, CSS and JavaScript,
with data stored in the browser (`localStorage`). Just open `index.html` to run it.

---

## 👥 Équipe · Team

| | Rôle |
|---|---|
| **Loïc** | Co-fondateur & Logistique |
| **Paul Heroguel** | Co-fondateur & Développeur |
| **Valentin** | Co-fondateur & Design |
