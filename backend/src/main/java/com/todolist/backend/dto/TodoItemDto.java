package com.todolist.backend.dto;

import lombok.Data;

@Data
public class TodoItemDto {
    private Integer id;
    private String title;
    private boolean isChecked;
}
