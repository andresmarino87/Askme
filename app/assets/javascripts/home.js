var app = angular.module('askme', []);

app.constant('config', {
	"URL": "https://askme-ruby.herokuapp.com/",
//	"URL": "http://localhost:3000/",
});

/**
 *  All services
**/

//Get all questions
app.service('getQuestionsService',['$http', 'config', function($http, config) {
	this.getData = function(callbackFunc) {
		$http({
			method: 'GET',
			headers: { 'Content-Type': 'application/json'},
			url: config.URL+'questions',
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			console.log(error);
		});
	};
}]);

//Get a question with answers
app.service('getAnswersService',['$http', 'config', function($http, config) {
	this.getAnswers = function(callbackFunc, id) {
		$http({
			method: 'GET',
			headers: { 'Content-Type': 'application/json'},
			url: config.URL+'questions/'+id
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			console.log(error);
		});
	};
}]);

//Sign up
app.service('signupService',['$http', 'config', function($http, config) {
	this.signup = function(callbackFunc, user, $scope) {
		$http({
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			url: config.URL+'users.json',
			data: user,
			dataType: 'json',
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			switch(error.status){
				case 401:
					$scope.errorLoginPass = "Invalid parameters";
					break;
				case 400:
					$scope.errorLoginPass = "Invalid parameters";
					break;
				default:
					$scope.errorQuestion = 'Something went wrong!';
					break;
			}
		});
	};
}]);

//login
app.service('loginService',['$http', 'config', function($http, config) {
	this.login = function(callbackFunc, user, $scope) {
		$http({
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			url: config.URL+'users/sign_in.json',
			data: user,
			dataType: 'json',
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			switch(error.status){
				case 401:
					$scope.errorLoginPass = "Wrong email or password.";
					break;
				case 400:
					$scope.errorLoginPass = "Wrong email or password.";
					break;
				default:
					$scope.errorQuestion = 'Something went wrong!';
					break;
			}
		});
	};
}]);

//logout
app.service('logoutService',['$http', 'config', function($http, config) {
	this.logout = function(callbackFunc) {
		$http({
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json'},
			url: config.URL+'users/sign_out.json',
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			console.log(error);
		});
	};
}]);

// post a question
app.service('askQuestionService',['$http', 'config', function($http, config) {
	this.postQuestion = function(callbackFunc, question, $scope ) {
		$http({
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			url: config.URL+'questions/',
			data: question,
			dataType: 'json',
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			switch(error.status){
				case 400:
					$scope.errorAnswer = 'Bad request please try again!';
					break;
				case 401:
					$scope.errorQuestion = 'Must logged in to do this operation';
					break;
				default:
					$scope.errorQuestion = 'Something went wrong!';
					break;
			}
		});
	};
}]);

//post an answer
app.service('answerQuestionService',['$http', 'config', function($http, config) {
	this.postAnswer = function(callbackFunc, id, question, $scope) {
		$http({
			method: 'POST',
			headers: { 'Content-Type': 'application/json',
				'X-CSRFToken':$('meta[name=csrf-token]').attr('content')
			},
			url: config.URL+'questions/'+id+'/answers/',
			data: question,
			dataType: 'json',
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			switch(error.status){
				case 400:
					$scope.errorAnswer = 'Bad request please try again!';
					break;
				case 401:
					$scope.errorAnswer = 'Must logged in to do this operation';
					break;
				default:
					$scope.errorAnswer = 'Something went wrong!';
					break;
			}
		});
	};
}]);

/**
*	Controller
**/
app.controller('questionCtrl', 
	['$scope', 'getQuestionsService', 'getAnswersService', 'loginService', 
	'askQuestionService','answerQuestionService', 'logoutService', 'signupService', 
	function($scope, getQuestionsService, getAnswersService, loginService, 
		askQuestionService, answerQuestionService, logoutService, signupService) {
	$scope.data = null;
	getQuestionsService.getData(function(dataResponse) {
		$scope.questions = dataResponse.data;
	});

	$scope.viewAnswers = function(item) {
		getAnswersService.getAnswers(function(dataResponse){
			$scope.answers = dataResponse.data[0].answers;
			$scope.questionSelected = dataResponse.data[0];
		},item.id);
	};

	$scope.sign_up = function() {
		$scope.errorRegEmail = "";
		$scope.errorRegPass = "";
		$scope.errorConfirmPass = "";

		var obj = {};
		obj["user"] = $scope.user;
		var jsonString= JSON.stringify(obj);
		if(!$scope.user.email){
			$scope.errorRegEmail = "The email can't be empty!.";
		}else if(!$scope.user.password){
			$scope.errorRegPass = "The password can't be empty!.";
		}else if(!$scope.user.confirm_password){
			$scope.errorConfirmPass = "The confirm password can't be empty!.";
		}else if($scope.user.password != $scope.user.confirm_password){
			$scope.errorConfirmPass = "The passwords do not match!.";
		}else{
			signupService.signup(function(dataResponse){
				angular.element(document).triggerHandler('click');
				$scope.user.email = '';
				$scope.user.password = '';
				$scope.user.confirm_password = "";
			},jsonString, $scope);
		}
	};

	$scope.login = function() {
		$scope.errorLoginEmail = "";
		$scope.errorLoginPass = "";
		var obj = {};
		obj["user"] = $scope.user;
		var jsonString= JSON.stringify(obj);
		if(!$scope.user.email){
			$scope.errorLoginEmail = "The email can't be empty!.";
		}else if(!$scope.user.password){
			$scope.errorLoginPass = "The password can't be empty!.";
		}else{
			loginService.login(function(dataResponse){
				angular.element(document).triggerHandler('click');
				$scope.user.email = '';
				$scope.user.password = '';
			},jsonString,$scope);
			$( '#login_menu' ).toggleClass('open');
		}

	};

	$scope.logout = function() {
		logoutService.logout(function(dataResponse){
		});
	};

	$scope.askQuestion = function(){
		$scope.errorQuestion = "";
		var params = {};
		params["question"] = $scope.question;
		var jsonParams = JSON.stringify(params);
		if($scope.question){
			askQuestionService.postQuestion(function(dataResponse){
				$scope.questions.unshift(dataResponse.data);
				$scope.question = '';
			},jsonParams, $scope);
		}else{
			$scope.errorQuestion = "The question can't be empty!.";
		}
	};

	$scope.answerQuestion = function(){
		$scope.errorAnswer = "";
		var params = {};
		params["answer"] = $scope.answer;
		var jsonParams = JSON.stringify(params);
		if($scope.answer){
			answerQuestionService.postAnswer(function(dataResponse){
				$scope.answers.unshift(dataResponse.data);
				$scope.answer = "";
			},$scope.questionSelected.id,jsonParams, $scope);
		}else{
			$scope.errorAnswer = "The answer can't be empty!.";
		}
	};
}]);
