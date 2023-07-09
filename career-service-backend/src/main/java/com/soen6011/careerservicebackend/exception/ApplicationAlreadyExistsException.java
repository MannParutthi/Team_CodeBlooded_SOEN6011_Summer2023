package com.soen6011.careerservicebackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ApplicationAlreadyExistsException extends RuntimeException {
    public ApplicationAlreadyExistsException() {
        super();
    }

    public ApplicationAlreadyExistsException(String message) {
        super(message);
    }

}