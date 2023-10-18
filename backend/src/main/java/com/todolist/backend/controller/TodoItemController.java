package com.todolist.backend.controller;

import com.todolist.backend.model.TodoItem;
import com.todolist.backend.service.TodoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoItemController {

    @Autowired
    private final TodoItemService todoItemService;

    public TodoItemController(TodoItemService todoItemService) {
        this.todoItemService = todoItemService;
    }

    // Get all Todo Items
    @GetMapping
    public ResponseEntity<List<TodoItem>> getAllTodos() {
        return new ResponseEntity<>(todoItemService.findAll(), HttpStatus.OK);
    }
}
