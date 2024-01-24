package webfinalbe.webfinalbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import webfinalbe.webfinalbe.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}