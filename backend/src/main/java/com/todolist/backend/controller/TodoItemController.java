package com.todolist.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.backend.model.TodoItem;
import com.todolist.backend.service.TodoItemService;

@RestController
@RequestMapping("/api/todos")
public class TodoItemController {

    @Autowired
    TodoItemService todoItemService;

    @RequestMapping(method = RequestMethod.GET, path = "")
    public ResponseEntity<List<TodoItem>> getAllTodos() {
        return todoItemService.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/search")
    public ResponseEntity<List<TodoItem>> searchTodoItem(@RequestParam(required = false) String title,
            @RequestParam(required = false) Integer id) {
        if (title == null && id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return todoItemService.getTodoItem(title, id);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/add")
    public ResponseEntity<String> addToDoItem(@RequestBody TodoItem todoItem) {
        return todoItemService.addToDoItem(todoItem);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/delete")
    public ResponseEntity<String> deleteTodoItem(@RequestParam(required = false) String title,
            @RequestParam(required = false) Integer id) {
        if (title == null && id == null) {
            return new ResponseEntity<>("Either title or id must be provided.", HttpStatus.BAD_REQUEST);
        }
        return todoItemService.deleteTodoItem(title, id);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/update/{id}")
    public ResponseEntity<TodoItem> updateTodoItem(@PathVariable Integer id,
            @RequestBody TodoItem newTodoItem) {
        return todoItemService.updateTodoItem(id, newTodoItem);
    }
}
