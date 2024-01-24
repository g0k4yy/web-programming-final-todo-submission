package webfinalbe.webfinalbe.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import webfinalbe.webfinalbe.dto.CreateUserRequest;
import webfinalbe.webfinalbe.entity.Users;
import webfinalbe.webfinalbe.repository.UserRepository;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public Optional<Users> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Users createUser(CreateUserRequest request) {
        Users newUsers = Users.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .name(request.name())
                .accountNonExpired(true)
                .accountNonLocked(true)
                .isEnabled(true)
                .credentialsNonExpired(true)
                .build();
            return userRepository.save(newUsers);
        }

}