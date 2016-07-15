'use strict';
//alert("hi");


var app = angular.module('tool', ['ngRoute','ngSanitize']);

app.config(function($routeProvider) {
	
				$routeProvider.
				when('/HDFS', {
					templateUrl: 'css/pages/hdfs.html',
					controller: 'hdfsController'
     
				}).
				when('/HBASE', {
					templateUrl: 'css/pages/hbase.html',
					controller: 'hbaseController'
     
				}).
				when('/AMBARI', {
					templateUrl: 'css/pages/ambari.html',
					controller: 'ambariController'
     
				}).
				when('/HIVE', {
					templateUrl: 'css/pages/hive.html',
					controller: 'hiveController'
     
				}).
				when('/ZOOKEEPER', {
					templateUrl: 'css/pages/zookeeper.html',
					controller: 'zookeeperController'
     
				}).
				when('/TEZ', {
					templateUrl: 'css/pages/tez.html',
					controller: 'tezController'
				}).
				when('/MAPREDUCE', {
					templateUrl: 'css/pages/mapreduce.html',
					controller: 'mapreduceController'
				}).
				when('/VERSION-CHECK', {
						templateUrl: 'css/pages/versioncheck.html',
						controller: 'versionCheckController'
	     
					}).
                otherwise({
                  redirectTo: '/VERSION-CHECK',
                });
              
          }
);


/*
app.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) { 
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ])
    .controller('hdfsController', function ($scope, $http) {

    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {alert($files);
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {
    	alert("inside uploadFiles"+$scope.table_name);

        var request = {
        		
            method: 'POST',
            url: 'http://10.22.8.240:8050/hortonworks/support-tool/v1/upload',
            //headers: {'Content-Type': undefined },
            //headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            //data: formdata,
            params: {'files':$scope.files, 'table_name':$scope.table_name}
            
        };


 	   $http(request)
 	   .then(function(response) {
 		   alert("success: "+response.data);
 		   //alert("Please proceed to view results")
 		   //$scope.version=response.data;
 	   }, 
 	   function(response) {
 		   //alert("error "+response);
 		   alert("error");
 	   });
        
    }
}); 

 */
app.controller('hdfsController',function($scope,$http){
	console.log("hello hdfs");
	
	$scope.uploadFiles=function (){
		alert("Request will be processed. Please wait for a while...");
		var uploadUrl="http://172.26.64.107:8080/hortonworks/support-tool/v1/upload";
		var formData=new FormData();
		formData.append("file",file.files[0]);
		 $http({
		        method: 'POST',
		        url: uploadUrl,
		        headers: {'Content-Type': undefined},
		        data: formData,
		        params: {'table_name':$scope.table_name	},
		        transformRequest: function(data, params, headersGetterFunction) {
		                        return data;
		         }
		     })
		     .then(function(response) {
		    	// $scope.myVar = !$scope.myVar;
	    		   //alert("success: "+JSON.stringify(response));
		    	 //alert(JSON.stringify(response.data));
		    	 $scope.result=response.data[0].result;
		    	 
		    	 //alert($scope.result)
		    	 
	    		   
	    	   }, 
	    	   function(response) {
	    		   alert("Error "+response);
	    		  
	    	   });
		    //.success(function(data, status) {   
		    //                alert("success"+data+":::"+status);
		    // })

		};
});


app.controller('hbaseController',function($scope,$http){
	console.log("hello hbase");
});

app.controller('ambariController',function($scope,$http){
});

app.controller('hiveController',function($scope,$http){
});

app.controller('zookeeperController',function($scope,$http){
});

app.controller('tezController',function($scope,$http){
});

app.controller('mapreduceController',function($scope,$http){
});

app.controller('versionCheckController',function($scope,$http){
	
		//set the select box menu
	    $scope.components_names = ["HADOOP","HBASE","HIVE"];
	    $scope.submitApacheJiraID = function () {
	    	//alert("inside apache jira func:  "+$scope.selectedComponent + "dcd "+$scope.jira_id);
	    	//document.getElementById("submit").onclick=progressBar
	    	
	    	var components = $scope.selectedComponent;
	    	var jira_id=$scope.jira_id;
	    	//specify the PORT NUMBER for picking up the JAR file: HADOOP=8080
	    	
	    	if($scope.selectedComponent=="HADOOP"){
	    		//alert("select box: "+$scope.selectedComponent);
	    		alert("Request will be processed. Please wait for a while...");
	    		var address ='http://172.26.64.202:8050/hortonworks/support-tool/v1/checkForVersion';
	    	}
	    	
	    	if($scope.selectedComponent=="HBASE"){
	    		//alert("select box: "+$scope.selectedComponent);
	    		alert("Request will be processed. Please wait for a while...");
	    		var address ='http://172.26.64.202:8060/hortonworks/support-tool/v1/checkForVersion';
	    	}
	    	
	    	if($scope.selectedComponent=="HIVE"){
	    		//alert("select box: "+$scope.selectedComponent);
	    		alert("Request will be processed. Please wait for a while...");
	    		var address ='http://172.26.64.202:8070/hortonworks/support-tool/v1/checkForVersion';
	    	}

	    	//Make a request packet
	        var request = {
	            method: 'GET',
	            url: address,//'http://172.26.64.202:8080/hortonworks/support-tool/v1/checkForVersion',
	            params: {'components':components,'jira_id':jira_id},
	            
	        };
	           //send the request
	    	   $http(request)
	    	   .then(function(response) {
	    		   //alert("success: "+response.data);
	    		   //alert("Please proceed to view results")
	    		   $scope.version=response.data;
	    	   }, 
	    	   function(response) {
	    		   //alert("error "+response);
	    		   alert("Request could not be send. Please validate the Jira ID");
	    	   });
	    	   
	    	   
	    } 
	       

	
});
