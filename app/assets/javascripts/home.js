var app = angular.module('askme', []);

app.constant('config', {
	"URL": "https://askme-ruby.herokuapp.com/",
//	"URL": "http://localhost:3000/",
});

app.directive('validPasswordC', function() {
  return {
    require: 'ngModel',
    scope: {

      reference: '=validPasswordC'

    },
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue, $scope) {

        var noMatch = viewValue != scope.reference
        ctrl.$setValidity('noMatch', !noMatch);
        return (noMatch)?noMatch:!noMatch;
      });

      scope.$watch("reference", function(value) {;
        ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

      });
    }
  }
});


app.service('getQuestionsService',['$http', 'config', function($http, config) {
	this.getData = function(callbackFunc) {
		$http({
			method: 'GET',
			url: config.URL+'questions',
		}).then(function (success){
			console.log(success);
			callbackFunc(success);
		}, function (error){
			console.log(error);
			alert("error");
		});
	};
}]);

app.service('getAnswersService',['$http', 'config', function($http, config) {
	this.getAnswers = function(callbackFunc, id) {
		$http({
			method: 'GET',
			url: config.URL+'questions/'+id
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			alert("error");
		});
	};
}]);

app.service('signupService',['$http', 'config', function($http, config) {
	this.signup = function(callbackFunc, user) {
		$http({
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			url: config.URL+'users.json',
			data: user,
			dataType: 'json',
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			console.log(error);
			alert("error");
		});
	};
}]);


app.service('loginService',['$http', 'config', function($http, config) {
	this.login = function(callbackFunc, user) {
		$http({
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			url: config.URL+'users/sign_in.json',
			data: user,
			dataType: 'json',
		}).then(function (success){
			callbackFunc(success);
		}, function (error){
			if(error.status == 401){
				console.log(error.data);

			}else if(status == 400){
				console.log(error.c);
			}else{

			}
			console.log(error.status);

			alert("error");
		});
	};
}]);

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
			alert("error");
		});
	};
}]);

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

app.service('answerQuestionService',['$http', 'config', function($http, config) {
	this.postAnswer = function(callbackFunc, id, question, $scope) {
		console.log(question);
		$http({
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
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
		var obj = {};
		obj["user"] = $scope.user;
		var jsonString= JSON.stringify(obj);
		console.log();
		signupService.signup(function(dataResponse){
			console.log(dataResponse);
			angular.element(document).triggerHandler('click');
		},jsonString);
	};


	$scope.login = function() {
		var obj = {};
		obj["user"] = $scope.user;
		var jsonString= JSON.stringify(obj);
		loginService.login(function(dataResponse){
			console.log(dataResponse);
			angular.element(document).triggerHandler('click');
		},jsonString);
		$( '#login_menu' ).toggleClass('open');

	};

	$scope.logout = function() {
		logoutService.logout(function(dataResponse){
			console.log(dataResponse);
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
			},jsonParams, $scope);
		}else{
			$scope.errorQuestion = "The question can't be empty!."
		}
	};

	$scope.answerQuestion = function(){
		$scope.errorAnswer = "";
		var params = {};
		params["answer"] = $scope.answer;
		var jsonParams = JSON.stringify(params);
		answerQuestionService.postAnswer(function(dataResponse){
			$scope.answers.unshift(dataResponse.data);
		},$scope.questionSelected.id,jsonParams, $scope);
	};
}]);
