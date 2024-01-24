package webfinalbe.webfinalbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webfinalbe.webfinalbe.entity.Users;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,Long> {
        Optional<Users> findByUsername(String userName);

}
