package webfinalbe.webfinalbe.dto;

import lombok.Builder;

@Builder
public record CreateUserRequest (
        String name,
        String username,
        String password
){
}