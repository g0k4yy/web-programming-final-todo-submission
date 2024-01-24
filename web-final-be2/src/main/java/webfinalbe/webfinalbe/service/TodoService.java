package webfinalbe.webfinalbe.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import webfinalbe.webfinalbe.entity.Users;
import webfinalbe.webfinalbe.repository.ToDoRepository;

@Service
@AllArgsConstructor
public class TodoService {
    @Autowired
    ToDoRepository toDoRepository;

    @Transactional
    public void delete(Long id, Users user) {
        toDoRepository.deleteByIdAndUsers(id, user);
    }
}
