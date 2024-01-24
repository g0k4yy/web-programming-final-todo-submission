package webfinalbe.webfinalbe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "todo_table")
public class Todo {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "date")
    private String date;
    @Column (name = "done")
    private Boolean isDone;

    @ManyToOne
    @JsonBackReference
    private Users users;

}