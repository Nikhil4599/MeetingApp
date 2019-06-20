package com.meeting.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Meeting {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@ApiModelProperty(hidden=true)//here @JsonIgnore also work but it will also not display the data which will ignore  
	private int id;
	private String title;
	private String venue;
	
	@ManyToMany
	@JoinTable(name="meeting_task",
	joinColumns=@JoinColumn(name="meeting_id",referencedColumnName="id"),
	inverseJoinColumns=@JoinColumn(name="task_id",referencedColumnName="id"))
	//in this case not do nameingfor cloumn(meeting_id as mid) forcefully beacuse it does not work
	private List<Task> task;
	
	@JsonIgnore
	@CreationTimestamp
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="ddMMyyyy")
	private Date date;

	@ApiModelProperty(hidden=true)
	@ManyToOne
	private User user;
	public int getId() {
		return id;
	}

	public List<Task> getTask() {
		return task;
	}

	public void setTask(List<Task> task) {
		this.task = task;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getVenue() {
		return venue;
	}

	public void setVenue(String value) {
		this.venue = value;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
}
