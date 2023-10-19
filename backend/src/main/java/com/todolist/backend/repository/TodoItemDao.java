package com.todolist.backend.repository;

import com.todolist.backend.model.TodoItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;

import java.util.List;

@Repository
public interface TodoItemDao extends JpaRepository<TodoItem, Integer> {

    @Transactional
    List<TodoItem> findAll();

    @Transactional
    List<TodoItem> findById(int id);

    @Transactional
    List<TodoItem> findByTitle(String title);

    @Transactional
    void deleteByTitle(String title);

    @Transactional
    void deleteById(Integer id);

    @Transactional
    void deleteAll();
}
