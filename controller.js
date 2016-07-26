angular.module('myModule', ['angular-advanced-searchbox'])


  .controller('mainController', ['$scope', function($scope) {
        $scope.sortType     = 'movieType'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchMovie   = '';     // set the default search/filter term


        $scope.selectGenre = [
          { movieType: "Comedy", name: "Fars fede ferie i las vegas", placeholder: "Comedy" },
          { movieType: "Thriller", name: "The others", placeholder: "Thriller" },
          { movieType: "Action", name: "Die hard 3", placeholder: "Action..."},
          { movieType: "Drama", name: "En verden udenfor", placeholder: "Drama..." }
        ];
        $scope.myname = "Cludo search";

$scope.availableSearchParams = [
  { key: "name", name: "Name", placeholder: "Name..." },
  { key: "city", name: "City", placeholder: "City...", restrictToSuggestedValues: true, suggestedValues: ['Berlin', 'London', 'Paris'] },
  { key: "country", name: "Country", placeholder: "Country..." },
  { key: "emailAddress", name: "E-Mail", placeholder: "E-Mail...", allowMultiple: true },
  { key: "job", name: "Job", placeholder: "Job..." }
];



  }]);
