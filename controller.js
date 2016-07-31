angular
  .module("myApp", [])
  .controller('mainController', function ($scope, $http) {
    $scope.getMovies = function () {
      if ($scope.keyword === '' || $scope.keyword === undefined) {
        $scope.emptyText = 'Type something to search.';
        return;
      }

      $http
        .post('movies.json')
        .error(function (data, status) {
          $scope.errorText = 'ERROR: Cannot fetch movies.';
        })
        .success(function (data, status) {
          var movies = [];

          data.forEach(function(movie) {
            // Search keyword at any place in movie title.
            if (movie.title.toLowerCase().indexOf($scope.keyword.toLowerCase()) > -1) {
              movies.push({
                title: movie.title,
                movietype: movie.movietype,
                picture: movie.picture
              });
            }
          });

          if (movies.length) {
            $scope.movies = movies;
          }
        });
    }
  });
