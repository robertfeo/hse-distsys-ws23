# Deployment Guide

This guide provides comprehensive instructions for deploying the Todo List application in various environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Cloud Platforms](#cloud-platforms)
  - [AWS](#aws-deployment)
  - [Azure](#azure-deployment)
  - [Google Cloud Platform](#google-cloud-platform)
  - [DigitalOcean](#digitalocean-deployment)
- [Production Checklist](#production-checklist)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Docker** (20.0+) and **Docker Compose** (2.0+)
- **Git**
- **Domain name** (for production)
- **SSL certificate** (Let's Encrypt recommended)

### Optional for Manual Deployment
- **Node.js** (18.0+) and **npm**
- **Java JDK** (17+) and **Maven** (3.6+)
- **PostgreSQL** (15+)
- **Nginx** (for reverse proxy)

---

## Environment Configuration

### Environment Variables

Create environment-specific configuration files:

#### Backend Environment Variables

**.env.production** (Backend):
```bash
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/todolist
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_secure_password

# Server Configuration
SERVER_PORT=8080
SERVER_ADDRESS=0.0.0.0

# JPA/Hibernate
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SPRING_JPA_SHOW_SQL=false
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_TODOLIST=INFO

# CORS
CORS_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Actuator (Monitoring)
MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=health,metrics,prometheus
MANAGEMENT_ENDPOINT_HEALTH_SHOW_DETAILS=when_authorized

# Jaeger Tracing
JAEGER_SERVICE_NAME=todo-list-backend
JAEGER_AGENT_HOST=jaeger
JAEGER_AGENT_PORT=6831
JAEGER_SAMPLER_TYPE=probabilistic
JAEGER_SAMPLER_PARAM=1.0
```

#### Frontend Environment Variables

**.env.production** (Frontend):
```bash
REACT_APP_API_URL=https://api.your-domain.com
REACT_APP_ENV=production
```

---

## Local Development

### Quick Start with Docker Compose

```bash
# Clone repository
git clone https://github.com/robertfeo/hse-distsys-ws23.git
cd hse-distsys-ws23

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# Jaeger: http://localhost:16686
```

### Manual Local Setup

#### 1. Start PostgreSQL
```bash
docker run -d \
  --name todolist-postgres \
  -e POSTGRES_DB=todolist \
  -e POSTGRES_USER=robert \
  -e POSTGRES_PASSWORD=securepassword \
  -p 5432:5432 \
  postgres:15-alpine
```

#### 2. Run Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### 3. Run Frontend
```bash
cd frontend
npm install
npm start
```

---

## Docker Deployment

### Production Docker Compose

Create **docker-compose.prod.yml**:

```yaml
version: '3.8'

services:
  # Frontend Service
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"
    environment:
      - REACT_APP_API_URL=https://api.your-domain.com
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - todolist-network

  # Backend Service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://database:5432/todolist
      - SPRING_DATASOURCE_USERNAME=${DB_USERNAME}
      - SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}
      - SPRING_JPA_HIBERNATE_DDL_AUTO=validate
      - JAEGER_AGENT_HOST=jaeger
    depends_on:
      - database
      - jaeger
    restart: unless-stopped
    networks:
      - todolist-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Database Service
  database:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=todolist
      - POSTGRES_USER=${DB_USERNAME}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/database/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    restart: unless-stopped
    networks:
      - todolist-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USERNAME}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Jaeger Tracing
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"
      - "6831:6831/udp"
    environment:
      - COLLECTOR_ZIPKIN_HOST_PORT=:9411
    restart: unless-stopped
    networks:
      - todolist-network

volumes:
  postgres_data:
    driver: local

networks:
  todolist-network:
    driver: bridge
```

### Deploy with Docker Compose

```bash
# Set environment variables
export DB_USERNAME=your_db_user
export DB_PASSWORD=your_secure_password

# Pull latest images
docker-compose -f docker-compose.prod.yml pull

# Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check service status
docker-compose -f docker-compose.prod.yml ps
```

### Nginx Configuration for Frontend

Create **nginx/nginx.conf**:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/json application/javascript;

    # Frontend server
    server {
        listen 80;
        listen [::]:80;
        server_name your-domain.com www.your-domain.com;

        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name your-domain.com www.your-domain.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

        root /usr/share/nginx/html;
        index index.html;

        # React routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # API proxy
        location /api/ {
            proxy_pass http://backend:8080/api/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Cache static assets
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

---

## Cloud Platforms

### AWS Deployment

#### Option 1: EC2 + RDS

**Step 1: Launch EC2 Instance**
```bash
# Launch Ubuntu 22.04 LTS instance
# Instance type: t3.medium or larger
# Security group: Allow ports 22, 80, 443, 8080
```

**Step 2: Setup RDS PostgreSQL**
```bash
# Create RDS PostgreSQL instance
# Engine: PostgreSQL 15
# Instance class: db.t3.micro for testing, db.t3.medium for production
# Storage: 20GB SSD
# Enable automated backups
# Note the endpoint URL
```

**Step 3: Deploy Application**
```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone and deploy
git clone https://github.com/robertfeo/hse-distsys-ws23.git
cd hse-distsys-ws23

# Configure environment
export DB_USERNAME=postgres
export DB_PASSWORD=your_rds_password
export SPRING_DATASOURCE_URL=jdbc:postgresql://your-rds-endpoint:5432/todolist

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

**Step 4: Configure Load Balancer (Optional)**
- Create Application Load Balancer
- Configure target group for backend (port 8080)
- Configure SSL certificate via AWS Certificate Manager
- Point domain to load balancer

#### Option 2: ECS Fargate

**Step 1: Create ECR Repositories**
```bash
# Create repositories for frontend and backend
aws ecr create-repository --repository-name todolist-frontend
aws ecr create-repository --repository-name todolist-backend

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.us-east-1.amazonaws.com

# Build and push images
docker build -t todolist-frontend ./frontend
docker tag todolist-frontend:latest your-account-id.dkr.ecr.us-east-1.amazonaws.com/todolist-frontend:latest
docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/todolist-frontend:latest

docker build -t todolist-backend ./backend
docker tag todolist-backend:latest your-account-id.dkr.ecr.us-east-1.amazonaws.com/todolist-backend:latest
docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/todolist-backend:latest
```

**Step 2: Create ECS Cluster and Task Definitions**
- Create ECS cluster
- Define task definitions for frontend and backend
- Configure service with desired count
- Set up Application Load Balancer
- Configure auto-scaling policies

---

### Azure Deployment

#### Option 1: Azure App Service

**Step 1: Create Resources**
```bash
# Login to Azure
az login

# Create resource group
az group create --name todolist-rg --location eastus

# Create PostgreSQL database
az postgres flexible-server create \
  --resource-group todolist-rg \
  --name todolist-db \
  --location eastus \
  --admin-user adminuser \
  --admin-password YourPassword123! \
  --sku-name Standard_B1ms \
  --version 15

# Create database
az postgres flexible-server db create \
  --resource-group todolist-rg \
  --server-name todolist-db \
  --database-name todolist
```

**Step 2: Deploy Backend**
```bash
# Create App Service plan
az appservice plan create \
  --name todolist-plan \
  --resource-group todolist-rg \
  --is-linux \
  --sku B1

# Create web app for backend
az webapp create \
  --resource-group todolist-rg \
  --plan todolist-plan \
  --name todolist-backend \
  --runtime "JAVA:17-java17"

# Configure app settings
az webapp config appsettings set \
  --resource-group todolist-rg \
  --name todolist-backend \
  --settings \
    SPRING_DATASOURCE_URL="jdbc:postgresql://todolist-db.postgres.database.azure.com:5432/todolist" \
    SPRING_DATASOURCE_USERNAME="adminuser" \
    SPRING_DATASOURCE_PASSWORD="YourPassword123!"

# Deploy backend JAR
cd backend
mvn clean package -DskipTests
az webapp deploy \
  --resource-group todolist-rg \
  --name todolist-backend \
  --src-path target/backend-v1.0.0.jar \
  --type jar
```

**Step 3: Deploy Frontend**
```bash
# Create web app for frontend
az webapp create \
  --resource-group todolist-rg \
  --plan todolist-plan \
  --name todolist-frontend \
  --runtime "NODE:18-lts"

# Build frontend
cd frontend
npm install
REACT_APP_API_URL=https://todolist-backend.azurewebsites.net npm run build

# Deploy frontend
az webapp up \
  --resource-group todolist-rg \
  --name todolist-frontend \
  --html \
  --src-path ./build
```

---

### Google Cloud Platform

#### Using Cloud Run + Cloud SQL

**Step 1: Setup Cloud SQL**
```bash
# Create Cloud SQL instance
gcloud sql instances create todolist-db \
  --database-version=POSTGRES_15 \
  --cpu=1 \
  --memory=3840MB \
  --region=us-central1 \
  --root-password=your-secure-password

# Create database
gcloud sql databases create todolist --instance=todolist-db
```

**Step 2: Build and Deploy Backend**
```bash
# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build backend image
cd backend
gcloud builds submit --tag gcr.io/your-project-id/todolist-backend

# Deploy to Cloud Run
gcloud run deploy todolist-backend \
  --image gcr.io/your-project-id/todolist-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --add-cloudsql-instances your-project-id:us-central1:todolist-db \
  --set-env-vars SPRING_DATASOURCE_URL="jdbc:postgresql:///todolist?cloudSqlInstance=your-project-id:us-central1:todolist-db&socketFactory=com.google.cloud.sql.postgres.SocketFactory" \
  --set-env-vars SPRING_DATASOURCE_USERNAME=postgres \
  --set-env-vars SPRING_DATASOURCE_PASSWORD=your-secure-password
```

**Step 3: Deploy Frontend**
```bash
# Build frontend image
cd frontend
gcloud builds submit --tag gcr.io/your-project-id/todolist-frontend

# Deploy to Cloud Run
gcloud run deploy todolist-frontend \
  --image gcr.io/your-project-id/todolist-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars REACT_APP_API_URL=https://todolist-backend-xxxxx.run.app
```

---

### DigitalOcean Deployment

#### Using Droplet + Managed Database

**Step 1: Create Managed PostgreSQL Database**
- Create database cluster via DigitalOcean console
- Note connection details

**Step 2: Create and Setup Droplet**
```bash
# Create Ubuntu 22.04 droplet (minimum $12/month)
# Add your SSH key

# SSH into droplet
ssh root@your-droplet-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone https://github.com/robertfeo/hse-distsys-ws23.git
cd hse-distsys-ws23

# Configure environment
nano .env

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

**Step 3: Configure Firewall**
```bash
# Allow SSH, HTTP, HTTPS
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

**Step 4: Setup SSL with Certbot**
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
```

---

## Production Checklist

### Security
- [ ] SSL/TLS certificate configured
- [ ] HTTPS enabled and HTTP redirects to HTTPS
- [ ] Database credentials stored in secrets/environment variables
- [ ] CORS configured for production domains only
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] Database access restricted to application servers only
- [ ] Firewall rules configured
- [ ] Regular security updates scheduled

### Performance
- [ ] Database indexes created
- [ ] Connection pooling configured
- [ ] Gzip compression enabled
- [ ] Static assets cached
- [ ] CDN configured for static assets (optional)
- [ ] Database query optimization
- [ ] Backend response caching (if applicable)

### Monitoring
- [ ] Health check endpoints configured
- [ ] Logging configured and centralized
- [ ] Metrics collection enabled (Prometheus)
- [ ] Distributed tracing configured (Jaeger)
- [ ] Alerting configured for critical issues
- [ ] Uptime monitoring (UptimeRobot, Pingdom, etc.)

### Backup & Recovery
- [ ] Automated database backups configured
- [ ] Backup retention policy defined
- [ ] Backup restoration tested
- [ ] Disaster recovery plan documented

### Documentation
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Rollback procedure documented
- [ ] Troubleshooting guide available

---

## Monitoring & Maintenance

### Health Checks

```bash
# Backend health
curl https://api.your-domain.com/actuator/health

# Database health
curl https://api.your-domain.com/actuator/health/db

# Prometheus metrics
curl https://api.your-domain.com/actuator/prometheus
```

### Log Management

```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# Tail specific service
docker-compose logs -f --tail=100 backend
```

### Database Maintenance

```bash
# Backup database
docker exec todolist-database pg_dump -U postgres todolist > backup_$(date +%Y%m%d).sql

# Restore database
docker exec -i todolist-database psql -U postgres todolist < backup_20231031.sql

# Connect to database
docker exec -it todolist-database psql -U postgres -d todolist
```

### Application Updates

```bash
# Pull latest code
git pull origin main

# Rebuild and restart services
docker-compose -f docker-compose.prod.yml up -d --build

# Zero-downtime deployment (with load balancer)
# 1. Update one instance
# 2. Verify health
# 3. Update remaining instances
```

---

## Troubleshooting

### Common Issues

**Backend can't connect to database:**
```bash
# Check database is running
docker-compose ps database

# Check database logs
docker-compose logs database

# Verify connection string
echo $SPRING_DATASOURCE_URL

# Test database connectivity
docker exec backend ping database
```

**Frontend can't reach backend:**
```bash
# Check CORS configuration
# Verify REACT_APP_API_URL is correct
# Check backend logs for CORS errors
docker-compose logs backend | grep CORS
```

**High memory usage:**
```bash
# Check container stats
docker stats

# Adjust JVM memory settings (backend)
# Add to docker-compose.yml:
environment:
  - JAVA_OPTS=-Xmx512m -Xms256m
```

**Database performance issues:**
```bash
# Connect to database and analyze slow queries
docker exec -it todolist-database psql -U postgres -d todolist

# Enable query logging
ALTER DATABASE todolist SET log_statement = 'all';
ALTER DATABASE todolist SET log_duration = on;

# Check for missing indexes
SELECT schemaname, tablename, indexname FROM pg_indexes WHERE schemaname = 'public';
```

### Getting Help

- Check application logs
- Review [Architecture Documentation](../architecture/ARCHITECTURE.md)
- Search [GitHub Issues](https://github.com/robertfeo/hse-distsys-ws23/issues)
- Contact: [your.email@example.com](mailto:your.email@example.com)

---

**Last Updated**: October 2025
**Maintained by**: Robert Feo
