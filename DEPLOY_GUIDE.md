# Deployment Guide - GitHub Pages

Follow these steps to make your site live on GitHub:

## 1. Create a GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository.
2. Name it (e.g., `make-content-landing`).
3. **Do not** initialize it with a README, license, or gitignore (since your project already has them).

## 2. Link Local Project to GitHub
Open your terminal in the project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initialize project for deployment"

# Add the remote repository (Replace <username> and <repo-name> with yours)
git remote add origin https://github.com/<username>/<repo-name>.git

# Push your code
git branch -M main
git push -u origin main
```

## 3. Deploy
Run the following command to build and publish your site:

```bash
npm run deploy
```

## 4. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages**.
3. Under **Build and deployment**, ensure the **Source** is set to "Deploy from a branch".
4. Select the `gh-pages` branch and the `/ (root)` folder.
5. Save.

After a few minutes, your site will be live at `https://<username>.github.io/<repo-name>/`.

---

**Note:** If you are using a custom domain, you can set it in the GitHub Pages settings.
