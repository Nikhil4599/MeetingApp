package com.meeting.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Task {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String details;
	
	@ManyToMany(mappedBy="task")
	private List<Meeting> meeting;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	//WHY WE NOT PUT GETTER SETTER FOR List<Meeting> meeting;??
	//WHEN WE PUT GEETER AND SETTER THEN THIS COULD NOT WORK
	//?????????????????????????????????????????????????????????
	//ANS=>{												}
	//
	/*
	public List<Meeting> getMeeting() {
		return meeting;
	}
	public void setMeeting(List<Meeting> meeting) {
		this.meeting = meeting;
	}*/
	
	
}
