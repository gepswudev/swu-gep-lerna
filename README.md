

#  SWU-GEP

This repository is contain SWU-GEP and structured in monorepo with lerna for development.
- Client made with Svelte and Tailwindcss.
- Server made with Express.js with MongoDB.
  
##  To run this projects
**Project Structure**
```
Lerna-workspace/
├ node_modules/
├ packages/
├ lerna.json
├ package.json
├ .git (optional)
└ .gitignore (optional)
```

**PNPM Install**
  
We recommend you to use [PNPM](https://pnpm.io/installation) instead of NPM.
- **On Windows**
-- Using PowerShell `
iwr https://get.pnpm.io/install.ps1 -useb | iex`
-- Using winget `winget install pnpm`
-- Using NPM `npm install -g pnpm`
- **On Linux**
-- Using Bash `wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
`
-- Using NPM `npm install -g pnpm`

**Lerna Install**
- Install Lerna globally `pnpm add -g lerna`
- Run development mode `lerna run dev`

**For production**
- Please follow each package instruction

##  Contributor
- [arnonsang](https://github.com/arnonsang)
- [TakatoraSama](https://github.com/TakatoraSama)
  
##  Recommended IDE Setup
  
[VS Code](https://code.visualstudio.com/) + [Svelte Externsion](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

  
