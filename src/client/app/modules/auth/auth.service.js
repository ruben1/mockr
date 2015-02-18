;(function(){

  angular
    .module('app.services.auth',[])
    .factory('auth', auth);

  auth.$inject = ['$http'];

  function auth($http) {

    var service = {
      login: login
    };

    return service;

    ////////////

    /**
     * logins user in by directing to server route for passport authentication
     */
    function login() {
      window.location = '/api/auth/login';
    }
  }

})();
