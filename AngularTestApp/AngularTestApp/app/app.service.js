app.service('APIService', ['$http', function ($http) {

    this.Post = function (URL, data) {
        return $http.post(URL, JSON.stringify(data)).
            then(function (success) {
                return success.data;
            }).
            catch(function (error) {
                var data = { status : -1, message : error };
                return data;
            });;
    }
}]);