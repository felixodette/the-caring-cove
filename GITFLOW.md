# GitFlow Workflow

## Branch Strategy

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `main` | Production-ready code | thecaringcove.co.ke |
| `develop` | Integration / staging | dev.thecaringcove.co.ke |

## Workflow

### Daily Development
1. Create feature branches from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. Work on your feature, commit changes:
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

3. Push and merge when ready:
   ```bash
   git push -u origin feature/your-feature-name
   # Create PR on GitHub: feature/your-feature-name → develop
   # Or merge locally:
   git checkout develop
   git merge feature/your-feature-name
   git push origin develop
   ```

4. **Deploy to dev**: Pushing to `develop` triggers deployment to dev.thecaringcove.co.ke (via cPanel deploy).

### Releasing to Production
1. When `develop` is ready for release:
   ```bash
   git checkout main
   git pull origin main
   git merge develop
   git push origin main
   ```

2. **Deploy to production**: Pushing to `main` triggers deployment to thecaringcove.co.ke (via cPanel deploy).

### Hotfixes (Production Bugs)
1. Create hotfix from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/bug-description
   ```

2. Fix, commit, merge to both:
   ```bash
   git add .
   git commit -m "fix: resolve production bug"
   git checkout main
   git merge hotfix/bug-description
   git push origin main

   git checkout develop
   git merge hotfix/bug-description
   git push origin develop
   ```

## Quick Reference

```bash
# Start new feature
git checkout develop && git pull origin develop
git checkout -b feature/my-feature

# Deploy to dev (push develop)
git push origin develop

# Deploy to production (merge develop → main, then push)
git checkout main && git merge develop && git push origin main
```
