package com.soen6011.careerservicebackend.repository;

import com.soen6011.careerservicebackend.model.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends MongoRepository<Application, String> {

    Page<Application> findByEmployerIdAndJobId(String employerId, String jobId, Pageable pageable);

}