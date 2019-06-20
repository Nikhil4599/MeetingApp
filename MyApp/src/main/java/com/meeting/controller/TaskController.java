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
import org.springframework.web.bind.annotation.RestController;

import com.meeting.model.Meeting;
import com.meeting.model.Task;
import com.meeting.model.User;
import com.meeting.repository.TaskRepository;
@CrossOrigin
@RestController
@RequestMapping("rest")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;
	
	//find task by meetingId 
	@GetMapping("/tasks/{id}")
	public List<Meeting> getTasks(@PathVariable("id") int meetingId){
		return taskRepository.findAllByMeetingId(meetingId);
	}
	
	@GetMapping("/tasks")
	public List<Task> getAllTask(){
		return taskRepository.findAll();
	}
	
	@GetMapping("/task/{id}")
	public Task getTask(@PathVariable("id") int id){
		return taskRepository.getOne(id);
	}
	
	@PostMapping("/task")
	public Task addTask(@RequestBody Task task) {
		return taskRepository.save(task);
	}
	
	@PutMapping("/task/{id}")
	public Task updateTask(@RequestBody Task task,@PathVariable("id") int id) {
		Task t=taskRepository.getOne(id);
		t.setDetails(task.getDetails());
		return taskRepository.save(t);	
	}
	
	@DeleteMapping("/task/{id}")
	public void deleteTask(@PathVariable("id") int id) {
		taskRepository.deleteById(id);
	}
	
	
	
	
}
