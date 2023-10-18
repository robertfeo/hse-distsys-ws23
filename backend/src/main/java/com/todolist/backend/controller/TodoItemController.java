package com.todolist.backend.controller;

import com.todolist.backend.model.TodoItem;
import com.todolist.backend.service.TodoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("todos")
public class TodoItemController {
    @Autowired
    TodoItemService todoItemService;

    @GetMapping
    public ResponseEntity<List<TodoItem>> getAllTodos() {
        return todoItemService.findAll();
    }
}
