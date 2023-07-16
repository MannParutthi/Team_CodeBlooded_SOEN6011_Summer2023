package com.soen6011.careerservicebackend.security;

import java.util.Collection;
import java.util.Collections;

import com.soen6011.careerservicebackend.common.Authority;
import com.soen6011.careerservicebackend.model.Candidate;
import com.soen6011.careerservicebackend.model.Employer;
import com.soen6011.careerservicebackend.repository.CandidateRepository;
import com.soen6011.careerservicebackend.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailService implements UserDetailsService {

	@Autowired
	CandidateRepository candidateRepository;

	@Autowired
	EmployerRepository employerRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Candidate candidate = candidateRepository.findByEmailId(username);
		Employer employer = employerRepository.findByEmailId(username);

		if (candidate == null && employer == null) {
			throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
		} else if (candidate != null) {
			return new UserJWT(candidate.getUserId(), candidate.getEmailId(), candidate.getPassword(),
					mapToGrantedAuthorities(candidate.getAuthority()));
		} else {
			return new UserJWT(employer.getUserId(), employer.getEmailId(), employer.getPassword(),
					mapToGrantedAuthorities(employer.getAuthority()));
		}
	}

	private static Collection<? extends GrantedAuthority> mapToGrantedAuthorities(Authority authorityName) {
		return Collections.singleton(new SimpleGrantedAuthority(authorityName.toString()));
	}
}
