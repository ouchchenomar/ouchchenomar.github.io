// Publie le site sur GitHub Pages sans GitHub Actions.
//
// Le code source vit sur la branche `source`. GitHub Pages sert la racine de la
// branche `main` (Settings > Pages > Deploy from a branch > main / root).
// Ce script construit le site, puis remplace le contenu de `main` par `dist/`
// et pousse un commit. Lancer : `npm run deploy` depuis la branche `source`.
import { execSync } from 'node:child_process'
import { cpSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const run = (cmd, cwd) => execSync(cmd, { stdio: 'inherit', cwd })
const out = (cmd, cwd) => execSync(cmd, { encoding: 'utf8', cwd }).trim()

const branch = out('git rev-parse --abbrev-ref HEAD')
if (branch !== 'source') {
  throw new Error(`Lancer depuis la branche source (branche actuelle : ${branch}).`)
}
if (out('git status --porcelain')) {
  throw new Error('Des modifications ne sont pas commitées : committer sur source avant de publier.')
}
const sha = out('git rev-parse --short HEAD')

run('npm run build')
// Sans ce fichier, GitHub Pages passe le site dans Jekyll, inutile ici.
writeFileSync(join('dist', '.nojekyll'), '')

const dir = mkdtempSync(join(tmpdir(), 'portfolio-main-'))
run('git fetch origin main')
run(`git worktree add --detach "${dir}" origin/main`)
try {
  for (const entry of readdirSync(dir)) {
    if (entry !== '.git') rmSync(join(dir, entry), { recursive: true, force: true })
  }
  cpSync('dist', dir, { recursive: true })
  run('git add -A', dir)
  if (!out('git status --porcelain', dir)) {
    console.log('Rien de nouveau à publier.')
  } else {
    const trailer = process.env.COMMIT_TRAILER ? `\n\n${process.env.COMMIT_TRAILER}` : ''
    writeFileSync(join(dir, '..', 'portfolio-deploy-msg.txt'), `Publier le site (source ${sha})${trailer}\n`)
    run(`git commit -q -F "${join(dir, '..', 'portfolio-deploy-msg.txt')}"`, dir)
    run('git push origin HEAD:main', dir)
    console.log(`Publié : https://ouchchenomar.github.io/ (source ${sha}). GitHub Pages met une à deux minutes à se mettre à jour.`)
  }
} finally {
  run(`git worktree remove --force "${dir}"`)
}
