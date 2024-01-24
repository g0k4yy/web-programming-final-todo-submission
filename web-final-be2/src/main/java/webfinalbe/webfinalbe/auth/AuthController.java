package webfinalbe.webfinalbe.auth;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import webfinalbe.webfinalbe.dto.CreateUserRequest;
import webfinalbe.webfinalbe.entity.Users;
import webfinalbe.webfinalbe.service.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody CreateUserRequest request) {
        try {
            Users registeredUsers = userService.createUser(request);
            return ResponseEntity.ok("Registered successfully");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
