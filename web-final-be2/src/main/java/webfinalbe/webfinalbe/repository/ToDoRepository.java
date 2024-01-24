package webfinalbe.webfinalbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webfinalbe.webfinalbe.entity.Todo;
import webfinalbe.webfinalbe.entity.Users;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoRepository extends JpaRepository<Todo,Long> {
    List<Todo> findByUsers(Users users);

    Optional<Todo> findByIdAndUsers(Long id, Users users);

    void deleteByIdAndUsers(Long id, Users users);
}


