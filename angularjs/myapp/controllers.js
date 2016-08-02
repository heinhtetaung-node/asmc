listApp.controller('invoiceListViewctrl', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {		
	
	$rootScope.sortField="inv_no";
	$rootScope.reverse=false;
	
	$scope.$watch('search', function(term) {
		$rootScope.filtered = filterFilter($rootScope.pagedItems, term);
		$rootScope.filteredItems = $rootScope.filtered.length;
	});
	
});

listApp.controller('formlistctrl', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {		
	
	$rootScope.sortField="f_id";
	$rootScope.reverse=false;
	
	$scope.$watch('search', function(term) {
		$rootScope.filtered = filterFilter($rootScope.pagedItems, term);
		$rootScope.filteredItems = $rootScope.filtered.length;
	});
	
});

listApp.controller('adminlistctrl', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {		
	
	$rootScope.sortField="admin_id";
	$rootScope.reverse=false;
	$scope.igcol=5;
	$scope.$watch('search', function(term) {
		$rootScope.filtered = filterFilter($rootScope.pagedItems, term);
		$rootScope.filteredItems = $rootScope.filtered.length;
	});
	
});

listApp.controller('agentlistctrl', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {		
	
	$rootScope.sortField="agent_id";
	$rootScope.reverse=false;
	
	$scope.$watch('search', function(term) {
		$rootScope.filtered = filterFilter($rootScope.pagedItems, term);
		$rootScope.filteredItems = $rootScope.filtered.length;
	});
	
});

listApp.controller('customerlistctrl', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {		
	
	$rootScope.sortField="customer_id";
	$rootScope.reverse=false;
	
	$scope.$watch('search', function(term) {
		$rootScope.filtered = filterFilter($rootScope.pagedItems, term);
		$rootScope.filteredItems = $rootScope.filtered.length;
	});
	
});

listApp.controller('directorlistctrl', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {		
	
	$rootScope.sortField="dr_id";
	$rootScope.reverse=false;
	
	$scope.$watch('search', function(term) {
		$rootScope.filtered = filterFilter($rootScope.pagedItems, term);
		$rootScope.filteredItems = $rootScope.filtered.length;
	});
	
});

listApp.controller('managerlistctrl', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {		
	
	$rootScope.sortField="m_id";
	$rootScope.reverse=false;
	
	$scope.$watch('search', function(term) {
		$rootScope.filtered = filterFilter($rootScope.pagedItems, term);
		$rootScope.filteredItems = $rootScope.filtered.length;
	});
	
});










listApp.controller('homecontroller', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {
	$rootScope.isViewLoading = false;
	$rootScope.startFade = true;
	$rootScope.babylayout = true;
	Scopes.get('mainController').activetab='Dashboard';
	Scopes.get('mainController').ribbontitle="<li>Home</li><li>Dashboard</li>";
	//alert("home");
	
});


listApp.controller('languagecontroller', function ($scope, $controller, $http, filterFilter, restfunctions, Scopes, $rootScope) {
	$rootScope.isViewLoading = true;
	Scopes.get('mainController').activetab='Language';
	Scopes.get('mainController').ribbontitle="<li>Home</li><li>Language</li>";
	
	$scope.sortField="language_id";
	$scope.reverse=true;
	$scope.savedata = function() {	
		
		var $error=false;
		if(!$scope.language_name){$('#language_name').addClass("errorfield");$('#language_name').attr('placeholder','Language Name (Required)');$error=true;}else{$('#language_name').removeClass("errorfield");$('#language_name').attr('placeholder','Language Name');} 
		
		if(!$scope.language_code){$('#language_code').addClass("errorfield");$('#language_code').attr('placeholder','language Code (Required)');$error=true;}else{$('#language_code').removeClass("errorfield");$('#language_code').attr('placeholder','Language Code');} 
		
		if($error==true){ return false; }
		$('#loadingbox').fadeIn();
		var arr={ 'language_name'  : $scope.language_name, 'language_code'  : $scope.language_code };
		
		$http.post(baseurl+"Crud/savedata", { 'arr':arr, 'table':'tbl_language' }).success(function (data, status, headers, config) {
			$( "#loadingbox" ).delay(100).fadeOut( "fast" );
			$rootScope.getdatas('tbl_language');
			$scope.language_name  =  "";
			$scope.language_code  =  "";
			$( "#successbox" ).fadeIn();
			$( "#successbox" ).delay(1000).fadeOut( "slow" );
		})
		.error(function(data, status, headers, config){
			alert(data);
		});
	}
	
	$scope.checkenter = function(e){
		if(e.keyCode==13){
			$scope.savedata();
		}
	}
	
	$('#tbl').delegate('a.fa-save','click',function(e){
		var $tr = $(this).closest('tr');
		var language_id=$tr.attr('tr-id');
		var language_name=$tr.find('.language_name').val();
		var language_code=$tr.find('.language_code').val();
		var language_status=document.getElementById("st"+language_id).checked;
		
		var $error=false;
		if(!language_name){$tr.find('.language_name').addClass("errorfield");$tr.find('.language_name').attr('placeholder','Language Name (Required)');$error=true;} 
		if(!language_code){$tr.find('.language_code').addClass("errorfield");$tr.find('.language_code').attr('placeholder','Language Code (Required)');$error=true;} 
		if($error==true){ return false; }
		$('#loadingbox').fadeIn();
		var arr={
			'language_id'	      : language_id,
			'language_name'  	  : language_name,
			'language_code'		  : language_code,
			'language_status'	  : language_status	
		};
		
		$http.post(baseurl+"Crud/savedata", 
			{ 
				'id'		: language_id,
				'idname'	: 'language_id',
				'arr'		: arr, 
				'table'		: 'tbl_language' 
			}
		).success(function (data, status, headers, config) {
			$( "#loadingbox" ).delay(100).fadeOut( "fast" );
			$( "#successbox" ).fadeIn();
			$( "#successbox" ).delay(1000).fadeOut( "slow" );
			$rootScope.getdatas('tbl_language');
		});
		
	});
	
});
