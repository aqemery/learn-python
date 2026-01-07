# Deployment Guide

This guide covers deploying the Learn Python course to GitHub Pages.

## GitHub Pages Setup

### Initial Setup

1. **Push your repository to GitHub** (if not already done):
   ```bash
   git remote add origin https://github.com/yourusername/learn-python.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - Click Save

3. **Configure base path** (if using a project page, not username.github.io):

   Edit `next.config.mjs` and uncomment these lines, replacing with your repo name:
   ```javascript
   basePath: '/learn-python',
   assetPrefix: '/learn-python/',
   ```

   If deploying to `username.github.io` (user/org page), you can skip this step.

4. **Update package.json repository URL**:
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/yourusername/learn-python.git"
   }
   ```

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
- Triggers on every push to `main` branch
- Builds the Next.js static site
- Deploys to GitHub Pages

**To deploy:**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Wait a few minutes and visit: `https://yourusername.github.io/learn-python/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the site
npm run build

# The output is in the 'out' directory
# You can test it locally with:
npx serve out

# Deploy using gh-pages or manually upload to your hosting
```

## Custom Domain (Optional)

To use a custom domain like `learn-python.example.com`:

1. **Add a CNAME record** in your DNS provider:
   - Type: CNAME
   - Name: learn-python (or @ for root domain)
   - Value: yourusername.github.io

2. **Configure in GitHub**:
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain
   - Check "Enforce HTTPS"

3. **Update next.config.mjs**:
   ```javascript
   // Remove basePath and assetPrefix for custom domain
   const nextConfig = {
     // ... other config
     // basePath: '',  // Not needed for custom domain
     // assetPrefix: '',
   }
   ```

## Environment Variables

If you need environment variables in production:

1. **Add to GitHub Secrets**:
   - Go to Settings → Secrets and variables → Actions
   - Add your secrets (e.g., `NEXT_PUBLIC_ALGOLIA_API_KEY`)

2. **Reference in workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   - name: Build with Next.js
     run: npm run build
     env:
       NEXT_PUBLIC_ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
   ```

## Troubleshooting

### Build Fails

Check the Actions tab on GitHub to see the error. Common issues:

- **Missing dependencies**: Make sure `package-lock.json` is committed
- **Build errors**: Test locally with `npm run build` first
- **Node version**: Workflow uses Node 18, match locally

### 404 on GitHub Pages

- Verify Pages is enabled in Settings
- Check that workflow completed successfully
- Ensure basePath matches your repository name
- Wait a few minutes for DNS propagation

### Assets Not Loading

- Verify `basePath` and `assetPrefix` are set correctly
- Check browser console for errors
- Ensure `.nojekyll` file exists in root

### Changes Not Appearing

- Clear browser cache
- Verify latest commit is in `main` branch
- Check Actions tab to see if deployment completed
- GitHub Pages can take a few minutes to update

## Alternative Hosting

This project can be deployed to other platforms:

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the 'out' folder to Netlify
```

### Custom Server
```bash
npm run build
# Serve the 'out' folder with any static file server
```

## Monitoring

After deployment, check:
- All pages load correctly
- Navigation works
- Code editor functions properly
- No console errors
- Mobile responsiveness

Visit these URLs to test:
- Homepage: `https://yourusername.github.io/learn-python/`
- Lessons: `/basics`, `/control_flow`, `/functions`, etc.
- Check that Pyodide loads and code execution works

## Updates and Maintenance

To update the live site:
1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to `main`
4. Workflow auto-deploys

The GitHub Actions workflow ensures every push is automatically deployed!
