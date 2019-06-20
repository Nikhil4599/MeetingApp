package com.meeting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.meeting.model.Meeting;
import com.meeting.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer>{

	public List<Meeting> findAllByMeetingId(int meeting_id);
	//this abstract function should perform auto query
	//where in query it should find by meetingId which will give Meeting which is associated with task 
	//where in this case there should specific name and with returning value 
	// in above case it is list of all meeting hence it give all meeting which is have task
}
