# Portfolio d'Omar Ouchchen

Site personnel en français et en anglais : React, TypeScript, Vite, Tailwind CSS.

## Lancer en local

```bash
npm install
npm run dev
```

## Modifier le contenu

Tout le texte est dans `src/content.ts`, une version `fr` et une version `en`. Chaque phrase vient du CV ou du README du profil GitHub : garder cette règle, ne rien ajouter qui n'y soit pas.

- Photo : `public/omar.jpg` (extraite du CV).
- CV téléchargeables : `public/CV-Omar-Ouchchen-FR.pdf` et `public/CV-Omar-Ouchchen-EN.pdf`, sans numéro de téléphone. Ils sont produits à partir des CV avec photo de `Desktop\01_Emploi\CV` par `tools/strip_phone.py`, qui supprime le numéro, recentre la ligne de contact et décale les liens (copies dans `01_Emploi\CV\*_Web.pdf`). Après toute mise à jour d'un CV, relancer le script (`pip install pymupdf`, puis `python tools/strip_phone.py <cv source> public/<nom>.pdf`).

## Mise en ligne

Le site est publié sur https://ouchchenomar.github.io/ depuis le dépôt `ouchchenomar/ouchchenomar.github.io`. Chaque push sur `main` lance `.github/workflows/deploy.yml`, qui construit le site avec Vite et le publie sur GitHub Pages (Settings > Pages > Source : GitHub Actions).

Pour publier depuis un dépôt avec un autre nom (par exemple `portfolio`), créer dans ce dépôt la variable Actions `BASE_PATH` avec la valeur `/portfolio/` : les chemins vers la photo et les CV suivent la base.

L'ancien site (HTML, avec l'étude de cas Onbor et les certifications) reste dans l'historique Git du dépôt et en copie locale dans `Desktop\portfolio\ancien-site`.

## Avant de publier

- Vérifier que les CV de `public/` sont bien les versions sans numéro (voir plus haut).
- Les liens vers GitHub (profil et trois dépôts, dont `counterparty-data-platform`, public depuis le 9 novembre 2026) répondaient tous à cette date.
