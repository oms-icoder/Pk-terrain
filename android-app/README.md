# PK Terrain — app Android

L'appli est la même que le site : `index.html` à la racine du dépôt.
Ce dossier l'emballe en app Android avec Capacitor, pour que le GPS continue
d'enregistrer le tracé écran éteint.

- **Fabrication** : automatique sur GitHub (onglet *Actions*, « App Android ») à chaque
  modification de `index.html`. L'APK signé est publié dans *Releases*.
- **Téléchargement** : https://github.com/oms-icoder/Pk-terrain/releases/latest/download/PK-Terrain.apk
- **Signature** : clé `pk-terrain.keystore` (alias `pkterrain`). Son mot de passe est dans le
  secret GitHub `ANDROID_KEYSTORE_PASSWORD`. Ne jamais changer de clé : sinon les mises à jour
  ne s'installent plus par-dessus l'ancienne version.
- **Nouvelle version** : augmenter `APP_VERSION` dans `index.html` ; l'app prévient les
  utilisateurs qu'une mise à jour est disponible.
