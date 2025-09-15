# 🧘‍♀️ Spa Booking - Application de Réservation Spa

Une application web moderne pour la réservation de services de spa et bien-être.

## ✨ Fonctionnalités

- **Interface utilisateur moderne** - Design responsive avec gradient élégant
- **Réservation en temps réel** - Système de créneaux horaires dynamiques
- **Gestion des services** - Massage, soins du visage, enveloppements, manucure
- **Validation complète** - Vérification des disponibilités et données
- **Stockage local** - Sauvegarde des réservations dans le navigateur
- **Confirmation visuelle** - Modal de confirmation avec tous les détails

## 🚀 Déploiement

### Déploiement automatique

Cette application est prête pour le déploiement sur plusieurs plateformes :

#### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement la configuration
3. L'application sera déployée instantanément

#### Netlify
1. Connectez votre repository à Netlify
2. La configuration netlify.toml est incluse
3. Déploiement automatique à chaque push

#### GitHub Pages
1. Activez GitHub Pages dans les paramètres du repository
2. Sélectionnez la branche main comme source
3. L'application sera accessible via GitHub Pages

### Développement local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Aperçu de la version de production
npm run preview
```

## 📁 Structure du projet

```
spa-booking/
├── index.html          # Page principale
├── src/
│   ├── styles.css      # Styles CSS
│   └── app.js          # Logique JavaScript
├── package.json        # Configuration npm
├── vite.config.js      # Configuration Vite
├── vercel.json         # Configuration Vercel
├── netlify.toml        # Configuration Netlify
└── README.md           # Documentation
```

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Build Tool** : Vite
- **Styling** : CSS Grid, Flexbox, Gradients
- **Fonts** : Google Fonts (Inter)
- **Icons** : Unicode Emojis

## 💻 Fonctionnement

1. **Navigation** - Système de navigation par onglets
2. **Sélection de service** - Choix parmi 4 services disponibles
3. **Réservation** - Formulaire avec validation complète
4. **Confirmation** - Modal avec résumé de la réservation
5. **Persistance** - Stockage local des réservations

## 🎨 Design

- **Palette de couleurs** : Gradient violet-bleu (#667eea → #764ba2)
- **Typography** : Inter (Google Fonts)
- **Responsive** : Mobile-first avec breakpoints
- **Animations** : Transitions CSS fluides

## 📱 Responsive

L'application s'adapte automatiquement aux différentes tailles d'écran :
- **Desktop** : Layout complet avec grille
- **Tablet** : Layout adaptatif
- **Mobile** : Interface optimisée tactile

## 🔧 Configuration

L'application fonctionne sans configuration supplémentaire. Les créneaux horaires sont générés de 9h à 18h avec des intervalles de 30 minutes.

## 📞 Support

Pour toute question ou support, contactez-nous à contact@spawellness.fr

---

Créé avec ❤️ pour offrir une expérience de réservation spa exceptionnelle.