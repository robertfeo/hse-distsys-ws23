package com.todolist.backend.service;

import com.todolist.backend.model.TodoItem;
import com.todolist.backend.repository.TodoItemDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TodoItemService {

    private final TodoItemDao todoItemDao;

    public TodoItemService(TodoItemDao todoItemRepository) {
        this.todoItemDao = todoItemRepository;
    }

    public ResponseEntity<List<TodoItem>> findAll() {
        try {
            return new ResponseEntity<>(todoItemDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> addToDoItem(TodoItem todoItem) {
        try {
            todoItemDao.save(todoItem);
            return new ResponseEntity<>("Question added successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
    }

    public Optional<TodoItem> findById(Integer id) {
        return todoItemDao.findById(id);
    }
}
