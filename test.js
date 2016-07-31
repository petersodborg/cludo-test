angular.module('myApp', ["angular-szn-autocomplete", "demoTemplate.html"])


  .controller('myCtrl', ['$scope', function($scope, $http) {

$scope.getMovies = function () {
      if ($scope.keyword === '' || $scope.keyword === undefined) {
        $scope.emptyText = 'Type something to search.';
        return;
      }

      $http
        .post('movies.json')
        .error(function (data, status) {
          $scope.errorText = 'ERROR: Cannot fetch articles.';
        })
        .success(function (data, status) {
          var articles = [];

          data.forEach(function(movie) {
            // Search keyword at any place in article title.
            if (movie.title.toLowerCase().indexOf($scope.keyword.toLowerCase()) > -1) {
              articles.push({
                title: movie.title,
                movietype: movie.movietype
              });
            }
          });

          if (movies.length) {
            $scope.movies = movies;
          }
        });


$scope.availableSearchParams = [
  { key: "name", name: "Name", placeholder: "Name..." },
  { key: "city", name: "City", placeholder: "City...", restrictToSuggestedValues: true, suggestedValues: ['Berlin', 'London', 'Paris'] },
  { key: "country", name: "Country", placeholder: "Country..." },
  { key: "emailAddress", name: "E-Mail", placeholder: "E-Mail...", allowMultiple: true },
  { key: "job", name: "Job", placeholder: "Job..." }
];


      // directive configuration object
      $scope.options = {
        shadowInput: true,
        highlightFirst: true,
        searchMethod: "search",
        templateUrl: "demoTemplate.html"
      };

      /**
       * Method to get data for autocomplete popup
       * @param {string} query Input value
       * @param {object} deferred "$q.defer()" object
       */
      $scope.search = function (query, deferred) {
        var url = "http://jkuchta.cz/wikisearch/?action=query&list=search&srsearch=intitle:" + query + "&format=json&srprop=wordcount%7Csnippet&continue&srlimit=5";

        $http.get(url).success((function (deferred, data) { // send request

          // format data
          var results = [];
          data.query.search.forEach(function (item) {
            results.push({
              value: item.title,
              perex: item.snippet,
              wordcount: item.wordcount
            });
          });

          // resolve the deferred object
          deferred.resolve({results: results});
        }).bind(this, deferred));
      };
    }]);

    // custom template for popup
    angular.module("demoTemplate.html", []).run(["$templateCache", function($templateCache) {
      $templateCache.put("demoTemplate.html",
        '<ul ng-show="show" class="szn-autocomplete-results">\n' +
          '<li szn-autocomplete-result ng-repeat="result in results" ng-class="{selected: highlightIndex == $index}">\n' +
                 '<div><span view-as-html="result.value | sznAutocompleteBoldMatch:query"></span><span class="wordcount"> ({{result.wordcount}} words)</span></span></div>\n' +
            '<p view-as-html="result.perex"></p>\n' +
          '</li>\n' +
        '</ul>'
      );
    }]);




