package com.todolist.backend.repository;

import com.todolist.backend.model.TodoItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoItemDao extends JpaRepository<TodoItem, Integer> {

}
