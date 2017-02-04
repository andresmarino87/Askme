var app = angular.module('askme', []);

app.constant('config', {
	    "URL": "http://localhost:3000/",    	
});

app.service('questionsService',['$http', 'config', function($http, config) {
	this.getData = function(callbackFunc) {
    	$http({
    		method: 'GET',
            url: config.URL+'questions',
    	}).then(function (success){
            callbackFunc(success);
        }, function (error){
            alert("error");
        });
    };
}]);

app.controller('questionCtrl', ['$scope', 'questionsService',function($scope, questionsService) {
	$scope.data = null;
    questionsService.getData(function(dataResponse) {
        $scope.questions = dataResponse.data;
        console.log(dataResponse.data);
    });
}]);
