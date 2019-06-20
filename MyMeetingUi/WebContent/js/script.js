/// <reference path="angular.js"/>
/// <reference path="angular-route.min.js"/>
var MyMeetingUi = angular.module("meeting",["ngRoute"]);
MyMeetingUi
.config(function ($routeProvider, $httpProvider) {

    $routeProvider
    .when("/", {

        templateUrl:"login.html",

        controller: "loginController"

      })
    .when("/dashboard", {

        templateUrl:"dashboard.html"

        //controller: "loginController"

      })
    .when("/user", {
        templateUrl: "user.html",

       controller: "userController"

      })
      .when("/meeting", {

        templateUrl: "meeting.html",

        controller: "meetingController"

      })
      .when("/task", {
        templateUrl: "task.html",

        controller: "taskController"
      })

      .when("/login", {
        templateUrl:"login.html",

        controller: "loginController"
      })
      .when("/signIn",{
        templateUrl:"signup.html",

        controller:"signInController"

      })
      .when("/code",{
        templateUrl:"code.html",

        controller:"signInController"

      })
      
      //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
 }
 )
 .controller("userController", function($scope,$http,$window) {


        /////////////////BUTTON ENABLE DISABLE/////////////////////////////
        $scope.delete1=function(){
            for(var i=0;i<$scope.users.length;i++){
                document.getElementById("edit"+i).style.display="none";
                document.getElementById("delete"+i).style.display="block";
            }
        }
        $scope.edit1=function(){
            for(var i=0;i<$scope.users.length;i++){
                document.getElementById("edit"+i).style.display="block";
                document.getElementById("delete"+i).style.display="none";
            }
        }
        //////////////////////////////////////////////////////////////////
        
        ///Edit User//////////////////////////////////////////////////////
        $scope.Edit=function(user){
            $scope.user1=user;  
            document.getElementById("Edit").style.display="block";
            document.getElementById("Submit").style.display="none";      
        }
        $scope.editUser=function(id){
            $http({
                method : "PUT",
                url : "http://localhost:1234/rest/user/" + id,
                data : angular.toJson($scope.user1),
                headers : {
                    'Content-Type' : 'application/json'
                }
                }).then(_success4, _error4 );
                function _success4(response){
                    $window.location.href="http://localhost:8080/MyMeetingUi/#!/user";
                }
                function _error4(response){

                    alert("somethng went wrong");
                }
        }
         //////////////////Edit END///////////////////////////////


        $scope.addUser=function(){
        $http({
            method : "POST",
            url : "http://localhost:1234/rest/user",
            data : angular.toJson($scope.user1),
            headers : {
            'Content-Type' : 'application/json'
            }
               
        }).then(_success1,_error1);
        function _success1(response) {
                $scope.user1=null;
                $scope.users.push(response.data);
            }
        function _error1(){
            $scope.error_msg="Problem in loading data. please check your internet connection";
            }
        };

        ///////////////////////////////////////////////////////////////////////////////////
        $http({
            method : "GET",
            url : "http://localhost:1234/rest/users"
        }).then(_success,_error);
        function _success(response) {
            $scope.users = response.data;

            }
        function _error(){
            $scope.error_msg="Problem in loading data. please check your internet connection";
            }

            //////////////////////////Delete Task//////////////////////////////////////
         $scope.Delete=function(id){
            var x = confirm("Are you sure you want to delete?");
            if(x){
                
                $http({
                method : "DELETE",
                url : "http://localhost:1234/rest/user/" + id,
                headers : {
                    'Content-Type' : 'application/json'
                }
                }).then(_success4, _error4 );
                function _success4(response){
                    for(var i=0;i<$scope.users.length;i++){ //3
                        if(!($scope.users[i] == undefined))
                            if($scope.users[i].id == id){
                                delete $scope.users[i];
                                $scope.users.splice(i,1);
                        }
                    }

                    $scope.msg="info deleted";
                }
                function _error4(response){
                          //document.getElementById("business-button-fail").style.display="block";
                          //document.getElementById("business-button-sending").style.display="none";

                    alert("somethng went wrong");
                }
            }
         }
         //////////////////DELETE END///////////////////////////////
    })
 .controller("taskController", function($scope,$http,$window) {

        $scope.counter=0;
        $scope.next=function(){
            /*if($scope.tasks.length <= $scope.counter){
                document.getElementById("next").style.display="none";
                document.getElementById("prev").style.display="block";
            }
            else{
                console.log($scope.counter);
                document.getElementById("next").style.display="block";
                document.getElementById("prev").style.display="block";
                $scope.counter=$scope.counter+2;
            }
            */
            $scope.counter=$scope.counter+3;//remove this if you remove comment
        }
        $scope.prev=function(){
            /*if($scope.counter <= 0){
                document.getElementById("next").style.display="block";
                document.getElementById("prev").style.display="none";
            }
            else{
                console.log($scope.counter);
                document.getElementById("next").style.display="block";
                document.getElementById("prev").style.display="block";
                $scope.counter=$scope.counter-2;   
            }*/
            $scope.counter=$scope.counter-3;//remove this if you remove comment
        }


        /////////////////BUTTON ENABLE DISABLE/////////////////////////////
        $scope.delete1=function(){
            for(var i=0;i<$scope.tasks.length;i++){
                document.getElementById("edit"+i).style.display="none";
                document.getElementById("delete"+i).style.display="block";
            }
        }
        $scope.edit1=function(){
            for(var i=0;i<$scope.tasks.length;i++){
                document.getElementById("edit"+i).style.display="block";
                document.getElementById("delete"+i).style.display="none";
            }
        }
        //////////////////////////////////////////////////////////////////

        ///Edit Task//////////////////////////////////////////////////////
        $scope.Edit=function(task){
            $scope.task1={"id" :task.id ,"details" : task.details};  
            document.getElementById("Edit").style.display="block";
            document.getElementById("Submit").style.display="none";      
        }
        $scope.editTask=function(id){
            $http({
                method : "PUT",
                url : "http://localhost:1234/rest/task/" + id,
                data : angular.toJson($scope.task1),
                headers : {
                    'Content-Type' : 'application/json'
                }
                }).then(_success4, _error4 );
                function _success4(response){
                    $window.location.href="http://localhost:8080/MyMeetingUi/#!/task";
                    $scope.msg="meeting info deleted";
                }
                function _error4(response){

                    alert("somethng went wrong");
                }
        }
         //////////////////Edit END///////////////////////////////
        
        ///Delete Task//////////////////////////////////////////////////////
         $scope.Delete=function(id){
            var x = confirm("Are you sure you want to delete?");
            if(x){
                
                $http({
                method : "DELETE",
                url : "http://localhost:1234/rest/task/" + id,
                headers : {
                    'Content-Type' : 'application/json'
                }
                }).then(_success4, _error4 );
                function _success4(response){
                    for(var i=0;i<$scope.tasks.length;i++){ //3
                        if(!($scope.tasks[i] == undefined))
                            if($scope.tasks[i].id == id){
                                delete $scope.tasks[i];
                                $scope.tasks.splice(i,1);
                        }
                    }

                    $scope.msg="meeting info deleted";
                }
                function _error4(response){
                          //document.getElementById("business-button-fail").style.display="block";
                          //document.getElementById("business-button-sending").style.display="none";

                    alert("somethng went wrong");
                }
            }
         }
         //////////////////DELETE END///////////////////////////////

        $scope.addTask=function(){
        $http({
            method : "POST",
            url : "http://localhost:1234/rest/task",
            data : angular.toJson($scope.task1),
            headers : {
            'Content-Type' : 'application/json'
            }
               
        }).then(_success1,_error1);
        function _success1(response) {
                $scope.task1=null;
                $scope.tasks.push(response.data);
            }
        function _error1(){
            $scope.error_msg="Problem in loading data. please check your internet connection";
            }
        };
        $http({
            method : "GET",
            url : "http://localhost:1234/rest/tasks"
        }).then(_success,_error);
        function _success(response) {
            $scope.tasks = response.data;

            }
        function _error(){
            $scope.error_msg="Problem in loading data. please check your internet connection";
            }

    }) 

 .controller("meetingController", function($scope,$http,$window) {
        $scope.user = JSON.parse($window.localStorage.getItem("user")); 
        console.log($scope.user.id); 

        ////////////////////////////////////////////////////////////////
         $scope.counterTask=0;
        $scope.next=function(){
            $scope.counterTask=$scope.counterTask+3;//this is refer from task.html
        }
        $scope.prev=function(){
            $scope.counterTask=$scope.counterTask-3;//this is refer from task.html
        }
        //////////////////////////////////////////////////////////////
        /////////////////BUTTON ENABLE DISABLE/////////////////////////////
        $scope.delete1=function(){
            for(var i=0;i<$scope.meetings.length;i++){
                document.getElementById("edit"+i).style.display="none";
                document.getElementById("delete"+i).style.display="block";
            }
        }
        $scope.edit1=function(){
            for(var i=0;i<$scope.meetings.length;i++){
                document.getElementById("edit"+i).style.display="block";
                document.getElementById("delete"+i).style.display="none";
            }
        }
        //////////////////////////////////////////////////////////////////
        //Display Meeting
        $http({
            method : "GET",
            url : "http://localhost:1234/rest/meetings"
        }).then(_success,_error);
        function _success(response) {
                $scope.meetings = response.data;
            }
        function _error(){
            $scope.error_msg="Problem in loading data. please check your internet connection";
            } 

        //Display Task
        $http({
            method : "GET",
            url : "http://localhost:1234/rest/tasks"
        }).then(_success3,_error3);
        function _success3(response) {
            $scope.taskCheckBoxs = response.data;
        }
        function _error3(){
            $scope.error_msg="Problem in loading data. please check your internet connection";
        }
            
        //CHECKBOX 
         $scope.taskId=[];

        $scope.toggleSelection=function(item){
            if($scope.taskId.indexOf(item) > -1){
                $scope.taskId.splice($scope.taskId.indexOf(item),1);
                console.log("selected:"+$scope.taskId);
            }
            else{
                $scope.taskId.push(item);
                for (i = 0; i < $scope.taskId.length; i++){
                    $scope.taskId[i].checked = true ;
                }
                console.log("selected:"+$scope.taskId);
            }
        }


        //////////////////////ADD MEETING/////////////////////////////////////////////////////////////////
        $scope.addMeeting=function(){
        $http({
            method : "POST",
            url : "http://localhost:1234/rest/meeting/"+$scope.user.id,
            data : angular.toJson($scope.meeting1),
            headers : {
            'Content-Type' : 'application/json'
            }
               
        }).then(_success1,_error1);
        function _success1(response) {
                $scope.meeting1=null;
                $scope.meeting = response.data;
                angular.forEach($scope.taskId, function(value, key) {
                    console.log($scope.taskId);
                    console.log($scope.meeting.id);
                    $http({
                            method : "POST",
                            url : "http://localhost:1234/rest/assignTask/"+$scope.meeting.id+"/"+value
                        }).then(_successTask,_errorTask);
                    function _successTask(response) {
                        
                    }
                    function _errorTask(){
                            $scope.error_msg="Problem in loading data. please check your internet connection";
                    }    
                });
                
                $http({
                    method : "GET",
                    url : "http://localhost:1234/rest/meetings"
                }).then(_success,_error);
                function _success(response) {
                        $scope.meetings = response.data;
                }
                function _error(){
                    $scope.error_msg="Problem in loading data. please check your internet connection";
                }
                ////////////////////Display Task/////////////////////////////////
                $http({
                    method : "GET",
                    url : "http://localhost:1234/rest/tasks"
                }).then(_success3,_error3);
                function _success3(response) {
                    $scope.taskCheckBoxs = response.data;
                }
                function _error3(){
                    $scope.error_msg="Problem in loading data. please check your internet connection";
                }
                ///////////////////////////////////////////////////////////
                $scope.taskId=[];
            }
        function _error1(){
            $scope.error_msg="Problem in loading data. please check your internet connection";
            }
        };
        //////////////////////END ADD MEETING/////////////////////////////////////////////////////////////////

        //////////////////////EDIT MEETING//////////////////////////////////////////////////////////////////
        $scope.Edit=function(meeting){
            $scope.taskId=[];
            $scope.meeting1={"id" :meeting.id ,"title" : meeting.title,"venue" : meeting.venue,"task":meeting.task};
            console.log("Meeting EDIT:"+$scope.meeting1);
            for(var i=0;i<meeting.task.length;i++){
                $scope.taskId.push(meeting.task[i].id);
            }
            console.log("TASK EDIT:"+$scope.taskId);
            document.getElementById("Edit").style.display="block";
            document.getElementById("Submit").style.display="none";      
        }
        $scope.editMeeting=function(id){
            ///////Delete TASK WITH ID//////////////////////////////////
            $http({
                method : "DELETE",
                url : "http://localhost:1234/rest/meeting/task/" + id,
                headers : {
                    'Content-Type' : 'application/json'
                }                                                                                                                                  
            })
            ///////////////////////////////////////////////////////////
            $http({
                method : "PUT",
                url : "http://localhost:1234/rest/meeting/" + id,
                data : angular.toJson($scope.meeting1),
                headers : {
                    'Content-Type' : 'application/json'
                }
                }).then(_success4, _error4 );
                function _success4(response){
                $scope.meeting1=null;
                $scope.meeting = response.data;
                /*remove duplicate in taskId
                for(var i = 0;i < taskId.length; i++){
                    if(unique_array.indexOf($scope.taskId[i]) == -1){
                        unique_array.push($scope.taskId[i])
                    }
                }*/

                //////////////////

                
                angular.forEach($scope.taskId, function(value, key) {
                    console.log($scope.taskId);
                    console.log($scope.meeting.id);
                    $http({
                            method : "POST",
                            url : "http://localhost:1234/rest/assignTask/"+$scope.meeting.id+"/"+value
                        }).then(_successTask,_errorTask);
                        function _successTask(response) {
                        }
                        function _errorTask(){
                                $scope.error_msg="Problem in loading data. please check your internet connection";
                        }    
                    });


                    ////////////////////Display Task/////////////////////////////////
                    $http({
                        method : "GET",
                        url : "http://localhost:1234/rest/tasks"
                    }).then(_success3,_error3);
                    function _success3(response) {
                        $scope.taskCheckBoxs = response.data;
                    }
                    function _error3(){
                        $scope.error_msg="Problem in loading data. please check your internet connection";
                    }
                    ///////////////////////////////////////////////////////////
                    
                    $http({
                        method : "GET",
                        url : "http://localhost:1234/rest/meetings"
                    }).then(_success,_error);
                    function _success(response) {
                            $scope.meetings = response.data;
                    }
                    function _error(){
                        $scope.error_msg="Problem in loading data. please check your internet connection";
                    }
                    $scope.taskId=[];


                    //$scope.msg="meeting info deleted";
                }
                function _error4(response){

                    alert("somethng went wrong");
                }
        }
        //////////////////////END OF EDIT MEETING//////////////////////////////////////////////////////////////////

        ///Delete Meeting//////////////////////////////////////////////////////
         $scope.Delete=function(id){
            var x = confirm("Are you sure you want to delete?");
            if(x){
                
                $http({
                method : "DELETE",
                url : "http://localhost:1234/rest/meeting/" + id,
                headers : {
                    'Content-Type' : 'application/json'
                }
                }).then(_success4, _error4 );
                function _success4(response){
                    for(var i=0;i<$scope.meetings.length;i++){ //3
                        if(!($scope.meetings[i] == undefined))
                            if($scope.meetings[i].id == id){
                                delete $scope.meetings[i];
                                $scope.meetings.splice(i,1);
                        }
                    }

                    $scope.msg="meeting info deleted";
                }
                function _error4(response){

                    alert("somethng went wrong");
                }
            }
         }
         //////////////////DELETE END///////////////////////////////   

    })
 .controller("loginController", function($scope,$http,$window) {

        $scope.check=function(){
        
        //call the api and do the process
        //if success[201] - redirect to /dashboard.
        $http({
            method : "GET",
            url : "http://localhost:1234/rest/login",
            headers : {
//            	authorization : 'Basic ' + btoa($scope.username + ':' + $scope.password)
            	'username' : $scope.username,
            	'password' : $scope.password
            }
        }).then( _success, _error );
        
        function _success(response) {
            $scope.user = response.data;
            //console.log($rootScope.user);

            $window.localStorage.setItem("user", angular.toJson($scope.user));
    		location="/MyMeetingUi/#!/dashboard";
            
        }
        function _error(response) {
            //console.log($scope.user);
            $scope.msg="Invalid Username/Password";
        }       
    }
    })
 .controller("signInController", function($scope,$http,$window) {

	 $scope.user2={"name":"","roles":[{"name":""}],"username":"","password":""};
        $scope.signIn=function(){
            document.getElementById("img-spinner").style.display="block";
	        $http({
	            method : "POST",
	            url : "http://localhost:1234/rest/user/verifymail",
	            data : angular.toJson($scope.user2),
	            headers : {
	            'Content-Type' : 'application/json'
	            }
	        }).then( _success, _error );
	        
	        function _success(response) {
	        	$window.localStorage.setItem("passuser",angular.toJson( $scope.user2));
	        	location="/MyMeetingUi/#!/code";
	        }
	        function _error(response) {
	        	document.getElementById("img-spinner").style.display="none";
	            $scope.msg="connection Problem......";
	        }
        }
        $scope.verifyCode=function(){
        	var passuser=JSON.parse( $window.localStorage.getItem("passuser"));
        	console.log(passuser);
        	$http({
	            method : "GET",
	            url : "http://localhost:1234/rest/user/verify/"+passuser.username+"/"+$scope.code,
	            headers : {
	            'Content-Type' : 'application/json'
	            }
	        }).then( _success1, _error1 );
	        
	        function _success1(response) { 
	        	if(response.data==true){
	        		$http({
	    	            method : "POST",
	    	            url : "http://localhost:1234/rest/signUp",
	    	            data : angular.toJson(passuser),
	    	            headers : {
	    	            'Content-Type' : 'application/json'
	    	            }
	    	        }).then( _success2, _error2 );
	    	        
	    	        function _success2(response) {
	    	        	$window.localStorage.setItem("user", angular.toJson(response.data));
	    	        }
	    	        function _error2(response) {
	    	            $scope.msg="connection Problem......";
	    	        }
	        		location="/MyMeetingUi/#!/dashboard";
	        	}
	        	if(response.data==false){
	        		$scope.msg="INVALID CODE";
	        	}
	        }
	        function _error1(response) {
	            //$scope.msg="connection Problem......";
	        }
        }
        
        
    
    });
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////