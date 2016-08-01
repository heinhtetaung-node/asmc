var baseurl="";
var listApp = angular.module('myapp', ['ui.bootstrap']);    

listApp.filter('rawHtml', ['$sce', function($sce){
	  return function(val) {
		return $sce.trustAsHtml(val);
	  };
}]);
	
	
listApp.filter('startFrom', function() {
	return function(input, start) {
	if(input) {
		start = +start; //parse to int
		return input.slice(start);
	}
	return [];
}
});

listApp.factory('Scopes', function ($rootScope) {
	var mem = {};
 
	return {
		store: function (key, value) {
			$rootScope.$emit('scope.stored', key);
			mem[key] = value;
		},
		get: function (key) {
			return mem[key];
		}
	};
});

listApp.run(function ($rootScope, $timeout, $http, filterFilter) {
	$rootScope.isViewLoading = true;
	$rootScope.babylayout=false;
	
	$rootScope.$on('scope.stored', function (event, data) {
		console.log("scope.stored", data);
	});
	
	$rootScope.$on('$routeChangeStart', function() {
		$rootScope.startFade = false;
		$rootScope.isViewLoading = true;
		$rootScope.babylayout = false;
	});
	$rootScope.$on('$routeChangeSuccess', function() {
		
	});
	$rootScope.$on('$routeChangeError', function() {
		$rootScope.isViewLoading = false;
	});
	
	
	/****************** get datas *******************/
	$rootScope.filteredItems =  [];
	$rootScope.pagedItems    =  [];
	$rootScope.currentPage   =  1;
	
	$rootScope.setPage = function(pageNo) {
		$rootScope.currentPage = pageNo;
	};
	
	$rootScope.getdatas = function(data){
		$rootScope.datas = data;   
		console.log($rootScope.datas);
		$rootScope.pagedItems = data;    
		$rootScope.currentPage = 1; 
		$rootScope.entryLimit = 20; 
		$rootScope.filteredItems = $rootScope.pagedItems.length;
		$rootScope.totalItems = $rootScope.pagedItems.length;		
	}
	
	$rootScope.$watch('search', function(term) {
		$rootScope.filtered = filterFilter($rootScope.pagedItems, term);
		$rootScope.filteredItems = $rootScope.filtered.length;
	});
	
	$rootScope.convertToDate = function (stringDate){
		if(stringDate==null || stringDate=="" || stringDate=="0000-00-00"){
			return "";
		}
		
		var dateOut = new Date(stringDate);
		//alert(dateOut);
		return dateOut;
	};
	
	$rootScope.reverse=true;
	
});

