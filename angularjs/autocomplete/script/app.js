var app = angular.module('app', ['autocomplete']);
var funders = [];
// the service that retrieves some movie title from an url


app.filter('startFrom', function() {
return function(input, start) {
	if(input) {
		start = +start; //parse to int
		return input.slice(start);
	}
	return [];
}
});

app.factory('MovieRetriever', function($http, $q, $timeout){
  var MovieRetriever = new Object();

  MovieRetriever.getmovies = function(i) {
    var moviedata = $q.defer();
    var movies;

    //var someMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel"];

    var moreMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel", "The Way Way Back", "Before Midnight", "Only God Forgives", "I Give It a Year", "The Heat", "Pacific Rim", "Pacific Rim", "Kevin Hart: Let Me Explain", "A Hijacking", "Maniac", "After Earth", "The Purge", "Much Ado About Nothing", "Europa Report", "Stuck in Love", "We Steal Secrets: The Story Of Wikileaks", "The Croods", "This Is the End", "The Frozen Ground", "Turbo", "Blackfish", "Frances Ha", "Prince Avalanche", "The Attack", "Grown Ups 2", "White House Down", "Lovelace", "Girl Most Likely", "Parkland", "Passion", "Monsters University", "R.I.P.D.", "Byzantium", "The Conjuring", "The Internship"];

	
	if(funders.length==0){
		$http.get("http://localhost:9999/asmc/form/getallcustomers").success(function (data, status, headers, config) {
			// data.foreach(function(e){
				// alert(e.customer_nric);
				// funders.push(e.customer_nric);
			// });
			// console.log(funders);
			
			for(n=0; n<data.length; n++){
				if(data[n].customer_nric!="" && data[n].customer_name!=""){
					var cus=data[n].customer_nric+" - "+data[n].customer_name;
					funders.push(cus);
				}
			}
		});
	}
	
	moreMovies = funders;
	
	
    if(i && i.indexOf('T')!=-1)
      movies=moreMovies;
    else
      movies=moreMovies;

    $timeout(function(){
      moviedata.resolve(movies);
    },1000);

    return moviedata.promise
  }

  return MovieRetriever;
});

app.controller('MyCtrl', function($scope, MovieRetriever){
  
  $scope.funders = [];
  
  $scope.getfunders = function(data){
	$scope.funders = data;
	//console.log(data);
  }
  
  $scope.movies = MovieRetriever.getmovies("...");
  $scope.movies.then(function(data){
    $scope.movies = data;
  });

  $scope.getmovies = function(){
    return $scope.movies;
  }

  $scope.doSomething = function(typedthings){
    //console.log("Do something like reload data with this: " + typedthings );
    $scope.newmovies = MovieRetriever.getmovies(typedthings);
    $scope.newmovies.then(function(data){
      $scope.movies = data;
    });
  }

  $scope.filtercustomer=[];
  $scope.doSomethingElse = function(suggestion){
    //console.log("Suggestion selected: " + suggestion );
	
	var str = suggestion;
	var res = str.split(" - ");
	$scope.customer_nric=res[0];
	var nric=res[0];
	
	if(nric!=""){
		var filteritem = $scope.funders.filter(function(entry){
			return entry.customer_nric == nric;	
		})[0];
		if(filteritem){
			console.log(filteritem);
			
			dob=filteritem.customer_dob;
			formatdob=dob.substring(8, 10)+"-"+dob.substring(5,7)+"-"+dob.substring(0,4);
			$('#dob_id').val(formatdob);
			
			$scope.filtercustomer=filteritem;
			
			// customer_acc_type
			// customer_addr
			// customer_addr2
			// customer_bank_acc
			// customer_bank_name
			// customer_bank_swift
			// customer_created_date
			// customer_dob
			// customer_email
			// customer_home_no
			// customer_id
			// customer_login_date
			// customer_mobile
			// customer_names
			// customer_nric
			// customer_pass
			// customer_project
			// customer_username
			
			// $c['customer_name'] = $_POST['name'];
			// $c['customer_email'] = $_POST['email'];
			// $c['customer_nric'] = $_POST['nric'];
			// $c['customer_dob'] = date('Y-m-d', strtotime($_POST['dob']));
			// $c['customer_addr'] = $_POST['address'];
			// $c['customer_mobile'] = $_POST['mobile'];
			// $c['customer_home_no'] = $_POST['tel'];
			// $c['customer_bank_name'] = $_POST['bank_acc_name'];
			// $c['customer_bank_acc'] = $_POST['bank_acc_no'];
					
		}
	}
  }
  
  $scope.convertToDate = function (stringDate){
		if(stringDate==null || stringDate=="" || stringDate=="0000-00-00"){
			return "";
		}
		
		var dateOut = new Date(stringDate);
		//alert(dateOut);
		return dateOut;
	};

});
