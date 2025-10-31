# System Architecture

## Overview

This Todo List application follows a modern **three-tier architecture** pattern with a clear separation of concerns between presentation, business logic, and data persistence layers.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│                      (React Frontend)                       │
│                    Port: 3000                              │
└─────────────────┬───────────────────────────────────────────┘
                  │ HTTP/REST API
                  │ (Axios)
┌─────────────────▼───────────────────────────────────────────┐
│                    Application Layer                        │
│                  (Spring Boot Backend)                      │
│                       Port: 8080                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            RESTful API Controllers                    │  │
│  └────────────────┬─────────────────────────────────────┘  │
│  ┌────────────────▼─────────────────────────────────────┐  │
│  │              Service Layer                            │  │
│  │          (Business Logic)                             │  │
│  └────────────────┬─────────────────────────────────────┘  │
│  ┌────────────────▼─────────────────────────────────────┐  │
│  │          Repository/DAO Layer                         │  │
│  │         (Data Access Object)                          │  │
│  └────────────────┬─────────────────────────────────────┘  │
└───────────────────┼─────────────────────────────────────────┘
                    │ JDBC
┌───────────────────▼─────────────────────────────────────────┐
│                    Data Layer                               │
│                 (PostgreSQL Database)                       │
│                      Port: 5432                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Observability Layer                        │
│                   (Jaeger Tracing)                          │
│                  Ports: 6831, 16686                        │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18.2** - Modern UI library with hooks
- **Axios** - Promise-based HTTP client
- **Material-UI (MUI)** - Component library for consistent design
- **TailwindCSS** - Utility-first CSS framework
- **Material-Tailwind** - Combined Material Design with Tailwind

### Backend
- **Spring Boot 3.1.5** - Enterprise Java framework
- **Java 17** - LTS version with modern features
- **Spring Data JPA** - Data persistence abstraction
- **PostgreSQL** - Robust relational database
- **Lombok** - Reduce boilerplate code
- **ModelMapper** - Object mapping library
- **Micrometer + Prometheus** - Metrics collection

### DevOps & Infrastructure
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Jaeger** - Distributed tracing
- **Maven** - Build automation and dependency management

## Design Patterns

### 1. **Layered Architecture**
The application follows a strict layered architecture:
- **Controller Layer**: Handles HTTP requests/responses
- **Service Layer**: Contains business logic
- **Repository Layer**: Manages data access
- **Model/Entity Layer**: Domain objects

### 2. **DTO Pattern**
Data Transfer Objects are used to:
- Decouple internal models from API contracts
- Control what data is exposed via API
- Enable versioning without breaking changes

### 3. **Repository Pattern**
- Abstracts data access logic
- Enables easier testing with mock repositories
- Provides clean separation between business and data layers

### 4. **Dependency Injection**
- Spring's IoC container manages object lifecycles
- Promotes loose coupling
- Facilitates testing with mock objects

## Component Interactions

### Create Todo Flow
```
1. User submits form (React)
   ↓
2. TodoPopup.js validates input
   ↓
3. Axios POST to /api/todos/add
   ↓
4. TodoItemController receives request
   ↓
5. TodoItemService processes business logic
   ↓
6. TodoItemDao persists to database
   ↓
7. Response flows back through layers
   ↓
8. React updates UI state
```

### Read/List Todos Flow
```
1. App.js useEffect on mount
   ↓
2. Axios GET to /api/todos
   ↓
3. TodoItemController handles request
   ↓
4. TodoItemService retrieves all items
   ↓
5. TodoItemDao queries database
   ↓
6. Entities converted to DTOs
   ↓
7. JSON response to frontend
   ↓
8. React renders TodoItem components
```

## Database Schema

### TodoItem Entity
```sql
CREATE TABLE todo_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    is_checked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- Primary key on `id` for fast lookups
- Consider adding index on `is_checked` for filtering completed items

## API Design

### RESTful Principles
- **Resource-oriented URLs**: `/api/todos`
- **HTTP methods**: GET, POST, PUT, DELETE
- **Stateless**: Each request contains all necessary information
- **JSON**: Standard data format

### Endpoint Design Philosophy
```
GET    /api/todos              → List all resources
POST   /api/todos/add          → Create new resource
GET    /api/todos/search       → Search/filter resources
PUT    /api/todos/update/{id}  → Update specific resource
DELETE /api/todos/delete       → Delete resource(s)
```

## Security Considerations

### Current Implementation
- **CORS Configuration**: Configured for localhost development
- **Input Validation**: Basic validation on both frontend and backend
- **SQL Injection Protection**: JPA/Hibernate prevents SQL injection

### Production Recommendations
- [ ] Add authentication (JWT/OAuth2)
- [ ] Implement rate limiting
- [ ] Add HTTPS/TLS
- [ ] Input sanitization
- [ ] CSRF protection
- [ ] Security headers (Helmet.js equivalent)

## Scalability Considerations

### Current Limitations
- Single database instance
- No caching layer
- No load balancing

### Scaling Path
1. **Horizontal Scaling**: Deploy multiple backend instances behind load balancer
2. **Database Replication**: Master-slave PostgreSQL setup
3. **Caching**: Add Redis for frequently accessed data
4. **CDN**: Serve static frontend assets via CDN
5. **Microservices**: Split into smaller services if needed

## Performance Optimizations

### Frontend
- **Code Splitting**: React lazy loading for routes
- **Memoization**: Use React.memo for expensive components
- **Debouncing**: Search input to reduce API calls
- **Virtual Scrolling**: For large todo lists

### Backend
- **Connection Pooling**: HikariCP (default in Spring Boot)
- **Query Optimization**: Use JPA projections for large datasets
- **Caching**: Spring Cache with @Cacheable
- **Async Processing**: @Async for non-blocking operations

### Database
- **Indexing**: Add indexes on frequently queried columns
- **Pagination**: Implement pagination for list endpoints
- **Query Optimization**: Use EXPLAIN to analyze slow queries

## Observability

### Distributed Tracing (Jaeger)
- Tracks request flow across services
- Identifies performance bottlenecks
- Visualizes service dependencies

### Metrics (Prometheus)
- Application-level metrics via Micrometer
- JVM metrics (heap, threads, GC)
- Custom business metrics

### Logging Strategy
```
Production: JSON structured logging
Development: Console with formatted output
Levels: ERROR, WARN, INFO, DEBUG, TRACE
```

## Development Workflow

### Local Development
1. Start all services with `docker-compose up`
2. Frontend hot reload on code changes
3. Backend restart via Spring DevTools

### Testing Strategy
- **Frontend**: Jest + React Testing Library
- **Backend**: JUnit 5 + Mockito
- **Integration**: TestContainers for database tests
- **E2E**: Consider Cypress or Playwright

### CI/CD Pipeline
```
1. Code Push
   ↓
2. GitHub Actions Trigger
   ↓
3. Build & Test (Maven + npm)
   ↓
4. Build Docker Images
   ↓
5. Push to Container Registry
   ↓
6. Deploy to Environment
```

## Configuration Management

### Environment Variables
```bash
# Backend
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
JAEGER_SERVICE_NAME
JAEGER_AGENT_HOST

# Frontend
REACT_APP_API_URL
REACT_APP_ENV
```

### Configuration Files
- `application.properties` - Spring Boot config
- `.env.local` / `.env.production` - React environment config
- `docker-compose.yml` - Service orchestration

## Future Enhancements

### Technical
- [ ] Add GraphQL API alongside REST
- [ ] Implement WebSocket for real-time updates
- [ ] Add server-side rendering (Next.js)
- [ ] Implement event sourcing pattern
- [ ] Add message queue (RabbitMQ/Kafka)

### Features
- [ ] User authentication and authorization
- [ ] Multi-tenant support
- [ ] Todo categories and tags
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Collaborative features (sharing, comments)
- [ ] Mobile app (React Native)

## Conclusion

This architecture provides a solid foundation for a production-ready application while maintaining simplicity and clarity. The separation of concerns, use of industry-standard patterns, and comprehensive observability make it an excellent showcase for full-stack development skills.

---

**Last Updated**: October 2025
**Author**: Robert Feo
