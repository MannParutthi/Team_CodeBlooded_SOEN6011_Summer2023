package com.soen6011.careerservicebackend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Document(collection = "candidates")
@Getter
@Setter
public class Candidate extends User {
    private String firstName;
    private String lastName;
    private String education;
    private List<String> skills;
    private Integer experience;
    private MultipartFile resume;
}