app.controller("postController", ['$scope', 'Constant', 'APIService', postController]);

function postController($scope, Constant, APIService) {
    $scope.Title = "";
    $scope.DBOperation = "";
    $scope.ShowModal = false;
    $scope.Post = {};
    $scope.ButtonName = "";
    $scope.IsDisable = true;

    $scope.AddPost = function () {
        $scope.Post = {};
        $scope.ShowModal = true;
        $scope.IsDisable = false;
        $scope.ShowCommentForm = false;
        $scope.Title = "Add Post";
        $scope.ButtonName = "Add";
        $scope.DBOperation = Constant.DBOperation.CREATE;
    }

    $scope.EditPost = function (post) {
        $scope.Post = angular.copy(post);
        $scope.ShowModal = true;
        $scope.IsDisable = false;
        $scope.ShowCommentForm = false;
        $scope.Title = "Edit Post";
        $scope.ButtonName = "Update";
        $scope.DBOperation = Constant.DBOperation.UPDATE;
    }

    $scope.DeletePost = function (post) {
        $scope.Post = angular.copy(post);
        $scope.ShowModal = true;
        $scope.IsDisable = true;
        $scope.ShowCommentForm = false;
        $scope.Title = "Delete Post";
        $scope.ButtonName = "Delete";
        $scope.DBOperation = Constant.DBOperation.DELETE;
    }

    $scope.AddComment = function (post) {
        $scope.Comment = {};
        $scope.Comment.PostID = post.PostID;
        $scope.ShowModal = true;
        $scope.IsDisable = true;
        $scope.ShowCommentForm = true;
        $scope.Title = "Add Comments";
        $scope.ButtonName = "Add";
        $scope.DBOperation = Constant.DBOperation.ADDCOMMENT;
    }

    $scope.SubmitForm = function () {
        switch ($scope.DBOperation) {
            case Constant.DBOperation.CREATE:
                $scope.Post.Date = new Date();
                APIService.Post(Constant.POSTURL + "AddPost", { newPost: $scope.Post }).then(function (data) {
                    if (data.status == 1) {
                        $scope.Post.PostID = data.Post.PostID;
                        $scope.posts.push($scope.Post);
                        alert("Record add successfully.");
                    }
                    else {
                        alert("Error while saving record.");
                    }
                    $scope.ShowModal = false;
                });
                break;

            case Constant.DBOperation.UPDATE:
                APIService.Post(Constant.POSTURL + "EditPost", { editedPost: $scope.Post }).then(function (data) {
                    if (data.status == 1) {
                        var index = $scope.posts.indexOf($scope.posts.find(x => x.PostID == $scope.Post.PostID));
                        $scope.posts[index] = $scope.Post;
                        alert("Record updated successfully.");
                    }
                    else {
                        alert("Error while updating record.");
                    }
                    $scope.ShowModal = false;
                });
                break;

            case Constant.DBOperation.DELETE:
                APIService.Post(Constant.POSTURL + "DeletePost", { id: $scope.Post.PostID }).then(function (data) {
                    if (data.status == 1) {
                        var index = $scope.posts.indexOf($scope.posts.find(x => x.PostID == $scope.Post.PostID));
                        $scope.posts.splice(index, 1);
                        alert("Record deleted successfully.");
                    }
                    else {
                        alert("Error while deleting record.");
                    }
                    $scope.ShowModal = false;
                });
                break;

            case Constant.DBOperation.ADDCOMMENT:
                $scope.Comment.Date = new Date();
                APIService.Post(Constant.COMMENTURL + "AddComment", { comment: $scope.Comment }).then(function (data) {
                    if (data.status == 1) {
                        alert("Comment added successfully.");
                    }
                    else {
                        alert("Error while adding Comment.");
                    }
                    $scope.ShowModal = false;
                });
                break;
        }
    }

    $scope.CloseForm = function () {
        $scope.ShowModal = false;
    }
}