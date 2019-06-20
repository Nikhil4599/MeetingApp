package com.meeting.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.meeting.model.Role;
import com.meeting.model.User;
import com.meeting.repository.UserRepository;

import exception.ResourceNotFoundException;
@CrossOrigin
@RestController
@RequestMapping("rest")
public class UserController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passEncoder;
	
	Map<String,Integer> map=new HashMap<>();
	
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	@GetMapping("/user/{id}")
	public User getUser(@PathVariable("id") int id){
		return userRepository.getOne(id);
	}
	
	@PostMapping("/user")
	public User addUser(@RequestHeader("username") String username,@RequestHeader("name") String name
			,@RequestHeader("password") String password,
			@RequestHeader("role") String role){
		
		User user =new User();
		user.setUsername(username);
		user.setPassword(passEncoder.encode(password));
		user.setEnabled(true);
		List<Role> list = new ArrayList<>();
		Role r = new Role();
		r.setName(role.toUpperCase());
		list.add(r);
		user.setRoles(list);
		
		return userRepository.save(user);
	}
	
	@PutMapping("/user/{id}")
	public User updateUser(@RequestBody User user,@PathVariable("id") int id) {
		User u=userRepository.getOne(id);
		u.setName(user.getName());
		u.setUsername(user.getUsername());
		u.setRoles(user.getRoles());
		return userRepository.save(u);	
	}
	
	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable("id") int id) {
		userRepository.deleteById(id);
	}
	
//	//2.lecture//
//	//PART1==>it is for reset user credentials 
//	@GetMapping("/user/credentials/{userId}")
//	public int generateCode(@PathVariable("userId") int userId) {//in this case for user reset purpose we give reset code
//		User user=userRepository.getOne(userId);//useless line You can also remove this line
//		int code=(int)(Math.random() * 100000);// <- or ->int code=new Random().nextInt(100000);
//		map.put(userId, code);				   //in this case we put userId and code in map
//		return code;
//	}
//	//PART2==>Where in this case we pass code and userId for checking that code & userId must map
//	@GetMapping("/user/verify/{userId}/{code}")
//	public boolean verifyCode(@PathVariable("userId") int userId,@PathVariable("code") int code) {//where in this case we pass userId and cid
//		for(Map.Entry<User, Integer> e:map.entrySet()) {//Where in this case we get keys and corresponding values for checking from map(which is store in previous function)
//			if(e.getKey().getId()==userId) {
//				if(e.getValue()==code) {
//					map.remove(userId);
//					return true;
//				}
//			}
//		}
//		return false;
//	}
//	//in this case we get password in credentials
//	@PostMapping("/user/password/{userId}")
//	public User setPassword(@PathVariable("userId") int userId,@RequestBody Crendentials crendentials) {
//		//GET USER BY ID
//		User user=userRepository.getOne(userId);
//		//set crentensial username by email
//		crendentials.setUsername(user.getEmail());
//		Crendentials c=crendentialsRepository.save(crendentials);
//		//set crendential in user
//		user.setCrendentials(c);
//		return userRepository.save(user);
//	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	/////////////////??MY Code??//////////////////// 
	@CrossOrigin
	@PostMapping("/user/verifymail")
	public void generateCode(@RequestBody User user) {
		int code=(int)(Math.random() * 100000);
		map.put(user.getUsername(), code);
		Properties props = new Properties();
		   props.put("mail.smtp.auth", "true");
		   props.put("mail.smtp.starttls.enable", "true");
		   props.put("mail.smtp.host", "smtp.gmail.com");
		   props.put("mail.smtp.port", "587");
		   
		   Session session = Session.getInstance(props, new javax.mail.Authenticator() {
		      protected PasswordAuthentication getPasswordAuthentication() {
		         return new PasswordAuthentication("apptesting09800@gmail.com", "app09800");
		      }
		   });
		   try {
			   Message msg = new MimeMessage(session);
			   msg.setFrom(new InternetAddress(user.getUsername(), false));
	
			   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(user.getUsername()));
			   msg.setSubject("Verify");
			   msg.setContent("Hi "+user.getName()+"  Your Verification Code is :"+code, "text/html");
			   msg.setSentDate(new Date());
			   Transport.send(msg);  
		   }
		   catch(Exception e) {
			   throw new RuntimeException();
		   }		
	}
	
	@CrossOrigin
	@GetMapping("/user/verify/{username}/{code}") 
	public boolean verifyCode(@PathVariable("username") String username,@PathVariable("code") int code) {
		for(Map.Entry<String, Integer> e:map.entrySet()) {	
			if(e.getKey().equals(username)) {
				if(e.getValue()==code) {
					map.remove(username);
					return true;
				}
			}
		}
		return false;
	}
 	
	@CrossOrigin(methods=RequestMethod.POST)
	@PostMapping("/signUp")
	public User signUp(@RequestBody User u){
		
		User user =new User();
		user.setName(u.getName());
		user.setUsername(u.getUsername());
		user.setPassword(passEncoder.encode(u.getPassword()));
		user.setEnabled(true);
		user.setRoles(u.getRoles());
		
		return userRepository.save(user);
	}
	
	@CrossOrigin(methods=RequestMethod.GET)
	@GetMapping("/login") 
	public User login(@RequestHeader("username") String username,
			@RequestHeader("password") String password){
		User u = userRepository.findByUsername(username);
		if(u != null){
			if(passEncoder.matches(password, u.getPassword())){
				return u;
			}
		}
		throw new ResourceNotFoundException("Credentials Invalid");

	}
	
	@GetMapping("/user")
	  public Principal user(Principal user) {
	    return user;
	  }
}
