package com.meeting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.meeting.model.Meeting;
import com.meeting.model.User;
import com.meeting.repository.MeetingRepository;
import com.meeting.repository.UserRepository;

@RestController
@RequestMapping("rest")
public class MeetingController {
	
	@Autowired
	MeetingRepository meetingRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@CrossOrigin
	@GetMapping("/meetings")
	public  List<Meeting> getAllMeetings() {
		return meetingRepository.findAll();
	}
	
	@GetMapping("/meeting/{id}")
	public Meeting getMeeting(@PathVariable("id") int id) {
		return meetingRepository.getOne(id);
	}
	
	@CrossOrigin(methods=RequestMethod.POST)
	@PostMapping("meeting")
	public Meeting addMeeting(@RequestBody Meeting meeting) {
		return meetingRepository.save(meeting);
	}
	@CrossOrigin(methods=RequestMethod.PUT)
	@PutMapping("meeting/{id}")
	public Meeting updateMeeting(@PathVariable("id") int id,@RequestBody Meeting meeting) {
		Meeting m=meetingRepository.getOne(id);
		m.setTitle(meeting.getTitle());
		m.setVenue(meeting.getVenue());
		return meetingRepository.save(m);
	}
	@CrossOrigin(methods=RequestMethod.DELETE)
	@DeleteMapping("meeting/{id}")
	public void deleteMeeting(@PathVariable("id") int id) {
		meetingRepository.deleteById(id);
	}
	
	///DELETE ENTRY OF TASK and MEETING ID
	@CrossOrigin(methods=RequestMethod.DELETE)
	@DeleteMapping("/meeting/task/{mid}")
	public void deleteTaskByMeetingId(@PathVariable("mid") int mid) {
		meetingRepository.deleteEntry(mid);
	}
	
	//mapping as many to many
	@CrossOrigin(methods=RequestMethod.POST)
	@PostMapping("/assignTask/{mid}/{tid}")
	public Meeting assignTask(@PathVariable("mid") int mid,@PathVariable("tid") int tid) {
		 meetingRepository.assignTask(mid,tid);
		 return meetingRepository.getOne(mid);
	}
	//mapping as  many to one
	@CrossOrigin(methods=RequestMethod.POST)
	@PostMapping("/meeting/{userid}")
	public Meeting addMeeting(@PathVariable("userid") int userId,@RequestBody Meeting meeting){
		User user=userRepository.getOne(userId);
		meeting.setUser(user);
		return meetingRepository.save(meeting);
	}
}
