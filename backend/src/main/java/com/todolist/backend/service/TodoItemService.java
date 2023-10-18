package com.todolist.backend.service;

import com.todolist.backend.model.TodoItem;
import com.todolist.backend.repository.TodoItemDao;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoItemService {

    private final TodoItemDao todoItemRepository;

    public TodoItemService(TodoItemDao todoItemRepository) {
        this.todoItemRepository = todoItemRepository;
    }

    public ResponseEntity<List<TodoItem>> findAll() {
        try {
            return new ResponseEntity<>(todoItemRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }
}
