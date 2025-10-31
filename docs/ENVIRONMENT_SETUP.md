# Environment Setup Guide

> **Deutsch:** [Deutsche Version](#umgebungseinrichtung-de) | **English:** Current section

---

## Overview

This project uses environment variables for configuration to keep sensitive information secure and separate configuration from code.

## Quick Start

### 1. Copy Environment Template

```bash
cp .env.example .env
```

### 2. Edit Configuration

Open `.env` and update the values:

```bash
# Edit with your preferred editor
nano .env
# or
vim .env
# or use VS Code
code .env
```

### 3. Start the Application

```bash
docker-compose up --build
```

---

## Environment Variables

### Database Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `POSTGRES_USER` | PostgreSQL username | `robert` | ✅ Yes |
| `POSTGRES_PASSWORD` | PostgreSQL password | `securepassword` | ✅ Yes |
| `POSTGRES_DB` | Database name | `todolist` | ✅ Yes |

**Security Notes:**
- ⚠️ **Never commit `.env` to version control**
- ✅ Change default password in production
- ✅ Use strong passwords (minimum 16 characters)
- ✅ Store production secrets in secure vaults (AWS Secrets Manager, Azure Key Vault, etc.)

### Backend Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `SPRING_DATASOURCE_URL` | JDBC connection string | `jdbc:postgresql://database:5432/todolist` | ✅ Yes |
| `SPRING_DATASOURCE_USERNAME` | DB username (same as POSTGRES_USER) | `robert` | ✅ Yes |
| `SPRING_DATASOURCE_PASSWORD` | DB password (same as POSTGRES_PASSWORD) | `securepassword` | ✅ Yes |

### Jaeger Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `JAEGER_SERVICE_NAME` | Service name in Jaeger UI | `todo-list-backend` | ✅ Yes |
| `JAEGER_AGENT_HOST` | Jaeger agent hostname | `jaeger` | ✅ Yes |
| `JAEGER_AGENT_PORT` | Jaeger agent UDP port | `6831` | ✅ Yes |
| `JAEGER_SAMPLER_TYPE` | Sampling strategy | `const` | ❌ No |
| `JAEGER_SAMPLER_PARAM` | Sampling parameter (0.0-1.0) | `1` (100%) | ❌ No |

**Sampling Strategies:**
- `const` - Sample all traces (use `1`) or none (use `0`)
- `probabilistic` - Sample a percentage (e.g., `0.1` = 10%)
- `ratelimiting` - Sample up to N traces per second

**Production Recommendation:**
```bash
JAEGER_SAMPLER_TYPE=probabilistic
JAEGER_SAMPLER_PARAM=0.1  # Sample 10% of requests
```

### Frontend Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8080` | ✅ Yes |

**Note:** For production, update this to your actual API URL.

### Docker Image Tags

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `BACKEND_IMAGE_TAG` | Backend Docker image tag | `latest` | ❌ No |
| `FRONTEND_IMAGE_TAG` | Frontend Docker image tag | `latest` | ❌ No |
| `DATABASE_IMAGE_TAG` | Database Docker image tag | `latest` | ❌ No |

---

## Configuration Examples

### Development Environment

**.env** (local development):
```bash
# Development Configuration
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_password_123
POSTGRES_DB=todolist_dev

SPRING_DATASOURCE_URL=jdbc:postgresql://database:5432/todolist_dev
SPRING_DATASOURCE_USERNAME=dev_user
SPRING_DATASOURCE_PASSWORD=dev_password_123

# Sample all traces in development
JAEGER_SERVICE_NAME=todo-list-backend-dev
JAEGER_SAMPLER_TYPE=const
JAEGER_SAMPLER_PARAM=1

REACT_APP_API_URL=http://localhost:8080
```

### Production Environment

**.env** (production - use secrets manager instead):
```bash
# Production Configuration
POSTGRES_USER=${AWS_SECRET:db_username}  # Load from secrets manager
POSTGRES_PASSWORD=${AWS_SECRET:db_password}
POSTGRES_DB=todolist_prod

SPRING_DATASOURCE_URL=jdbc:postgresql://prod-db.example.com:5432/todolist_prod
SPRING_DATASOURCE_USERNAME=${AWS_SECRET:db_username}
SPRING_DATASOURCE_PASSWORD=${AWS_SECRET:db_password}

# Sample 10% of traces in production
JAEGER_SERVICE_NAME=todo-list-backend-prod
JAEGER_SAMPLER_TYPE=probabilistic
JAEGER_SAMPLER_PARAM=0.1

REACT_APP_API_URL=https://api.example.com

# Use specific versions in production
BACKEND_IMAGE_TAG=v1.2.3
FRONTEND_IMAGE_TAG=v1.2.3
DATABASE_IMAGE_TAG=15-alpine
```

---

## Security Best Practices

### ✅ DO:

1. **Use `.env.example` as template**
   - Contains all required variables
   - Uses placeholder values
   - Safe to commit to version control

2. **Generate strong passwords**
   ```bash
   # Generate 32-character random password
   openssl rand -base64 32
   ```

3. **Use different credentials per environment**
   - Development: Simple passwords are OK
   - Staging: Similar to production
   - Production: Strong, unique passwords

4. **Rotate secrets regularly**
   - Every 90 days minimum
   - After any security incident
   - When team members leave

5. **Use secrets management in production**
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Secret Manager
   - HashiCorp Vault

### ❌ DON'T:

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Double-check before committing

2. **Don't use default passwords in production**
   - Change all defaults
   - Use strong, unique passwords

3. **Don't share `.env` files via email/chat**
   - Use secure channels
   - Better: Use secrets management

4. **Don't hardcode secrets in code**
   - Always use environment variables
   - Never in source code or configs

5. **Don't log sensitive information**
   - Passwords, tokens, keys
   - Mask them in logs

---

## Verifying Configuration

### Check Environment Variables

```bash
# View current configuration (BE CAREFUL - contains secrets!)
docker-compose config

# Check if .env is loaded
docker-compose ps
docker exec backend env | grep SPRING
docker exec database env | grep POSTGRES
```

### Test Database Connection

```bash
# Connect to PostgreSQL
docker exec -it database psql -U $POSTGRES_USER -d $POSTGRES_DB

# Inside psql:
\dt  # List tables
\q   # Quit
```

### Test Jaeger Integration

1. Start the application:
   ```bash
   docker-compose up -d
   ```

2. Make some API requests:
   ```bash
   curl http://localhost:8080/api/todos
   curl -X POST http://localhost:8080/api/todos/add \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Todo", "isChecked": false}'
   ```

3. Open Jaeger UI:
   ```
   http://localhost:16686
   ```

4. Search for traces:
   - Service: `todo-list-backend`
   - Operation: `GET /api/todos`
   - Lookback: `Last 1 hour`

### Health Checks

```bash
# Backend health
curl http://localhost:8080/actuator/health

# Database health
docker exec database pg_isready -U $POSTGRES_USER

# All services
docker-compose ps
```

---

## Troubleshooting

### Problem: Backend can't connect to database

**Symptoms:**
```
Connection refused: database:5432
```

**Solutions:**
1. Check database is running:
   ```bash
   docker-compose ps database
   ```

2. Verify environment variables:
   ```bash
   docker exec backend env | grep DATASOURCE
   ```

3. Check database logs:
   ```bash
   docker-compose logs database
   ```

4. Test database connectivity:
   ```bash
   docker exec backend ping database
   ```

### Problem: Jaeger not showing traces

**Symptoms:**
- No services in Jaeger UI
- Empty traces

**Solutions:**
1. Check Jaeger is running:
   ```bash
   docker-compose ps jaeger
   curl http://localhost:16686
   ```

2. Verify Jaeger environment variables:
   ```bash
   docker exec backend env | grep JAEGER
   ```

3. Check backend logs for Jaeger errors:
   ```bash
   docker-compose logs backend | grep -i jaeger
   ```

4. Verify Jaeger ports:
   ```bash
   docker-compose ps jaeger
   # Should show ports: 6831/udp, 14268, 16686
   ```

5. Test with a request:
   ```bash
   curl http://localhost:8080/api/todos
   # Wait 10 seconds, then check Jaeger UI
   ```

### Problem: Environment variables not loading

**Symptoms:**
```
WARNING: The POSTGRES_USER variable is not set
```

**Solutions:**
1. Verify `.env` file exists:
   ```bash
   ls -la .env
   ```

2. Check `.env` file format:
   - No spaces around `=`
   - No quotes for simple values
   - One variable per line

3. Restart docker-compose:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

4. Manually load `.env`:
   ```bash
   source .env
   docker-compose up
   ```

### Problem: Wrong database credentials

**Symptoms:**
```
FATAL: password authentication failed for user "robert"
```

**Solutions:**
1. Stop all containers:
   ```bash
   docker-compose down -v  # -v removes volumes
   ```

2. Update `.env` file

3. Start fresh:
   ```bash
   docker-compose up --build
   ```

---

## Advanced Configuration

### Using Multiple Environment Files

```bash
# Development
docker-compose --env-file .env.development up

# Staging
docker-compose --env-file .env.staging up

# Production
docker-compose --env-file .env.production up
```

### Override with Command Line

```bash
# Override single variable
POSTGRES_PASSWORD=newpass docker-compose up

# Override multiple variables
POSTGRES_USER=admin POSTGRES_PASSWORD=admin123 docker-compose up
```

### Using Docker Secrets (Swarm Mode)

```yaml
services:
  database:
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password

secrets:
  db_password:
    external: true
```

---

## CI/CD Integration

### GitHub Actions

```yaml
- name: Create .env file
  run: |
    echo "POSTGRES_USER=${{ secrets.DB_USER }}" >> .env
    echo "POSTGRES_PASSWORD=${{ secrets.DB_PASSWORD }}" >> .env
    echo "POSTGRES_DB=todolist" >> .env

- name: Run tests
  run: docker-compose up -d && docker-compose exec -T backend mvn test
```

### GitLab CI

```yaml
before_script:
  - echo "POSTGRES_USER=${DB_USER}" >> .env
  - echo "POSTGRES_PASSWORD=${DB_PASSWORD}" >> .env
  - echo "POSTGRES_DB=todolist" >> .env
```

---

## Checklist

Before deploying:

- [ ] `.env` file created from `.env.example`
- [ ] All required variables are set
- [ ] Strong passwords in production
- [ ] `.env` is in `.gitignore`
- [ ] Secrets stored in secrets manager (production)
- [ ] Database credentials are secure
- [ ] Jaeger sampling configured appropriately
- [ ] All services start successfully
- [ ] Health checks pass
- [ ] Jaeger shows traces

---

**Last Updated:** October 2025
**Author:** Robert-Bogdan Fesko

---
---

# Umgebungseinrichtung (DE)

> **English:** [English version above](#environment-setup-guide) | **Deutsch:** Aktuelle Sektion

---

## Überblick

Dieses Projekt verwendet Umgebungsvariablen für die Konfiguration, um sensible Informationen sicher zu halten und die Konfiguration vom Code zu trennen.

## Schnellstart

### 1. Umgebungsvorlage kopieren

```bash
cp .env.example .env
```

### 2. Konfiguration bearbeiten

Öffnen Sie `.env` und aktualisieren Sie die Werte:

```bash
# Mit Ihrem bevorzugten Editor bearbeiten
nano .env
# oder
vim .env
# oder VS Code verwenden
code .env
```

### 3. Anwendung starten

```bash
docker-compose up --build
```

---

## Umgebungsvariablen

### Datenbank-Konfiguration

| Variable | Beschreibung | Standard | Erforderlich |
|----------|--------------|----------|--------------|
| `POSTGRES_USER` | PostgreSQL Benutzername | `robert` | ✅ Ja |
| `POSTGRES_PASSWORD` | PostgreSQL Passwort | `securepassword` | ✅ Ja |
| `POSTGRES_DB` | Datenbankname | `todolist` | ✅ Ja |

**Sicherheitshinweise:**
- ⚠️ **Niemals `.env` zur Versionskontrolle committen**
- ✅ Standardpasswort in Produktion ändern
- ✅ Starke Passwörter verwenden (mindestens 16 Zeichen)
- ✅ Produktionsgeheimnisse in sicheren Tresoren speichern

### Jaeger-Konfiguration

| Variable | Beschreibung | Standard | Erforderlich |
|----------|--------------|----------|--------------|
| `JAEGER_SERVICE_NAME` | Servicename in Jaeger UI | `todo-list-backend` | ✅ Ja |
| `JAEGER_AGENT_HOST` | Jaeger Agent Hostname | `jaeger` | ✅ Ja |
| `JAEGER_AGENT_PORT` | Jaeger Agent UDP Port | `6831` | ✅ Ja |
| `JAEGER_SAMPLER_TYPE` | Sampling-Strategie | `const` | ❌ Nein |
| `JAEGER_SAMPLER_PARAM` | Sampling-Parameter (0.0-1.0) | `1` (100%) | ❌ Nein |

**Produktionsempfehlung:**
```bash
JAEGER_SAMPLER_TYPE=probabilistic
JAEGER_SAMPLER_PARAM=0.1  # 10% der Anfragen samplen
```

---

## Fehlerbehebung

### Problem: Backend kann keine Verbindung zur Datenbank herstellen

**Lösungen:**
1. Prüfen Sie, ob die Datenbank läuft:
   ```bash
   docker-compose ps database
   ```

2. Umgebungsvariablen überprüfen:
   ```bash
   docker exec backend env | grep DATASOURCE
   ```

### Problem: Jaeger zeigt keine Traces an

**Lösungen:**
1. Prüfen Sie, ob Jaeger läuft:
   ```bash
   docker-compose ps jaeger
   curl http://localhost:16686
   ```

2. Backend-Logs auf Jaeger-Fehler prüfen:
   ```bash
   docker-compose logs backend | grep -i jaeger
   ```

3. Test mit einer Anfrage:
   ```bash
   curl http://localhost:8080/api/todos
   # 10 Sekunden warten, dann Jaeger UI prüfen
   ```

---

**Zuletzt aktualisiert:** Oktober 2025
**Autor:** Robert-Bogdan Fesko
