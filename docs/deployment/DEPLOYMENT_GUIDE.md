# Deployment Guide

This guide provides comprehensive instructions for deploying the Todo List application using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Checklist](#production-checklist)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Docker** (20.0+) and **Docker Compose** (2.0+)
- **Git**
- **Domain name** (for production, optional)
- **SSL certificate** (Let's Encrypt recommended for production)

### Optional for Manual Deployment
- **Node.js** (18.0+) and **npm**
- **Java JDK** (17+) and **Maven** (3.6+)
- **PostgreSQL** (15+)
- **Nginx** (for reverse proxy)

---

## Environment Configuration

### Environment Variables

The application uses environment variables for configuration. See [ENVIRONMENT_SETUP.md](../ENVIRONMENT_SETUP.md) for complete details.

#### Quick Setup

```bash
# Copy environment template
cp .env.example .env

# Edit with your configuration
nano .env
```

#### Production Environment Variables

**.env.production**:
```bash
# Database Configuration
POSTGRES_USER=prod_db_user
POSTGRES_PASSWORD=your_very_secure_password_here
POSTGRES_DB=todolist

# Backend Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://database:5432/todolist
SPRING_DATASOURCE_USERNAME=prod_db_user
SPRING_DATASOURCE_PASSWORD=your_very_secure_password_here

# Jaeger Configuration
JAEGER_SERVICE_NAME=todo-list-backend-prod
JAEGER_AGENT_HOST=jaeger
JAEGER_AGENT_PORT=6831
JAEGER_SAMPLER_TYPE=probabilistic
JAEGER_SAMPLER_PARAM=0.1

# Frontend Configuration
REACT_APP_API_URL=https://api.your-domain.com

# Docker Image Tags
BACKEND_IMAGE_TAG=latest
FRONTEND_IMAGE_TAG=latest
DATABASE_IMAGE_TAG=latest
```

---

## Local Development

### Quick Start with Docker Compose

```bash
# Clone repository
git clone https://github.com/robertfeo/hse-distsys-ws23.git
cd hse-distsys-ws23

# Copy environment file
cp .env.example .env

# Start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### Access Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Jaeger UI**: http://localhost:16686
- **Database**: localhost:5432

### Useful Development Commands

```bash
# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Stop and remove volumes (clean start)
docker-compose down -v

# Rebuild specific service
docker-compose up -d --build backend

# Execute command in container
docker exec -it backend bash
```

---

## Docker Deployment

### Production Docker Compose

Create **docker-compose.prod.yml**:

```yaml
services:
  # Frontend with Nginx
  frontend:
    container_name: frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        - REACT_APP_API_URL=${REACT_APP_API_URL:-https://api.your-domain.com}
    image: img-frontend:${FRONTEND_IMAGE_TAG:-latest}
    ports:
      - "3000:3000"
    restart: unless-stopped
    depends_on:
      - backend
    networks:
      - todolist-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

  # Backend Service
  backend:
    container_name: backend
    image: img-backend:${BACKEND_IMAGE_TAG:-latest}
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      # Database Configuration
      - SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
      - SPRING_DATASOURCE_USERNAME=${POSTGRES_USER}
      - SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}

      # Jaeger Tracing Configuration
      - JAEGER_SERVICE_NAME=${JAEGER_SERVICE_NAME:-todo-list-backend}
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://jaeger:4318
      - OTEL_SERVICE_NAME=${JAEGER_SERVICE_NAME:-todo-list-backend}
      - OTEL_TRACES_EXPORTER=otlp
      - OTEL_METRICS_EXPORTER=none
      - OTEL_LOGS_EXPORTER=none

      # Spring Boot Actuator
      - MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=health,info,prometheus,metrics
      - MANAGEMENT_METRICS_EXPORT_PROMETHEUS_ENABLED=true
    depends_on:
      database:
        condition: service_healthy
      jaeger:
        condition: service_started
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
    container_name: database
    image: img-database:${DATABASE_IMAGE_TAG:-latest}
    build:
      context: ./backend/database/
      dockerfile: Dockerfile
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped
    networks:
      - todolist-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  # Jaeger Tracing
  jaeger:
    container_name: jaeger
    image: jaegertracing/all-in-one:latest
    restart: always
    environment:
      - COLLECTOR_ZIPKIN_HOST_PORT=:9411
      - COLLECTOR_OTLP_ENABLED=true
    ports:
      # Jaeger UI
      - "16686:16686"
      # Collector HTTP
      - "14268:14268"
      # Collector gRPC
      - "14250:14250"
      # Agent (Thrift compact)
      - "6831:6831/udp"
      # Agent (Thrift binary)
      - "6832:6832/udp"
      # Admin port
      - "14269:14269"
      # OTLP gRPC
      - "4317:4317"
      # OTLP HTTP
      - "4318:4318"
      # Zipkin compatible endpoint
      - "9411:9411"
    networks:
      - todolist-network

networks:
  todolist-network:
    name: todolist-network
    driver: bridge

volumes:
  db-data:
    name: volume-database
    driver: local
```

### Deploy with Docker Compose

```bash
# Set environment variables for production
cp .env.example .env.production
nano .env.production

# Load production environment
export $(cat .env.production | xargs)

# Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check service status
docker-compose -f docker-compose.prod.yml ps
```

### Nginx Reverse Proxy (Optional)

If you want to use Nginx as a reverse proxy on your host machine:

Create **/etc/nginx/sites-available/todolist**:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Actuator endpoints (restrict in production)
    location /actuator/ {
        # deny all;  # Uncomment to disable external access
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/json application/javascript;
}
```

Enable and restart Nginx:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/todolist /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### SSL Certificate with Let's Encrypt

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

---

## Production Checklist

### Security
- [ ] SSL/TLS certificate configured
- [ ] HTTPS enabled and HTTP redirects to HTTPS
- [ ] Database credentials stored in environment variables
- [ ] Strong passwords used (minimum 16 characters)
- [ ] CORS configured for production domains only
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] Database access restricted to application servers only
- [ ] Firewall rules configured (allow only 22, 80, 443)
- [ ] Regular security updates scheduled
- [ ] Actuator endpoints restricted or disabled
- [ ] `.env` files not committed to Git

### Performance
- [ ] Database indexes created
- [ ] Connection pooling configured
- [ ] Gzip compression enabled
- [ ] Static assets cached
- [ ] Database query optimization
- [ ] JVM memory settings optimized
- [ ] Docker resource limits configured

### Monitoring
- [ ] Health check endpoints configured
- [ ] Logging configured and accessible
- [ ] Metrics collection enabled (Prometheus)
- [ ] Distributed tracing configured (Jaeger)
- [ ] Alerting configured for critical issues
- [ ] Uptime monitoring configured

### Backup & Recovery
- [ ] Automated database backups configured
- [ ] Backup retention policy defined (e.g., 30 days)
- [ ] Backup restoration tested
- [ ] Disaster recovery plan documented
- [ ] Database dumps stored securely

### Documentation
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Rollback procedure documented
- [ ] Troubleshooting guide available
- [ ] Team contacts documented

---

## Monitoring & Maintenance

### Health Checks

```bash
# Backend health
curl http://localhost:8080/actuator/health

# Database health
curl http://localhost:8080/actuator/health/db

# Prometheus metrics
curl http://localhost:8080/actuator/prometheus

# Jaeger UI
open http://localhost:16686
```

### Log Management

```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# Tail specific service
docker-compose logs -f --tail=100 backend

# Search logs
docker-compose logs backend | grep ERROR

# Export logs
docker-compose logs --no-color > application.log
```

### Database Maintenance

```bash
# Backup database
docker exec database pg_dump -U ${POSTGRES_USER} ${POSTGRES_DB} > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
docker exec -i database psql -U ${POSTGRES_USER} ${POSTGRES_DB} < backup_20231031_120000.sql

# Connect to database
docker exec -it database psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

# Database size
docker exec database psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "SELECT pg_size_pretty(pg_database_size('${POSTGRES_DB}'));"

# List tables
docker exec database psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "\dt"
```

### Application Updates

```bash
# Pull latest code
git pull origin main

# Rebuild and restart services
docker-compose up -d --build

# Check service status
docker-compose ps

# View updated service logs
docker-compose logs -f backend

# Rollback if needed
git checkout previous-commit-hash
docker-compose up -d --build
```

### Performance Monitoring

```bash
# Container resource usage
docker stats

# Container processes
docker-compose top

# Disk usage
docker system df

# Clean up unused resources
docker system prune -a
```

---

## Troubleshooting

### Common Issues

#### Backend can't connect to database

```bash
# Check database is running
docker-compose ps database

# Check database logs
docker-compose logs database

# Verify environment variables
docker exec backend env | grep DATASOURCE

# Test database connectivity
docker exec backend ping database

# Check database health
docker exec database pg_isready -U ${POSTGRES_USER}
```

#### Frontend can't reach backend

```bash
# Check REACT_APP_API_URL configuration
docker exec frontend env | grep REACT_APP_API_URL

# Check backend is running
curl http://localhost:8080/actuator/health

# Check backend logs for CORS errors
docker-compose logs backend | grep CORS

# Verify network connectivity
docker exec frontend ping backend
```

#### Jaeger not showing traces

```bash
# Check Jaeger is running
docker-compose ps jaeger

# Check Jaeger UI
open http://localhost:16686

# Check backend tracing configuration
docker exec backend env | grep OTEL

# Check backend logs for tracing errors
docker-compose logs backend | grep -i "otlp\|tracing\|jaeger"

# Make test requests to generate traces
curl http://localhost:8080/api/todos

# Check Jaeger API for services
curl http://localhost:16686/api/services
```

#### High memory usage

```bash
# Check container stats
docker stats

# Adjust JVM memory settings (backend)
# Add to docker-compose.yml environment:
JAVA_OPTS=-Xmx512m -Xms256m

# Restart backend
docker-compose up -d backend
```

#### Database performance issues

```bash
# Connect to database
docker exec -it database psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

# Check active connections
SELECT count(*) FROM pg_stat_activity;

# Check slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

# Check for missing indexes
SELECT schemaname, tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public';
```

#### Port conflicts

```bash
# Check what's using port 8080
sudo lsof -i :8080

# Check what's using port 3000
sudo lsof -i :3000

# Kill process using port
sudo kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "8081:8080"  # Use different host port
```

#### Docker build failures

```bash
# Clean build cache
docker-compose build --no-cache

# Remove all containers and volumes
docker-compose down -v

# Remove dangling images
docker image prune

# Full cleanup
docker system prune -a --volumes
```

### Getting Help

1. **Check Logs**: Always start by checking container logs
   ```bash
   docker-compose logs -f
   ```

2. **Review Documentation**:
   - [Architecture Documentation](../architecture/ARCHITECTURE.md)
   - [API Documentation](../API_DOCUMENTATION.md)
   - [Environment Setup](../ENVIRONMENT_SETUP.md)

3. **GitHub Issues**: [https://github.com/robertfeo/hse-distsys-ws23/issues](https://github.com/robertfeo/hse-distsys-ws23/issues)

4. **Contact**: For support, create an issue on GitHub

---

## Performance Optimization

### Docker Optimization

```yaml
# Add resource limits to docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### Database Optimization

```sql
-- Create indexes for better query performance
CREATE INDEX idx_todo_item_checked ON todo_item(is_checked);
CREATE INDEX idx_todo_item_created_at ON todo_item(created_at);

-- Analyze tables
ANALYZE todo_item;

-- Vacuum database
VACUUM ANALYZE;
```

### Backend Optimization

Add to [application.properties](../../backend/src/main/resources/application.properties):

```properties
# Connection pooling
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000

# JPA optimization
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false
```

---

**Last Updated**: October 2025
**Maintained by**: Robert-Bogdan Fesko
