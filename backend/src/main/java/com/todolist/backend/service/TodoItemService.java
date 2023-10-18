package com.todolist.backend.service;

import com.todolist.backend.model.TodoItem;
import com.todolist.backend.repository.TodoItemDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TodoItemService {

    private static final Logger logger = LoggerFactory.getLogger(TodoItemService.class);
    private final TodoItemDao todoItemDao;

    public TodoItemService(TodoItemDao todoItemRepository) {
        this.todoItemDao = todoItemRepository;
    }

    public ResponseEntity<List<TodoItem>> findAll() {
        try {
            return new ResponseEntity<>(todoItemDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error finding TodoItems: ", e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> addToDoItem(TodoItem todoItem) {
        try {
            todoItemDao.save(todoItem);
            return new ResponseEntity<>("Todo-Item added successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error adding TodoItem: ", e);
        }
        return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<TodoItem>> getTodoItem(String title, Integer id) {
        try {
            if (title != null) {
                return new ResponseEntity<>(todoItemDao.findByTitle(title), HttpStatus.OK);
            } else if (id != null) {
                Optional<TodoItem> result = todoItemDao.findById(id);
                if (result.isPresent()) {
                    return new ResponseEntity<>(Collections.singletonList(result.get()), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error fetching TodoItem: ", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteTodoItem(String title, Integer id) {
        try {
            if (title != null) {
                todoItemDao.deleteByTitle(title);
                return new ResponseEntity<>("Todo-Item with title '" + title + "' deleted successfully.",
                        HttpStatus.OK);
            } else if (id != null) {
                todoItemDao.deleteById(id);
                return new ResponseEntity<>("Todo-Item with ID '" + id + "' deleted successfully.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid request.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error deleting TodoItem: ", e);
            return new ResponseEntity<>("Error deleting TodoItem.", HttpStatus.BAD_REQUEST);
        }
    }
}
