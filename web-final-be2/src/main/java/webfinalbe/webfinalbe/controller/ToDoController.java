package webfinalbe.webfinalbe.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import webfinalbe.webfinalbe.entity.Message;
import webfinalbe.webfinalbe.entity.Todo;
import webfinalbe.webfinalbe.entity.Users;
import webfinalbe.webfinalbe.repository.ToDoRepository;
import webfinalbe.webfinalbe.repository.UserRepository;
import webfinalbe.webfinalbe.service.MessageService;
import webfinalbe.webfinalbe.service.TodoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todo")
public class ToDoController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private TodoService todoService;
    @Autowired
    private ToDoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new Todo for the authenticated user
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo, Authentication authentication) {
        String username = authentication.getName();
        todo.setUsers(userRepository.findByUsername(username).get());

        try {
            Todo newTodo = todoRepository.save(todo);
            return new ResponseEntity<>(newTodo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all Todos for the authenticated user
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(Authentication authentication) {
        String username = authentication.getName();

        try {
            List<Todo> todos = todoRepository.findByUsers(userRepository.findByUsername(username).get());
            if (todos.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get a specific Todo by ID for the authenticated user
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable("id") Long id, Authentication authentication) {
        String username = authentication.getName();
        Users user = userRepository.findByUsername(username).get();

        Optional<Todo> todoData = todoRepository.findByIdAndUsers(id, user);

        if (todoData.isPresent()) {
            return new ResponseEntity<>(todoData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a Todo by ID for the authenticated user
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") Long id, @RequestBody Todo todo, Authentication authentication) {
        String username = authentication.getName();
        Users user = userRepository.findByUsername(username).get();

        Optional<Todo> todoData = todoRepository.findByIdAndUsers(id, user);

        if (todoData.isPresent()) {
            Todo existingTodo = todoData.get();
            existingTodo.setTitle(todo.getTitle());
            existingTodo.setDescription(todo.getDescription());
            existingTodo.setDate(todo.getDate());

            return new ResponseEntity<>(todoRepository.save(existingTodo), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a Todo by ID for the authenticated user
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTodoById(@PathVariable("id") Long id, Authentication authentication) {
        String username = authentication.getName();
        Users user = userRepository.findByUsername(username).get();

        try {
            todoService.delete(id,user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        try {
            Message newMessage = messageService.saveMessage(message);
            return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
