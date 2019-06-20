package com.meeting.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.meeting.model.Role;
import com.meeting.model.User;
import com.meeting.repository.UserRepository;

@Service 
public class UserService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//take this method to DB and load the user
		//this method must return UserDeatils
		//return User of Spring-security-Core
		//Spring User implements UserDetails
		User u = userRepository.findByUsername(username);
		if(u==null){
			throw new UsernameNotFoundException("Username invalid");
		}
			
		List<GrantedAuthority> list = new ArrayList<>();
		for(Role r : u.getRoles()){
			SimpleGrantedAuthority sa = new SimpleGrantedAuthority(r.getName().toUpperCase());
			list.add(sa);
		}
		return new org.springframework.security.core.userdetails.User(u.getUsername(),
				u.getPassword(),list);
	}
	
}








