var contApp = angular.module('contListApp',[]);

function hide_contact_modal(){
	$('#contactModal').modal('hide');
}

function hide_delete_modal(){
	$('.delete-confirm-modal-sm').modal('hide');
}

contApp.controller('ContactListCtrl',['$scope','$http',function($scope,$http){
	$scope.contactListData = [];
	$scope.show_new_contact_form = true;
	$scope.delete_id = '';
	$scope.refreshing_list = true;

	var refresh = function(){
		$scope.refreshing_list = true;
		$http.get('/contactlist').success(function(response){
			$scope.contactListData = response;
			$scope.refreshing_list =false;
			//console.log(response);
		});
	};

	refresh();		

	$scope.addcontact = function(){
		//console.log($scope.contact);
		$http.post('/contactlist', $scope.contact)
		.success(function(response){
			//console.log(response);
			$scope.contactListData.push(response);
			$scope.contact = {};
			hide_contact_modal();
		});
	};

	$scope.delete_id_step1 = function(id){
		//console.log(id);
		$scope.delete_id = id;
	};

	$scope.delete_contact = function(id){
		//console.log(id);
		$http.delete('/contactlist/'+id)
		.success(function(resonse){
			refresh();
			hide_delete_modal();
		});
	};

	$scope.edit_contact = function(id){
		$scope.show_new_contact_form = false;
		$http.get('/contactlist/'+id)
		.success(function(response){
			$scope.updateContact = response;
		});
	};

	$scope.updatecontact = function(){
		//console.log($scope.updateContact);
		$http.put('/contactlist/'+$scope.updateContact._id,$scope.updateContact)
		.success(function(response){
			refresh();
			hide_contact_modal();
		});
	}



}]);