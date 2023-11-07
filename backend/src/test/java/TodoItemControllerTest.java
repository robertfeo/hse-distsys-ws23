import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.todolist.backend.controller.TodoItemController;
import com.todolist.backend.model.TodoItem;
import com.todolist.backend.service.TodoItemService;

@RunWith(MockitoJUnitRunner.class)
public class TodoItemControllerTest {

    @InjectMocks
    private TodoItemController todoItemController;

    @Mock
    private TodoItemService todoItemService;

    @Test
    public void getAllTodosTest() {
        List<TodoItem> list = new ArrayList<>();
        TodoItem item1 = new TodoItem(1, "Todo 1", false);
        TodoItem item2 = new TodoItem(2, "Todo 2", true);
        list.add(item1);
        list.add(item2);
        when(todoItemService.findAll()).thenReturn(new ResponseEntity<>(list, HttpStatus.OK));
        ResponseEntity<List<TodoItem>> response = todoItemController.getAllTodos();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<TodoItem> todoItems = response.getBody();
        assertNotNull(todoItems);
        assertEquals(2, todoItems.size());
    }

    @Test
    public void addToDoItemTest() {
        TodoItem todoItem = new TodoItem(1, "New Todo", false);
        when(todoItemService.addToDoItem(todoItem))
                .thenReturn(new ResponseEntity<>("Todo item added", HttpStatus.CREATED));
        ResponseEntity<String> response = todoItemController.addToDoItem(todoItem);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Todo item added", response.getBody());
    }

    @Test
    public void searchTodoItemByTitleTest() {
        String title = "Todo 1";
        when(todoItemService.getTodoItem(title, null))
                .thenReturn(new ResponseEntity<>(Collections.singletonList(new TodoItem()), HttpStatus.OK));
        ResponseEntity<List<TodoItem>> response = todoItemController.searchTodoItem(title, null);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<TodoItem> items = response.getBody();
        assertNotNull(items);
        assertEquals(1, items.size());
    }

    @Test
    public void searchTodoItemByIdTest() {
        Integer id = 1;
        when(todoItemService.getTodoItem(null, id))
                .thenReturn(new ResponseEntity<>(Collections.singletonList(new TodoItem()), HttpStatus.OK));
        ResponseEntity<List<TodoItem>> response = todoItemController.searchTodoItem(null, id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<TodoItem> items = response.getBody();
        assertNotNull(items);
        assertEquals(1, items.size());
    }

    @Test
    public void searchTodoItemNoParamsTest() {
        ResponseEntity<List<TodoItem>> response = todoItemController.searchTodoItem(null, null);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void deleteTodoItemByTitleTest() {
        String title = "Todo 1";
        when(todoItemService.deleteTodoItem(title, null)).thenReturn(new ResponseEntity<>("Deleted", HttpStatus.OK));
        ResponseEntity<String> response = todoItemController.deleteTodoItem(title, null);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Deleted", response.getBody());
    }

    @Test
    public void deleteTodoItemByIdTest() {
        Integer id = 1;
        when(todoItemService.deleteTodoItem(null, id)).thenReturn(new ResponseEntity<>("Deleted", HttpStatus.OK));
        ResponseEntity<String> response = todoItemController.deleteTodoItem(null, id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Deleted", response.getBody());
    }

    @Test
    public void deleteTodoItemNoParamsTest() {
        ResponseEntity<String> response = todoItemController.deleteTodoItem(null, null);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void updateTodoItemTest() {
        Integer id = 1;
        TodoItem updatedItem = new TodoItem(1, "Updated title", true);
        when(todoItemService.updateTodoItem(id, updatedItem))
                .thenReturn(new ResponseEntity<>(updatedItem, HttpStatus.OK));
        ResponseEntity<TodoItem> response = todoItemController.updateTodoItem(id, updatedItem);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        TodoItem item = response.getBody();
        assertNotNull(item);
        assertEquals("Updated title", item.getTitle());
        assertTrue(item.isChecked());
    }

    @Test
    public void updateTodoItemNotFoundTest() {
        Integer id = 1;
        TodoItem updatedItem = new TodoItem();
        when(todoItemService.updateTodoItem(id, updatedItem))
                .thenReturn(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
        ResponseEntity<TodoItem> response = todoItemController.updateTodoItem(id, updatedItem);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}