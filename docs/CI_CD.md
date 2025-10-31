# CI/CD Pipeline Documentation

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Todo List application.

## 📋 Table of Contents

- [Overview](#overview)
- [Pipeline Architecture](#pipeline-architecture)
- [Workflows](#workflows)
- [Pipeline Jobs](#pipeline-jobs)
- [Caching Strategy](#caching-strategy)
- [Secrets and Environment Variables](#secrets-and-environment-variables)
- [Deployment Strategy](#deployment-strategy)
- [Monitoring and Notifications](#monitoring-and-notifications)
- [Troubleshooting](#troubleshooting)

---

## Overview

The CI/CD pipeline is implemented using **GitHub Actions** and provides automated building, testing, and deployment for both frontend and backend components.

### Key Features

- ✅ **Multi-Platform Testing**: Tests on macOS, Windows, and Ubuntu
- ✅ **Automated Testing**: Runs unit and integration tests
- ✅ **Dependency Caching**: Speeds up builds with Maven and npm caching
- ✅ **Build Artifacts**: Generates production-ready artifacts
- ✅ **Docker Integration**: Builds and publishes Docker images
- ✅ **Parallel Execution**: Backend and frontend jobs run concurrently

### Pipeline Triggers

The pipeline is triggered on:
- Push to `dev` branch (Main CI/CD pipeline)
- Push to `main` branch (Publish workflow)
- Pull requests to `main` branch
- Manual workflow dispatch (optional)

---

## Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Push Event                        │
│                    (branch: dev)                           │
└────────────────┬────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
┌──────────────┐  ┌──────────────┐
│   Backend    │  │   Frontend   │
│   Pipeline   │  │   Pipeline   │
└──────┬───────┘  └──────┬───────┘
       │                 │
       ├─ Build          ├─ Build
       │  (3 OS)         │  (3 OS)
       │                 │
       ├─ Test           ├─ Test
       │  (3 OS)         │  (3 OS)
       │                 │
       └─────┬───────────┘
             │
             ▼
     ┌──────────────┐
     │   Docker     │
     │   Build &    │
     │   Publish    │
     └──────────────┘
```

---

## Workflows

### 1. Main CI/CD Pipeline (`pipeline.yml`)

**Location**: `.github/workflows/pipeline.yml`

**Trigger**: Push to `dev` branch

**Jobs:**
1. `build-backend` - Builds backend on 3 operating systems
2. `test-backend` - Runs backend tests (depends on build-backend)
3. `build-frontend` - Builds frontend on 3 operating systems
4. `test-frontend` - Runs frontend tests (depends on build-frontend)

### 2. Publish Workflow (`publish.yml`)

**Location**: `.github/workflows/publish.yml`

**Trigger**: Push to `main` branch

**Purpose**: Builds and publishes Docker images to container registry

---

## Pipeline Jobs

### Backend Jobs

#### Build Backend

```yaml
build-backend:
  runs-on: ${{ matrix.os }}
  strategy:
    matrix:
      os: [macos-latest, windows-latest, ubuntu-latest]
```

**Steps:**
1. **Checkout code** - Retrieves source code
2. **Setup Java 17** - Installs JDK
3. **Cache Maven dependencies** - Caches `~/.m2` directory
4. **Build** - Runs `mvn clean package -DskipTests`

**Artifacts**: Compiled JAR file in `target/` directory

**Duration**: ~2-3 minutes per OS

#### Test Backend

```yaml
test-backend:
  needs: build-backend
  runs-on: ${{ matrix.os }}
```

**Steps:**
1. **Checkout code**
2. **Setup Java 17**
3. **Cache Maven dependencies**
4. **Run tests** - Executes `mvn test`

**Coverage**: JUnit tests with Mockito

**Duration**: ~1-2 minutes per OS

---

### Frontend Jobs

#### Build Frontend

```yaml
build-frontend:
  runs-on: ${{ matrix.os }}
  strategy:
    matrix:
      os: [macos-latest, windows-latest, ubuntu-latest]
```

**Steps:**
1. **Checkout code**
2. **Setup Node.js 18**
3. **Cache npm modules** - Caches `~/.npm`
4. **Install dependencies** - Runs `npm install`
5. **Build** - Executes `npm run build`

**Artifacts**: Production build in `build/` directory

**Duration**: ~2-3 minutes per OS

#### Test Frontend

```yaml
test-frontend:
  needs: build-frontend
  runs-on: ${{ matrix.os }}
```

**Steps:**
1. **Checkout code**
2. **Setup Node.js 18**
3. **Cache npm modules**
4. **Install dependencies**
5. **Run tests** - Executes `npm test`

**Coverage**: Jest tests with React Testing Library

**Duration**: ~1-2 minutes per OS

---

## Caching Strategy

### Maven Cache (Backend)

```yaml
- name: Cache Maven dependencies
  uses: actions/cache@v3.3.2
  with:
    path: ~/.m2
    key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
    restore-keys: ${{ runner.os }}-m2
```

**Benefits:**
- Reduces build time by ~50%
- Cache is OS-specific
- Automatically invalidated when `pom.xml` changes

### npm Cache (Frontend)

```yaml
- name: Cache Node.js modules
  uses: actions/cache@v3.3.2
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: ${{ runner.os }}-node
```

**Benefits:**
- Reduces installation time by ~60%
- Cache is OS-specific
- Automatically invalidated when `package-lock.json` changes

---

## Secrets and Environment Variables

### Required Secrets

Configure these in GitHub repository settings:

**For Docker Registry:**
```
DOCKER_REGISTRY_USERNAME=your-dockerhub-username
DOCKER_REGISTRY_PASSWORD=your-dockerhub-password (or access token)
```

**For Database (optional):**
```
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
DB_URL=your-db-connection-string
```

### Environment Variables

**Backend:**
```yaml
env:
  SPRING_DATASOURCE_URL: ${{ secrets.DB_URL }}
  SPRING_DATASOURCE_USERNAME: ${{ secrets.DB_USERNAME }}
  SPRING_DATASOURCE_PASSWORD: ${{ secrets.DB_PASSWORD }}
```

**Frontend:**
```yaml
env:
  REACT_APP_API_URL: ${{ secrets.API_URL }}
```

---

## Deployment Strategy

### Current Strategy: Docker Registry Deployment

After successful pipeline:
1. Build artifacts are created
2. Docker images are built and pushed to Docker Hub
3. Deploy using `docker-compose` with the published images

### Automated Docker Image Publishing

The workflow automatically:
1. Bumps version on main branch commits
2. Creates GitHub releases
3. Builds Docker images for backend and frontend
4. Publishes images to Docker Hub with version tags and `latest` tag

### Deployment Process

To deploy the latest version:

```bash
# Pull latest images from Docker Hub
docker pull rofeit00/todo-backend:latest
docker pull rofeit00/todo-frontend:latest

# Or pull specific version
docker pull rofeit00/todo-backend:v1.1.0
docker pull rofeit00/todo-frontend:v1.1.0

# Update docker-compose.yml to use published images
# Then start services
docker-compose up -d
```

---

## Docker Image Build and Publish

### Publish Workflow

The `publish.yml` workflow can be configured to build and push Docker images:

```yaml
name: Publish Docker Images

on:
  push:
    branches:
      - main
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: |
            ${{ secrets.DOCKER_USERNAME }}/todolist-backend
            ${{ secrets.DOCKER_USERNAME }}/todolist-frontend
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}

      - name: Build and push backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/todolist-backend:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Build and push frontend
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/todolist-frontend:latest
          build-args: |
            REACT_APP_API_URL=${{ secrets.API_URL }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

---

## Monitoring and Notifications

### Pipeline Monitoring

**GitHub Actions Dashboard:**
- View all workflow runs
- Check job statuses
- Download artifacts
- View logs

**Metrics to Track:**
- Build success rate
- Average build duration
- Test pass rate
- Cache hit rate

### Notifications

#### Slack Notification (optional)

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Pipeline ${{ job.status }}'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

#### Email Notification

GitHub automatically sends email notifications for:
- Failed workflows
- Fixed workflows
- Can be configured in repository settings

#### Discord Notification (optional)

```yaml
- name: Discord notification
  uses: Ilshidur/action-discord@master
  env:
    DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
  with:
    args: 'Pipeline {{ EVENT_PAYLOAD.repository.full_name }} - ${{ job.status }}'
```

---

## Pipeline Optimization

### Current Performance

| Job | Duration (per OS) |
|-----|-------------------|
| Build Backend | ~2-3 minutes |
| Test Backend | ~1-2 minutes |
| Build Frontend | ~2-3 minutes |
| Test Frontend | ~1-2 minutes |

**Total Duration**: ~6-10 minutes (parallel execution)

### Optimization Strategies

**1. Selective Testing**
```yaml
- name: Get changed files
  id: changed-files
  uses: tj-actions/changed-files@v40

- name: Run tests only if code changed
  if: steps.changed-files.outputs.any_changed == 'true'
  run: npm test
```

**2. Matrix Strategy Optimization**
```yaml
strategy:
  matrix:
    os: [ubuntu-latest] # Only Ubuntu for PR checks
    include:
      - os: macos-latest # Full matrix on main branch
      - os: windows-latest
```

**3. Parallel Job Execution**
```yaml
jobs:
  backend:
    # Backend jobs
  frontend:
    # Frontend jobs run in parallel
```

**4. Docker Layer Caching**
```yaml
- name: Build with cache
  uses: docker/build-push-action@v5
  with:
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

---

## Troubleshooting

### Common Issues

#### Cache Not Working

**Symptoms**: Builds are slow, dependencies redownload

**Solutions:**
```yaml
# Verify cache key is correct
key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}

# Check cache hit in logs
- Cache restored from key: Linux-m2-abc123

# Clear cache if corrupted
# Go to Actions > Caches > Delete specific cache
```

#### Tests Failing on Specific OS

**Symptoms**: Tests pass on Linux but fail on Windows

**Solutions:**
- Check file path separators (`/` vs `\`)
- Verify line endings (CRLF vs LF)
- Check case sensitivity
- Review OS-specific dependencies

#### Build Timeout

**Symptoms**: Job exceeds 6 hour limit

**Solutions:**
```yaml
# Add timeout
timeout-minutes: 30

# Skip tests in build
mvn clean package -DskipTests

# Use lighter OS
runs-on: ubuntu-latest # Fastest
```

#### Out of Disk Space

**Symptoms**: "No space left on device" error

**Solutions:**
```yaml
# Clean up before build
- name: Free disk space
  run: |
    docker system prune -af
    sudo rm -rf /usr/local/lib/android
    sudo rm -rf /usr/share/dotnet
```

### Debugging Tips

**View Logs:**
```bash
# Enable debug logging
- name: Debug
  run: echo "::debug::My debug message"

# Enable step debug
# Set secret ACTIONS_STEP_DEBUG = true
```

**Local Testing:**
```bash
# Use act to run workflows locally
# Install: https://github.com/nektos/act

# Run workflow
act -j build-backend

# Run with secrets
act -j deploy --secret-file .secrets
```

---

## Pipeline Evolution

### Current State (v1.0)
- ✅ Multi-OS build and test
- ✅ Dependency caching
- ✅ Parallel execution
- ⚠️ Manual deployment

### Planned Improvements (v1.1)
- [ ] Automated deployment to staging
- [ ] Integration tests in pipeline
- [ ] Code coverage reporting
- [ ] Security scanning (Snyk, Dependabot)
- [ ] Performance testing

### Future Enhancements (v2.0)
- [ ] Automated deployment to production
- [ ] Blue-green deployment
- [ ] Canary releases
- [ ] Automated rollback
- [ ] Load testing in pipeline

---

## Best Practices

### DO ✅
- Use caching for dependencies
- Run tests in parallel
- Use specific versions for actions
- Store secrets in GitHub Secrets
- Add meaningful job names
- Use matrix strategy for multi-OS testing
- Clean up artifacts after use
- Monitor pipeline duration

### DON'T ❌
- Hardcode secrets in workflow files
- Use `latest` tags for actions
- Run unnecessary jobs
- Ignore failing tests
- Skip security scanning
- Deploy without testing
- Use deprecated actions

---

## Contributing to CI/CD

When modifying the pipeline:

1. **Test locally** using `act` if possible
2. **Update this documentation**
3. **Add comments** to workflow files
4. **Monitor first runs** after changes
5. **Update secrets** if needed
6. **Notify team** of breaking changes

---

## Resources

### Official Documentation
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)

### Useful Actions
- [actions/checkout](https://github.com/actions/checkout)
- [actions/setup-java](https://github.com/actions/setup-java)
- [actions/setup-node](https://github.com/actions/setup-node)
- [actions/cache](https://github.com/actions/cache)
- [docker/build-push-action](https://github.com/docker/build-push-action)

---

**Last Updated**: October 2025
**Maintained by**: Robert Feo
**Pipeline Version**: 1.0
