// Ajustements du projet Android généré par Capacitor : autorisations GPS,
// icônes, écran de lancement, numéro de version.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const app = path.join(root, 'android', 'app');
const main = path.join(app, 'src', 'main');
const edit = (file, fn) => { const p = path.join(main, file); fs.writeFileSync(p, fn(fs.readFileSync(p, 'utf8'))); };

// 1. Autorisations : GPS précis, service au premier plan (tracé écran éteint), notification.
const perms = [
  'android.permission.ACCESS_COARSE_LOCATION',
  'android.permission.ACCESS_FINE_LOCATION',
  'android.permission.FOREGROUND_SERVICE',
  'android.permission.FOREGROUND_SERVICE_LOCATION',
  'android.permission.POST_NOTIFICATIONS',
  'android.permission.WAKE_LOCK'
];
edit('AndroidManifest.xml', s => {
  const add = perms.filter(p => !s.includes(`"${p}"`)).map(p => `    <uses-permission android:name="${p}" />`);
  add.push('    <uses-feature android:name="android.hardware.location.gps" android:required="false" />');
  return s.replace(/(\s*)<application/, `\n${add.join('\n')}$1<application`);
});

// 2. Nom du canal de notification du suivi GPS.
edit(path.join('res', 'values', 'strings.xml'), s => s.includes('capacitor_background_geolocation_notification_channel_name') ? s
  : s.replace('</resources>', '    <string name="capacitor_background_geolocation_notification_channel_name">Suivi GPS</string>\n</resources>'));

// 3. Écran de lancement : fond uni aux couleurs de l'appli (pas le logo Capacitor).
edit(path.join('res', 'values', 'styles.xml'), s => s.replace(/@drawable\/splash/g, '@color/ic_launcher_background'));

// 4. Icônes PK Terrain.
fs.cpSync(path.join(root, 'res'), path.join(main, 'res'), { recursive: true, force: true });

// 5. Version : versionName = version de l'appli, versionCode = numéro de fabrication.
const name = process.env.APP_VERSION || '1.0', code = parseInt(process.env.BUILD_NUMBER || '1', 10);
const gradle = path.join(app, 'build.gradle');
let g = fs.readFileSync(gradle, 'utf8');
g = g.replace(/versionCode\s+\d+/, `versionCode ${code}`).replace(/versionName\s+"[^"]*"/, `versionName "${name}"`);
fs.writeFileSync(gradle, g);

console.log(`Projet Android ajusté : version ${name} (${code}).`);
