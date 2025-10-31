# API Documentation

## Base URL
```
Local Development: http://localhost:8080
Production: https://your-domain.com
```

## API Overview

The Todo List API provides a RESTful interface for managing todo items. All endpoints return JSON responses and accept JSON request bodies.

## Table of Contents
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [List All Todos](#list-all-todos)
  - [Create Todo](#create-todo)
  - [Search Todo](#search-todo)
  - [Update Todo](#update-todo)
  - [Delete Todo](#delete-todo)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Examples](#examples)

---

## Authentication

**Current Status**: No authentication required (suitable for demo/development)

**Production Recommendation**: Implement JWT-based authentication
```http
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### List All Todos

Retrieves all todo items from the database.

**Endpoint**: `GET /api/todos`

**Query Parameters**: None

**Request Headers**:
```http
Content-Type: application/json
```

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "isChecked": false
  },
  {
    "id": 2,
    "title": "Complete project documentation",
    "isChecked": true
  }
]
```

**cURL Example**:
```bash
curl -X GET http://localhost:8080/api/todos \
  -H "Content-Type: application/json"
```

**JavaScript Example**:
```javascript
const response = await fetch('http://localhost:8080/api/todos');
const todos = await response.json();
console.log(todos);
```

**Axios Example**:
```javascript
import axios from 'axios';

const getTodos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};
```

---

### Create Todo

Creates a new todo item.

**Endpoint**: `POST /api/todos/add`

**Request Headers**:
```http
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "New todo item",
  "isChecked": false
}
```

**Field Validation**:
- `title`: **Required**, String, max 255 characters
- `isChecked`: Optional, Boolean, defaults to `false`

**Response**: `201 Created`
```json
{
  "id": 3,
  "title": "New todo item",
  "isChecked": false
}
```

**Error Response**: `400 Bad Request`
```json
{
  "timestamp": "2025-10-31T10:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Title is required",
  "path": "/api/todos/add"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:8080/api/todos/add \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete API documentation",
    "isChecked": false
  }'
```

**JavaScript Example**:
```javascript
const createTodo = async (title) => {
  const response = await fetch('http://localhost:8080/api/todos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      isChecked: false
    })
  });
  return await response.json();
};
```

**Axios Example**:
```javascript
const createTodo = async (title) => {
  try {
    const response = await axios.post('http://localhost:8080/api/todos/add', {
      title: title,
      isChecked: false
    });
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};
```

---

### Search Todo

Search for todo items by title or ID.

**Endpoint**: `GET /api/todos/search`

**Query Parameters** (one required):
- `title`: String - Search by title (case-sensitive)
- `id`: Integer - Search by ID

**Request Headers**:
```http
Content-Type: application/json
```

**Response**: `200 OK`

**Search by Title**:
```json
{
  "id": 1,
  "title": "Buy groceries",
  "isChecked": false
}
```

**Search by ID**:
```json
{
  "id": 2,
  "title": "Complete project documentation",
  "isChecked": true
}
```

**Error Response**: `404 Not Found`
```json
{
  "timestamp": "2025-10-31T10:30:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Todo item not found",
  "path": "/api/todos/search"
}
```

**cURL Examples**:

Search by title:
```bash
curl -X GET "http://localhost:8080/api/todos/search?title=Buy%20groceries" \
  -H "Content-Type: application/json"
```

Search by ID:
```bash
curl -X GET "http://localhost:8080/api/todos/search?id=1" \
  -H "Content-Type: application/json"
```

**JavaScript Example**:
```javascript
const searchTodoByTitle = async (title) => {
  const response = await fetch(
    `http://localhost:8080/api/todos/search?title=${encodeURIComponent(title)}`
  );
  return await response.json();
};

const searchTodoById = async (id) => {
  const response = await fetch(
    `http://localhost:8080/api/todos/search?id=${id}`
  );
  return await response.json();
};
```

**Axios Example**:
```javascript
const searchTodo = async (params) => {
  try {
    const response = await axios.get('http://localhost:8080/api/todos/search', {
      params: params // { title: 'search term' } or { id: 1 }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching todo:', error);
    throw error;
  }
};
```

---

### Update Todo

Updates an existing todo item.

**Endpoint**: `PUT /api/todos/update/{id}`

**Path Parameters**:
- `id`: Integer - The ID of the todo item to update

**Request Headers**:
```http
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Updated title",
  "isChecked": true
}
```

**Field Validation**:
- `title`: Optional, String, max 255 characters
- `isChecked`: Optional, Boolean

**Response**: `200 OK`
```json
{
  "id": 1,
  "title": "Updated title",
  "isChecked": true
}
```

**Error Response**: `404 Not Found`
```json
{
  "timestamp": "2025-10-31T10:30:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Todo item with id 999 not found",
  "path": "/api/todos/update/999"
}
```

**cURL Example**:
```bash
curl -X PUT http://localhost:8080/api/todos/update/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and cook dinner",
    "isChecked": true
  }'
```

**JavaScript Example**:
```javascript
const updateTodo = async (id, updates) => {
  const response = await fetch(`http://localhost:8080/api/todos/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates)
  });
  return await response.json();
};

// Usage
await updateTodo(1, {
  title: "Updated title",
  isChecked: true
});
```

**Axios Example**:
```javascript
const updateTodo = async (id, updates) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/todos/update/${id}`,
      updates
    );
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};
```

---

### Delete Todo

Deletes a todo item by title or ID.

**Endpoint**: `DELETE /api/todos/delete`

**Query Parameters** (one required):
- `title`: String - Delete by title
- `id`: Integer - Delete by ID

**Request Headers**:
```http
Content-Type: application/json
```

**Response**: `200 OK`
```json
{
  "message": "Todo item deleted successfully",
  "deletedId": 1
}
```

**Error Response**: `404 Not Found`
```json
{
  "timestamp": "2025-10-31T10:30:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Todo item not found",
  "path": "/api/todos/delete"
}
```

**cURL Examples**:

Delete by title:
```bash
curl -X DELETE "http://localhost:8080/api/todos/delete?title=Buy%20groceries" \
  -H "Content-Type: application/json"
```

Delete by ID:
```bash
curl -X DELETE "http://localhost:8080/api/todos/delete?id=1" \
  -H "Content-Type: application/json"
```

**JavaScript Example**:
```javascript
const deleteTodoByTitle = async (title) => {
  const response = await fetch(
    `http://localhost:8080/api/todos/delete?title=${encodeURIComponent(title)}`,
    { method: 'DELETE' }
  );
  return await response.json();
};

const deleteTodoById = async (id) => {
  const response = await fetch(
    `http://localhost:8080/api/todos/delete?id=${id}`,
    { method: 'DELETE' }
  );
  return await response.json();
};
```

**Axios Example**:
```javascript
const deleteTodo = async (params) => {
  try {
    const response = await axios.delete('http://localhost:8080/api/todos/delete', {
      params: params // { title: 'todo title' } or { id: 1 }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
```

---

## Data Models

### TodoItem

**Entity Structure**:
```java
public class TodoItem {
    private Integer id;           // Auto-generated
    private String title;         // Required, max 255 chars
    private boolean isChecked;    // Default: false
    private Timestamp createdAt;  // Auto-generated
    private Timestamp updatedAt;  // Auto-updated
}
```

**DTO Structure** (API responses):
```json
{
  "id": 1,
  "title": "Todo item title",
  "isChecked": false
}
```

**Field Descriptions**:
- `id`: Unique identifier, auto-incremented integer
- `title`: The todo item text/description
- `isChecked`: Completion status of the todo item

---

## Error Handling

### Standard Error Response Format

All errors follow this structure:
```json
{
  "timestamp": "2025-10-31T10:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed error message",
  "path": "/api/todos/endpoint"
}
```

### HTTP Status Codes

| Code | Description | When Used |
|------|-------------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid request body or parameters |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Unexpected server error |

### Common Error Scenarios

**Missing Required Field**:
```bash
POST /api/todos/add
Body: { "isChecked": false }

Response: 400 Bad Request
{
  "message": "Title is required"
}
```

**Invalid ID Format**:
```bash
GET /api/todos/search?id=abc

Response: 400 Bad Request
{
  "message": "Invalid ID format"
}
```

**Todo Not Found**:
```bash
PUT /api/todos/update/999

Response: 404 Not Found
{
  "message": "Todo item with id 999 not found"
}
```

---

## Rate Limiting

**Current Status**: No rate limiting implemented

**Production Recommendation**:
```
Rate Limit: 100 requests per minute per IP
Headers:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1635724800
```

---

## Examples

### Complete Frontend Integration Example

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

class TodoService {
  // Get all todos
  async getAllTodos() {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  }

  // Create new todo
  async createTodo(title) {
    const response = await axios.post(`${API_BASE_URL}/todos/add`, {
      title,
      isChecked: false
    });
    return response.data;
  }

  // Update todo
  async updateTodo(id, updates) {
    const response = await axios.put(
      `${API_BASE_URL}/todos/update/${id}`,
      updates
    );
    return response.data;
  }

  // Toggle todo checked status
  async toggleTodo(id, currentStatus) {
    return this.updateTodo(id, { isChecked: !currentStatus });
  }

  // Delete todo
  async deleteTodo(id) {
    const response = await axios.delete(`${API_BASE_URL}/todos/delete`, {
      params: { id }
    });
    return response.data;
  }

  // Search todo by title
  async searchTodoByTitle(title) {
    const response = await axios.get(`${API_BASE_URL}/todos/search`, {
      params: { title }
    });
    return response.data;
  }
}

export default new TodoService();
```

### React Hook Example

```javascript
import { useState, useEffect } from 'react';
import TodoService from './services/TodoService';

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await TodoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const newTodo = await TodoService.createTodo(title);
      setTodos([...todos, newTodo]);
      return newTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const toggleTodo = async (id, isChecked) => {
    try {
      const updated = await TodoService.toggleTodo(id, isChecked);
      setTodos(todos.map(todo =>
        todo.id === id ? updated : todo
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: loadTodos
  };
}

export default useTodos;
```

---

## Testing the API

### Using Postman

1. **Import Collection**: Create a Postman collection with all endpoints
2. **Set Base URL**: Configure environment variable for `base_url`
3. **Test Endpoints**: Run requests and verify responses

### Using cURL

Complete test sequence:
```bash
# 1. List all todos (should be empty initially)
curl -X GET http://localhost:8080/api/todos

# 2. Create first todo
curl -X POST http://localhost:8080/api/todos/add \
  -H "Content-Type: application/json" \
  -d '{"title": "First todo", "isChecked": false}'

# 3. Create second todo
curl -X POST http://localhost:8080/api/todos/add \
  -H "Content-Type: application/json" \
  -d '{"title": "Second todo", "isChecked": false}'

# 4. List all todos (should show 2 items)
curl -X GET http://localhost:8080/api/todos

# 5. Search by title
curl -X GET "http://localhost:8080/api/todos/search?title=First%20todo"

# 6. Update todo
curl -X PUT http://localhost:8080/api/todos/update/1 \
  -H "Content-Type: application/json" \
  -d '{"isChecked": true}'

# 7. Delete todo
curl -X DELETE "http://localhost:8080/api/todos/delete?id=2"

# 8. Verify deletion
curl -X GET http://localhost:8080/api/todos
```

---

## API Versioning

**Current**: v1 (implicit)

**Future Recommendation**: Implement explicit versioning
```
http://localhost:8080/api/v1/todos
http://localhost:8080/api/v2/todos
```

---

## CORS Configuration

**Current Configuration** (Backend):
```java
@CrossOrigin(origins = "http://localhost:3000")
```

**Production Configuration**:
```java
@CrossOrigin(
  origins = {"https://your-domain.com", "https://app.your-domain.com"},
  methods = {GET, POST, PUT, DELETE},
  allowedHeaders = "*",
  allowCredentials = "true"
)
```

---

## Health Check & Monitoring

### Health Endpoint (Spring Actuator)
```bash
GET /actuator/health

Response: 200 OK
{
  "status": "UP"
}
```

### Metrics Endpoint
```bash
GET /actuator/metrics

Response: Available metrics list
```

---

## Best Practices

### Request Best Practices
1. Always set `Content-Type: application/json` header
2. Use HTTPS in production
3. Implement request timeout (30 seconds recommended)
4. Handle network errors gracefully
5. Implement retry logic for failed requests

### Response Handling
1. Always check HTTP status code
2. Parse error responses properly
3. Display user-friendly error messages
4. Log errors for debugging

### Performance Tips
1. Cache responses when appropriate
2. Implement pagination for large lists
3. Use optimistic UI updates
4. Debounce search requests

---

**API Version**: 1.0.0
**Last Updated**: October 2025
**Author**: Robert Feo
**Support**: [GitHub Issues](https://github.com/robertfeo/hse-distsys-ws23/issues)
