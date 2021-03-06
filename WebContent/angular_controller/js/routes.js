'use strict';

var app = angular.module('tool', ['ngRoute','ngSanitize','ui.bootstrap']);

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
				when('/CREATE-CLUSTER', {
					templateUrl: 'css/pages/createCluster.html',
					controller: 'createClusterController'
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
//uploading the file
app.directive('validFile',function(){
	  return {
	    require:'ngModel',
	    link:function(scope,el,attrs,ngModel){
	      el.bind('change',function(){
	        scope.$apply(function(){
	          ngModel.$setViewValue(el.val());
	          ngModel.$render();
	        });
	      });
	    }
	  }
	});
app.controller('hdfsController',function($scope,$http){
	//progress bar code begins
	function progressBar(){
		var bar='<div id="progress"><div id="bar"><div id="displayspace">0%</div></div><p class="text-center"><br><br><br><br><font size = "5" color="#333333"><b>Please wait while we process your request</b></font><br><br><br><br><br><img src="/SupportTool/images/processing.gif" alt="Smiley face" height="200" width="200"></p></div>'
			document.getElementById("progressBar").innerHTML=bar;
		var newBar=document.getElementById("bar");
		var width=0;
		var frames=setInterval(frame,350);
		function frame(){
			if(width>=100){
				clearInterval(frames);
				$('#progress').fadeOut();
				$("#wrapper").fadeIn();
				
			} else{
				width++;
				newBar.style.width=width+'%';
				document.getElementById("displayspace").innerHTML=width*1+'%';
			}
			}
		}
	//ends

	$scope.uploadFiles=function (){
		$("#wrapper").fadeOut();
    	progressBar();
    	
    	//display result after response appears
    	document.getElementById("command").style.display='block';
    	
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
		    	$scope.result=response.data[0].result;
		    	   
	    	   }, 
	    	   function(response) {
	    		   window.location = 'css/pages/503.html';
	    		    
	    	   });

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

app.controller('createClusterController',function($scope,$http){
	
	//progress bar code begins
	function progressBar(){
		var bar='<div id="progress"><div id="bar"><div id="displayspace">0%</div></div><p class="text-center"><br><br><br><br><font size = "5" color="#333333"><b>Please wait while we process your request</b></font><br><br><br><br><br><img src="/SupportTool/images/processing.gif" alt="Smiley face" height="200" width="200"></p></div>'
			document.getElementById("progressBar").innerHTML=bar;
		var newBar=document.getElementById("bar");
		var width=0;
		var frames=setInterval(frame,5);
		function frame(){
			if(width>=100){
				clearInterval(frames);
				$('#progress').fadeOut();
				$("#wrapper").fadeIn();
				
			} else{
				width++;
				newBar.style.width=width+'%';
				document.getElementById("displayspace").innerHTML=width*1+'%';
			}
			}
		}
	//ends
	//dynamically populating the select boxes using txt files
	$(function() {
	       $("#text-one").change(function() {
	           if(this.value != 'base'){
	                $.get( "css/pages/textdata/" + this.value + ".txt", function(data) {
	                    $("#text-two").html( data ).show();
	                });
	                
	                $.get( "css/pages/textdata/" +this.value+"-hdp.txt", function(data) {
	                    $("#text-three").html( data ).show();
	                });
	                
	                $.get( "css/pages/textdata/" +this.value+"-Utils-Version.txt", function(data) {
	                    $("#text-four").html( data ).show();
	                });
	                
	                
	           }else{
	                $("#text-two").hide();
	                $("#text-three").hide();
	                $("#text-four").hide();
	                
	           }
	           

	        });
	    });
	
	
	//controller to submit the cluster properties
	$scope.submitClusterDetail = function () {
		$("#wrapper").fadeOut();
    	progressBar();
    	
    	document.getElementById("command").style.display='block';
    	
		var cluster_name=$scope.cluster_name;
		var os_type=$scope.selectedOS;
		var ambari_version=$scope.selectedAmbariVersion;
		var cluster_version=$scope.selectedHDPVersion;
		var domain_name=$scope.domain_name;
		var default_password=$scope.default_password;
		var nodes_count=$scope.node_count;
		var host_names=$scope.host_names;
		var utils_version=$scope.selectedUtilVersion;
		var flavor_name=$scope.selectedFlavor;
		var keypair_name=$scope.keypair_name;
		var pvt_keyfile=$scope.pvt_keyfile;
		var project_name=$scope.selectedProjectName;
		var okta_id=$scope.okta_id;
		
		/*alert(" "+"cluster_name: "+cluster_name+
				" "+"os_type: "+os_type+
				" "+"ambari_version: "+ambari_version+
				" "+"cluster_version: "+cluster_version+
				" "+"domain_name: "+domain_name+
				" "+"default_password: "+default_password+
				" "+"nodes_count: "+nodes_count+
				" "+"utils_version: "+utils_version+
				" "+"flavor_name: "+flavor_name+
				" "+"keypair_name: "+keypair_name+
				" "+"pvt_keyfile: "+pvt_keyfile+
				" "+"project_name: "+project_name+
				" "+"okta_id: "+okta_id+
				" "+"host_names: "+host_names); */
    	
    	//Make a request packet
        var request = {
            method: 'POST',
            url: 'http://172.26.64.202:8050/hortonworks/support-tool/v1/createCluster',
            //headers: {'Content-Type': 'application/json'},
            responseType:'arraybuffer',
            data: JSON.stringify({'cluster_name':cluster_name,
            //params: {'cluster_name':cluster_name,
            	     'os_type':os_type,
            	     'ambari_version':ambari_version,
            	     'cluster_version':cluster_version,
            	     'domain_name':domain_name,
            	     'default_password':default_password,
            	     'nodes_count':nodes_count,
            	     'host_names':host_names,
            	     'utils_version':utils_version,
            	     'flavor_name':flavor_name,
            	     'keypair_name':keypair_name,
            	     'pvt_keyfile':pvt_keyfile,
            	     'project_name':project_name,
            	     'okta_id':okta_id})
        };
           //send the request
    	   $http(request)
    	   .then(function(response) {
    		   
    		   var a = document.createElement('a');
    		   var blob = new Blob([response.data]);
    		   a.href = URL.createObjectURL(blob);
    		   a.download = "Hortonworks.zip";
    		   a.click();

    	   }, 
    	   function(response) {
    		   window.location = 'css/pages/503.html';
    	   });
    	   
    } 
	
});
app.$inject = ['$scope'];//set default value in text boxes

app.controller('versionCheckController',function($scope,$http){

	function progressBar(){
			var bar='<div id="progress"><div id="bar"><div id="displayspace">0%</div></div><p class="text-center"><br><br><br><br><font size = "5" color="#333333"><b>Please wait while we process your request</b></font><br><br><br><br><br><img src="/SupportTool/images/processing.gif" alt="Smiley face" height="200" width="200"></p></div>'
				document.getElementById("progressBar").innerHTML=bar;
			var newBar=document.getElementById("bar");
			var width=0;
			var frames=setInterval(frame,350);
			function frame(){
				if(width>=100){
					clearInterval(frames);
					$('#progress').fadeOut();
					$("#wrapper").fadeIn();
					
				} else{
					width++;
					newBar.style.width=width+'%';
					document.getElementById("displayspace").innerHTML=width*1+'%';
				}
				}
			}

		//set the select box menu
	    $scope.components_names = ["HADOOP","HBASE","HIVE","HDFS"];
	    $scope.submitApacheJiraID = function () {
	    	$("#wrapper").fadeOut();
	    	progressBar();
	    	//display result after response appears
	    	document.getElementById("command").style.display='block';
	    	
	    	var components = $scope.selectedComponent;
	    	var jira_id=$scope.jira_id;
	    	//Make a request packet
	        var request = {
	            method: 'GET',
	            url: 'http://172.26.64.202:8050/hortonworks/support-tool/v1/checkForVersion',
	            params: {'components':components,'jira_id':jira_id},
	        };
	           //send the request
	    	   $http(request)
	    	   .then(function(response) {
	    		   $scope.version=response.data;
	    	   }, 
	    	   function(response) {
	    		   window.location = 'css/pages/503.html';
	    	   });
	    	   
	    } 

});
