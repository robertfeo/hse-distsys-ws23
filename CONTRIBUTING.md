# Contributing to Todo List Application

First off, thank you for considering contributing to this project! It's people like you that make this application better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [your.email@example.com](mailto:your.email@example.com).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Git**
- **Docker** and **Docker Compose**
- **Node.js** (18.0+) and **npm**
- **Java JDK** (17+) and **Maven** (3.6+)
- A code editor (VS Code, IntelliJ IDEA, etc.)

### Fork and Clone

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/hse-distsys-ws23.git
   cd hse-distsys-ws23
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/robertfeo/hse-distsys-ws23.git
   ```

4. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Local Development Setup

1. **Start the development environment**:
   ```bash
   docker-compose up --build
   ```

2. **For backend development**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

3. **For frontend development**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Development Process

### 1. Find or Create an Issue

- Check the [Issues](https://github.com/robertfeo/hse-distsys-ws23/issues) page for existing issues
- If you find an issue you'd like to work on, comment on it to let others know
- For new features or bugs, create a new issue first to discuss the changes

### 2. Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/add-authentication`)
- `fix/` - Bug fixes (e.g., `fix/todo-delete-error`)
- `docs/` - Documentation only (e.g., `docs/update-api-docs`)
- `refactor/` - Code refactoring (e.g., `refactor/service-layer`)
- `test/` - Adding or updating tests (e.g., `test/controller-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### 3. Make Your Changes

- Write clean, readable code
- Follow the project's coding standards (see below)
- Add tests for new features
- Update documentation as needed
- Commit your changes with clear, descriptive messages

### 4. Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(backend): add user authentication endpoint

- Implement JWT authentication
- Add user login and registration
- Update API documentation

Closes #123
```

```bash
fix(frontend): resolve todo deletion issue

The delete button was not properly triggering the API call.
Fixed by adding proper error handling and state management.

Fixes #456
```

### 5. Keep Your Fork Updated

```bash
git fetch upstream
git rebase upstream/main
```

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**:
   ```bash
   # Backend tests
   cd backend && mvn test

   # Frontend tests
   cd frontend && npm test
   ```

2. **Run the linter**:
   ```bash
   # Frontend
   npm run lint
   ```

3. **Update documentation** if you've made changes to:
   - API endpoints
   - Configuration options
   - Installation steps
   - Architecture

4. **Test manually**:
   - Start the full application with `docker-compose up`
   - Verify your changes work as expected
   - Test edge cases

### Submitting a Pull Request

1. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub from your fork to the main repository

3. **Fill out the PR template** with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Reference to related issues (e.g., "Closes #123")
   - Screenshots or GIFs if applicable
   - Checklist of completed items

4. **Wait for review**:
   - A maintainer will review your PR
   - Address any requested changes
   - Once approved, your PR will be merged

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Related Issues
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots or GIFs here

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally
- [ ] My changes generate no new warnings
```

## Coding Standards

### Java/Spring Boot (Backend)

**Code Style:**
- Use **4 spaces** for indentation
- Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Maximum line length: **120 characters**
- Use meaningful variable and method names

**Best Practices:**
```java
// Good
public class TodoItemService {
    private final TodoItemDao todoItemDao;

    @Autowired
    public TodoItemService(TodoItemDao todoItemDao) {
        this.todoItemDao = todoItemDao;
    }

    public TodoItemDto createTodoItem(TodoItemDto dto) {
        // Implementation
    }
}

// Avoid
public class service {
    @Autowired
    TodoItemDao dao;

    public TodoItemDto create(TodoItemDto x) {
        // Implementation
    }
}
```

**Annotations:**
- Use `@RestController` for REST controllers
- Use `@Service` for service layer
- Use `@Repository` for data access layer
- Always use `@Autowired` for constructor injection

**Error Handling:**
```java
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleResourceNotFound(
    ResourceNotFoundException ex
) {
    ErrorResponse error = new ErrorResponse(
        HttpStatus.NOT_FOUND.value(),
        ex.getMessage(),
        System.currentTimeMillis()
    );
    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
}
```

### JavaScript/React (Frontend)

**Code Style:**
- Use **2 spaces** for indentation
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use **ES6+** features (arrow functions, destructuring, etc.)
- Maximum line length: **100 characters**

**Best Practices:**
```javascript
// Good
const TodoItem = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id, todo.isChecked);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.isChecked}
        onChange={handleToggle}
      />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

// Avoid
function TodoItem(props) {
  return (
    <div>
      <input type="checkbox" checked={props.todo.isChecked}
        onChange={() => props.onToggle(props.todo.id, props.todo.isChecked)} />
      <span>{props.todo.title}</span>
      <button onClick={() => props.onDelete(props.todo.id)}>Delete</button>
    </div>
  )
}
```

**React Hooks:**
- Use functional components with hooks
- Extract custom hooks for reusable logic
- Use `useEffect` cleanup for side effects

**Component Organization:**
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 2. Component definition
const MyComponent = () => {
  // 3. State declarations
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 4. Effects
  useEffect(() => {
    fetchData();
  }, []);

  // 5. Helper functions
  const fetchData = async () => {
    // Implementation
  };

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 7. Export
export default MyComponent;
```

### SQL/Database

- Use **snake_case** for table and column names
- Always use prepared statements (JPA handles this)
- Add indexes for frequently queried columns
- Document complex queries

## Testing Guidelines

### Backend Tests (JUnit 5 + Mockito)

**Unit Tests:**
```java
@ExtendWith(MockitoExtension.class)
class TodoItemServiceTest {

    @Mock
    private TodoItemDao todoItemDao;

    @InjectMocks
    private TodoItemService todoItemService;

    @Test
    void shouldCreateTodoItem() {
        // Given
        TodoItemDto dto = new TodoItemDto();
        dto.setTitle("Test Todo");

        TodoItem entity = new TodoItem();
        entity.setTitle("Test Todo");

        when(todoItemDao.save(any())).thenReturn(entity);

        // When
        TodoItemDto result = todoItemService.createTodoItem(dto);

        // Then
        assertNotNull(result);
        assertEquals("Test Todo", result.getTitle());
        verify(todoItemDao, times(1)).save(any());
    }
}
```

**Integration Tests:**
```java
@SpringBootTest
@AutoConfigureMockMvc
class TodoItemControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldGetAllTodos() throws Exception {
        mockMvc.perform(get("/api/todos"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}
```

### Frontend Tests (Jest + React Testing Library)

**Component Tests:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    isChecked: false
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  it('should render todo item', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('should call onToggle when checkbox is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnToggle).toHaveBeenCalledWith(1, false);
  });
});
```

**API Tests:**
```javascript
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getTodos, createTodo } from './todos';

describe('Todo API', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should fetch todos', async () => {
    const todos = [{ id: 1, title: 'Test', isChecked: false }];
    mock.onGet('/api/todos').reply(200, todos);

    const result = await getTodos();
    expect(result).toEqual(todos);
  });
});
```

### Test Coverage

Aim for:
- **80%+ line coverage**
- **70%+ branch coverage**
- **100% coverage for critical paths**

## Documentation

### Code Documentation

**Java/Backend:**
```java
/**
 * Service class for managing todo items.
 * Provides CRUD operations and business logic for todos.
 *
 * @author Robert Feo
 * @version 1.0
 */
@Service
public class TodoItemService {

    /**
     * Creates a new todo item.
     *
     * @param dto The todo item data transfer object
     * @return The created todo item with generated ID
     * @throws IllegalArgumentException if title is null or empty
     */
    public TodoItemDto createTodoItem(TodoItemDto dto) {
        // Implementation
    }
}
```

**JavaScript/Frontend:**
```javascript
/**
 * Custom hook for managing todo items.
 * Provides state management and CRUD operations.
 *
 * @returns {Object} Todo state and operations
 * @returns {Array} todos - List of todo items
 * @returns {boolean} loading - Loading state
 * @returns {Function} addTodo - Function to add a todo
 * @returns {Function} toggleTodo - Function to toggle todo status
 * @returns {Function} deleteTodo - Function to delete a todo
 */
const useTodos = () => {
  // Implementation
};
```

### API Documentation

When adding or modifying endpoints, update:
- [docs/api/API_DOCUMENTATION.md](docs/api/API_DOCUMENTATION.md)
- Include request/response examples
- Document all error cases
- Add cURL examples

### Architecture Documentation

For significant architectural changes, update:
- [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)
- Include diagrams if applicable
- Explain design decisions
- Document trade-offs

## Community

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/robertfeo/hse-distsys-ws23/issues)
- **Discussions**: [GitHub Discussions](https://github.com/robertfeo/hse-distsys-ws23/discussions)
- **Email**: [your.email@example.com](mailto:your.email@example.com)

### Recognition

Contributors will be recognized in:
- Project README
- Release notes
- GitHub contributors page

Thank you for contributing! Your efforts help make this project better for everyone.

---

**Questions?** Feel free to open an issue or reach out to the maintainers.
