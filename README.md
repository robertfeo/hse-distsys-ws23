<div align="center">
  <img src="https://i.imgur.com/SgXHmek.png" width="120px">
  <h1>🚀 Enterprise Todo List Application</h1>
  <p><strong>A production-ready fullstack application showcasing modern web development practices</strong></p>

  [![CI/CD Pipeline](https://github.com/robertfeo/hse-distsys-ws23/actions/workflows/pipeline.yml/badge.svg)](https://github.com/robertfeo/hse-distsys-ws23/actions/workflows/pipeline.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-green.svg)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
  [![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Observability](#-observability)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

A **modern, scalable, and production-ready** Todo List application that demonstrates best practices in fullstack development. Built with enterprise-grade technologies and featuring comprehensive observability, automated CI/CD, and containerized deployment.

### 🎓 Project Purpose

This project was developed as part of the **HSE Distributed Systems course (Winter Semester 2023)** and has been continuously improved to showcase professional software development skills suitable for industry positions.

### 💼 Why This Project Stands Out

- ✅ **Production-Ready Architecture**: Clean layered architecture with separation of concerns
- ✅ **Enterprise Technologies**: Spring Boot, React, PostgreSQL, Docker
- ✅ **Observability Built-In**: Jaeger distributed tracing, Prometheus metrics
- ✅ **Automated CI/CD**: GitHub Actions pipeline with automated testing and deployment
- ✅ **Comprehensive Documentation**: Architecture diagrams, API docs, deployment guides
- ✅ **Best Practices**: RESTful API design, DTO pattern, error handling, testing
- ✅ **Containerized**: Docker Compose for one-command deployment

---

## ✨ Key Features

### Application Features
- 📝 **CRUD Operations**: Create, read, update, and delete todo items
- ✓ **Toggle Completion**: Mark tasks as complete/incomplete
- 🔍 **Search Functionality**: Find todos by title or ID
- 🎨 **Modern UI**: Responsive design with Material-UI and TailwindCSS
- ⚡ **Real-Time Updates**: Instant UI feedback on all operations

### Technical Features
- 🏗️ **Microservices-Ready**: Loosely coupled frontend and backend
- 🔄 **RESTful API**: Well-designed REST endpoints
- 💾 **Data Persistence**: PostgreSQL with JPA/Hibernate
- 🐳 **Containerized**: Docker and Docker Compose setup
- 📊 **Distributed Tracing**: Jaeger integration for request tracking
- 📈 **Metrics Collection**: Prometheus integration
- 🔄 **CI/CD Pipeline**: Automated testing and deployment
- 🧪 **Comprehensive Testing**: Unit and integration tests

---

## 🛠️ Technology Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

- **React 18.2** - Modern UI library with hooks
- **Axios** - HTTP client for API communication
- **Material-UI** - Component library
- **TailwindCSS** - Utility-first CSS framework
- **Jest** - Testing framework

### Backend
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

- **Spring Boot 3.1.5** - Enterprise application framework
- **Java 17** - LTS version with modern language features
- **Spring Data JPA** - Data persistence layer
- **PostgreSQL** - Production-grade relational database
- **Lombok** - Reduce boilerplate code
- **Maven** - Build automation and dependency management

### DevOps & Infrastructure
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD automation
- **Jaeger** - Distributed tracing
- **Prometheus** - Metrics collection
- **Micrometer** - Application metrics

---

## 🏛️ Architecture

### High-Level Architecture

```
┌─────────────┐      HTTP/REST      ┌─────────────┐      JDBC      ┌─────────────┐
│   React     │ ◄──────────────────► │   Spring    │ ◄─────────────► │ PostgreSQL  │
│   Frontend  │     (Port 3000)      │   Backend   │  (Port 8080)    │  Database   │
│             │                      │             │                 │  (Port 5432)│
└─────────────┘                      └──────┬──────┘                 └─────────────┘
                                            │
                                            │ Traces
                                            ▼
                                     ┌─────────────┐
                                     │   Jaeger    │
                                     │   Tracing   │
                                     │ (Port 16686)│
                                     └─────────────┘
```

### Layered Architecture

**Frontend Layers:**
```
UI Components → API Service Layer → Axios HTTP Client
```

**Backend Layers:**
```
Controllers → Services → Repositories → Database
```

📖 **Detailed Architecture Documentation**: [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Docker** (version 20.0+)
- **Docker Compose** (version 2.0+)
- **Git**

Optional for local development:
- **Node.js** (18.0+) and **npm**
- **Java JDK** (17+) and **Maven** (3.6+)

### One-Command Deployment

```bash
# Clone the repository
git clone https://github.com/robertfeo/hse-distsys-ws23.git
cd hse-distsys-ws23

# Start all services
docker-compose up --build
```

**That's it!** The application will be available at:
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8080/api
- 📊 **Jaeger UI**: http://localhost:16686

### Stopping the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clear database)
docker-compose down -v
```

---

## 📁 Project Structure

```
hse-distsys-ws23/
├── 📂 frontend/                # React frontend application
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable React components
│   │   ├── 📂 api/            # API service layer
│   │   ├── App.js             # Main application component
│   │   └── index.js           # Entry point
│   ├── 📂 public/             # Static assets
│   ├── package.json           # npm dependencies
│   ├── tailwind.config.js     # TailwindCSS configuration
│   └── Dockerfile             # Frontend container config
│
├── 📂 backend/                # Spring Boot backend
│   ├── 📂 src/
│   │   ├── 📂 main/java/com/todolist/backend/
│   │   │   ├── 📂 controller/ # REST API controllers
│   │   │   ├── 📂 service/    # Business logic
│   │   │   ├── 📂 repository/ # Data access layer
│   │   │   ├── 📂 model/      # JPA entities
│   │   │   ├── 📂 dto/        # Data transfer objects
│   │   │   ├── 📂 config/     # Configuration classes
│   │   │   └── BackendApplication.java
│   │   └── 📂 test/           # Unit and integration tests
│   ├── pom.xml                # Maven dependencies
│   └── Dockerfile             # Backend container config
│
├── 📂 docs/                   # Comprehensive documentation
│   ├── 📂 api/                # API documentation
│   ├── 📂 architecture/       # Architecture diagrams
│   ├── 📂 deployment/         # Deployment guides
│   └── 📂 screenshots/        # Application screenshots
│
├── 📂 .github/
│   └── 📂 workflows/          # CI/CD pipeline
│       ├── pipeline.yml       # Main CI/CD workflow
│       └── publish.yml        # Docker publish workflow
│
├── docker-compose.yml         # Multi-container orchestration
├── README.md                  # This file
├── LICENSE                    # MIT License
├── CONTRIBUTING.md            # Contribution guidelines
└── CODE_OF_CONDUCT.md         # Community guidelines
```

---

## 📚 API Documentation

### Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | List all todo items |
| `POST` | `/api/todos/add` | Create a new todo |
| `GET` | `/api/todos/search` | Search by title or ID |
| `PUT` | `/api/todos/update/{id}` | Update a todo item |
| `DELETE` | `/api/todos/delete` | Delete a todo item |

### Example API Calls

**Create a Todo:**
```bash
curl -X POST http://localhost:8080/api/todos/add \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "isChecked": false}'
```

**Get All Todos:**
```bash
curl -X GET http://localhost:8080/api/todos
```

**Update a Todo:**
```bash
curl -X PUT http://localhost:8080/api/todos/update/1 \
  -H "Content-Type: application/json" \
  -d '{"isChecked": true}'
```

📖 **Complete API Documentation**: [docs/api/API_DOCUMENTATION.md](docs/api/API_DOCUMENTATION.md)

---

## 💻 Development

### Local Development Setup

#### Backend Development

```bash
cd backend

# Run PostgreSQL with Docker
docker run -d \
  -e POSTGRES_DB=todolist \
  -e POSTGRES_USER=robert \
  -e POSTGRES_PASSWORD=securepassword \
  -p 5432:5432 \
  postgres:15-alpine

# Build and run the application
mvn clean install
mvn spring-boot:run
```

Backend will be available at: http://localhost:8080

#### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will be available at: http://localhost:3000

### Environment Variables

#### Backend (.env or application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/todolist
spring.datasource.username=robert
spring.datasource.password=securepassword
spring.jpa.hibernate.ddl-auto=update
```

#### Frontend (.env.local)
```bash
REACT_APP_API_URL=http://localhost:8080
```

### Hot Reload

- **Frontend**: React automatically reloads on file changes
- **Backend**: Use Spring Boot DevTools for automatic restart

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
mvn test

# Run with coverage
mvn test jacoco:report

# Run specific test
mvn test -Dtest=TodoItemControllerTest
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- todos.test.js
```

### Integration Tests

```bash
# Start all services
docker-compose up -d

# Run integration test suite
./run-integration-tests.sh
```

---

## 🚢 Deployment

### Docker Deployment (Recommended)

The easiest way to deploy is using Docker Compose:

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

#### Deploy Backend

```bash
cd backend
mvn clean package -DskipTests
java -jar target/backend-v1.0.0.jar
```

#### Deploy Frontend

```bash
cd frontend
npm run build
# Serve the 'build' folder with nginx or your preferred web server
```

### Cloud Deployment

Guides available for:
- ☁️ **AWS (EC2, ECS, RDS)**: [docs/deployment/AWS.md](docs/deployment/AWS.md)
- 🔵 **Azure (App Service)**: [docs/deployment/AZURE.md](docs/deployment/AZURE.md)
- 🌐 **Google Cloud Platform**: [docs/deployment/GCP.md](docs/deployment/GCP.md)
- 🎯 **DigitalOcean**: [docs/deployment/DIGITALOCEAN.md](docs/deployment/DIGITALOCEAN.md)

---

## 📊 Observability

### Distributed Tracing with Jaeger

Access Jaeger UI at: http://localhost:16686

**Features:**
- 🔍 Trace request flows across services
- 📈 Identify performance bottlenecks
- 🐛 Debug distributed transactions
- 📊 Visualize service dependencies

**Example Queries:**
- Service: `todo-list-backend`
- Operation: `GET /api/todos`
- Lookback: `1h`

### Metrics with Prometheus

Backend exposes metrics at: http://localhost:8080/actuator/prometheus

**Key Metrics:**
- JVM memory usage
- HTTP request rates
- Database connection pool
- Custom business metrics

### Health Checks

```bash
# Backend health
curl http://localhost:8080/actuator/health

# Database connectivity
curl http://localhost:8080/actuator/health/db
```

---

## 🔧 Configuration

### Database Configuration

**Docker Compose** (default):
```yaml
database:
  POSTGRES_DB: todolist
  POSTGRES_USER: robert
  POSTGRES_PASSWORD: securepassword
```

**Production**: Use environment variables or secrets management

### CORS Configuration

Default allows `http://localhost:3000`. For production:

```java
@CrossOrigin(origins = {"https://yourdomain.com"})
```

### Logging Configuration

```properties
# application.properties
logging.level.root=INFO
logging.level.com.todolist=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation
- Keep commits atomic and descriptive

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2023-2025 Robert Feo
```

---

## 👨‍💻 Contact

**Robert Feo**

- 📧 Email: [your.email@example.com](mailto:your.email@example.com)
- 💼 LinkedIn: [linkedin.com/in/robertfeo](https://linkedin.com/in/robertfeo)
- 🐙 GitHub: [@robertfeo](https://github.com/robertfeo)
- 🌐 Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- **HSE University** - Distributed Systems Course (WS 2023)
- **Spring Boot Team** - Excellent documentation
- **React Team** - Amazing framework
- **Open Source Community** - For all the great tools

---

## 📈 Project Status

- ✅ **Core Features**: Complete
- ✅ **Documentation**: Comprehensive
- ✅ **Testing**: Unit & Integration tests
- ✅ **CI/CD**: Automated pipeline
- ✅ **Containerization**: Docker ready
- 🚧 **Authentication**: Planned enhancement
- 🚧 **Real-time Updates**: WebSocket integration planned

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐️!

[![Star History Chart](https://api.star-history.com/svg?repos=robertfeo/hse-distsys-ws23&type=Date)](https://star-history.com/#robertfeo/hse-distsys-ws23&Date)

---

<div align="center">
  <p>Made with ❤️ and ☕ by Robert Feo</p>
  <p>
    <a href="#-table-of-contents">Back to Top ⬆️</a>
  </p>
</div>
