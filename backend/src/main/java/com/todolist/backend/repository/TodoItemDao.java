package com.todolist.backend.repository;

import com.todolist.backend.model.TodoItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoItemDao extends JpaRepository<TodoItem, Integer> {

    // @Query(value = "SELECT t FROM TodoItem t WHERE t.title = ?1", nativeQuery =
    // true)
    // TodoItem findByTitle(String title);
}
