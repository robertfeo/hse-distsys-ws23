package com.todolist.backend.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.todolist.backend.controller.TodoItemController;
import com.todolist.backend.model.TodoItem;
import com.todolist.backend.service.TodoItemService;

public class TodoItemControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TodoItemService todoItemService;

    @InjectMocks
    private TodoItemController todoItemController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(todoItemController).build();
    }

    @Test
    public void testGetAllTodos() throws Exception {
        mockMvc.perform(get("/api/todos").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testSearchTodoItem() throws Exception {
        mockMvc.perform(get("/api/todos/search")
                .param("title", "Sample Title")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testAddToDoItem() throws Exception {
        TodoItem todoItem = new TodoItem();
        todoItem.setTitle("New Todo");
        mockMvc.perform(post("/api/todos/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(todoItem)))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteTodoItem() throws Exception {
        mockMvc.perform(delete("/api/todos/delete")
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
