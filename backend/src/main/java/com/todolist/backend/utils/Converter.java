package com.todolist.backend.utils;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;

import com.todolist.backend.dto.TodoItemDto;
import com.todolist.backend.model.TodoItem;
import com.todolist.backend.repository.TodoItemDao;

import lombok.experimental.UtilityClass;

@UtilityClass
public class Converter {

    private ModelMapper modelMapper;

    @Autowired
    private TodoItemDao todoItemDao;

    public TodoItemDto convertToDto(TodoItem todoItem) {
        TodoItemDto todoItemDto = modelMapper.map(todoItem, TodoItemDto.class);
        todoItemDto.setId(todoItem.getId());
        todoItemDto.setTitle(todoItem.getTitle());
        todoItemDto.setChecked(todoItem.isChecked());
        return todoItemDto;
    }

    public TodoItem convertToEntity(TodoItemDto todoItemDto) throws ParseException {
        TodoItem todoItem = modelMapper.map(todoItemDto, TodoItem.class);
        if (todoItemDto.getId() != null) {
            Optional<TodoItem> optionalTodoItem = todoItemDao.findById(todoItemDto.getId());
            if (optionalTodoItem.isPresent()) {
                TodoItem oldtodoItem = todoItemDao.findById(optionalTodoItem.get().getId()).get();
                todoItem.setId(oldtodoItem.getId());
                todoItem.setChecked(oldtodoItem.isChecked());
            }
        }
        return todoItem;
    }
}
