package com.todolist.backend.controller;

import com.todolist.backend.model.TodoItem;
import com.todolist.backend.service.TodoItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoItemController {

    @Autowired
    TodoItemService todoItemService;

    @GetMapping
    public ResponseEntity<List<TodoItem>> getAllTodos() {
        return todoItemService.findAll();
    }

    @GetMapping("search")
    public ResponseEntity<List<TodoItem>> searchTodoItem(@RequestParam(required = false) String title,
            @RequestParam(required = false) Integer id) {
        if (title == null && id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return todoItemService.getTodoItem(title, id);
    }

    @PostMapping("add")
    public ResponseEntity<String> addToDoItem(@RequestBody TodoItem todoItem) {
        return todoItemService.addToDoItem(todoItem);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteTodoItem(@RequestParam(required = false) String title,
            @RequestParam(required = false) Integer id) {
        if (title == null && id == null) {
            return new ResponseEntity<>("Either title or id must be provided.", HttpStatus.BAD_REQUEST);
        }
        return todoItemService.deleteTodoItem(title, id);
    }
}
