var app = app || {};

app.Router = Backbone.Router.extend({

	routes:{
		"":"login",
		"register":"registerForm",
		"portal":"profilePage"
	},
	
	login: function(){
		$('#display').html(

			"<fieldset>"+
					"<div id='legend'>"+
						"<legend class=''>Log In</legend>"+
					"</div>"+
					"<div class='control-group'>"+
						"<!-- Username -->"+
						"<label class='control-label' for='username'>Username</label>"+
						"<div class='controls'>"+
							"<input type='text' id='username' name='username' placeholder='' class='input-xlarge'>"+
						"</div>"+
					"</div>"+
					"<div class='control-group'>"+
						"<!-- Password-->"+
						"<label class='control-label' for='password'>Password</label>"+
						"<div class='controls'>"+
							"<input type='password' id='pass' name='password' placeholder='' class='input-xlarge'>"+
						"</div>"+
					"</div></br>"+
					"<div class='control-group'>"+
						"<!-- Button -->"+
						"<div class='controls'>"+
							"<button class='btn btn-success' onclick='loginUser()'>Log In</button>"+
							"<button class='btn btn-cancel' onclick='goToRegister()'>I'm not registered!</button>"+
						"</div>"+
					"</div>"+
				"</fieldset>"
  		);

	},

	registerForm: function() {
		$('#display').html(

			"<fieldset>"+
					"<div id='legend'>"+
						"<legend class=''>Register</legend>"+
					"</div>"+
					"<div class='control-group'>"+
						"<!-- Username -->"+
						"<label class='control-label' for='username'>Username</label>"+
						"<div class='controls'>"+
							"<input type='text' id='username' name='username' placeholder='' class='input-xlarge'>"+
							"<p class='help-block'>Username can contain any letters or numbers, without spaces</p>"+
						"</div>"+
					"</div>"+
					"<div class='control-group'>"+
						"<!-- E-mail -->"+
						"<label class='control-label' for='fullname'>Full Name</label>"+
						"<div class='controls'>"+
							"<input type='text' id='fullName' name='fullname' placeholder='' class='input-xlarge'>"+
							"<p class='help-block'>Please provide your full name</p>"+
						"</div>"+
					"</div>"+
					"<div class='control-group'>"+
						"<!-- Password-->"+
						"<label class='control-label' for='password'>Password</label>"+
						"<div class='controls'>"+
							"<input type='password' id='pass' name='password' placeholder='' class='input-xlarge'>"+
							"<p class='help-block'>Password should be at least 4 characters</p>"+
						"</div>"+
					"</div>"+
					"<div class='control-group'>"+
						"<!-- Password -->"+
						"<label class='control-label' for='password_confirm'>Password"+
							"(Confirm)</label>"+
						"<div class='controls'>"+
							"<input type='password' id='pass2'"+
								"name='password_confirm' placeholder='' class='input-xlarge'>"+
							"<p class='help-block'>Please confirm password</p>"+
						"</div>"+
					"</div>"+
					"<div class='control-group'>"+
						"<!-- Button -->"+
						"<div class='controls'>"+
							"<button class='btn btn-success' onclick='registerUser()'>Register</button>"+
							"<button class='btn btn-cancel'>Cancel</button>"+
						"</div>"+
					"</div>"+
				"</fieldset>"
  		);
	},

	profilePage: function(){
	$('#login').html('<a href="">Log Out</a>');
	$('#login').click(function() {
		$.removeCookie('username');
		var fullUrl = $(location).attr('href');
		fullUrl = fullUrl.split("#");
		url = fullUrl[0];
		$(location).attr('href', url);
	})
	$('#mainSite').html(
	'<div class="tabbable tabs-left">'+
    '<ul class="nav nav-tabs nav-stacked" role="tablist">'+
      '<li><a href="#profile" role="tab" data-toggle="tab">My Profile</a></li>'+
      '<li><a href="#devices" role="tab" data-toggle="tab">My Devices</a></li>'+
      '<li><a href="#locations" role="tab" data-toggle="tab" onclick="displayLocation()">My Locations</a></li>'+
      '<li><a href="#friends" role="tab" data-toggle="tab">My Friends</a></li>'+
      '<li><a href="#thriends" role="tab" data-toggle="tab">My Thriends</a></li>'+
      '<li><a href="#visualization" role="tab" data-toggle="tab" onclick="visualizeRelationships()">View Relationship</a></li>'+
      '<li><a href="#kinship" role="tab" data-toggle="tab">Devices in Kinship</a></li>'+
      '<li><a href="#rules" role="tab" data-toggle="tab">My Rules</a></li>'+
    '</ul>'+
  //'</div>'+
  '<div class="tab-content">'+
    '<div class="tab-pane active" id="profile">'+
      '<div class="container">'+
      '<div class = "col-md-6">'+
        '<h2>Profile</h2>'+
        '<div id="profileContents">'+
        '</div>'+
        '<div id="profileLocationContents">'+
        	'<br/><h2>Location</h2>'+
        	'<h3>Outdoor</h3>'+
        		'<div id="profileOutdoor">'+
        		'</div>'+
    		'<h3>Indoor</h3>'+
    			'<div id="profileIndoor">'+
    			'</div>'+
        '</div>'+
      '</div>'+
		'<div class = "col-md-3">'+
			'</br></br><button class="btn btn-success" id="edit-profile" onclick="openProfileForm()">Edit Profile Information</button>'+
			'</br></br></br></br></br></br></br><button class="btn btn-success" id="edit-profile" onclick="openLocationForm()">Change Outdoor Location</button>'+
		'</br></br></br></br></br></br></br></br></br></br><button class="btn btn-success" id="edit-profile" onclick="openIndoorLocationForm()">Enable Indoor Location</button>'+
		'</div>'+
      '</div>'+
   '</div>'+
    '<div class="tab-pane" id="devices">'+
      '<div class="container">'+
		'<div class="ui-widget ui-helper-clearfix">' +

			'<div class="col-md-8">' +
				'<div class="panel panel-default" style="float:center">' +
				  '<div class="panel-heading">' +
				    '<h3 class="panel-title">Floor Layout</h3>' +
				  '</div>' +
				  '<div class="panel-body">' +
					'<div id="livingRoom" class="ui-widget-content ui-state-default siot-drop-target">' +
			          '<h4 class="ui-widget-header"><span class="ui-icon ui-icon-home">Living Room</span>Living Room</h4>' +
			        '</div>' +
		 	        '<div id="kitchen" class="ui-widget-content ui-state-default siot-drop-target">' +
			          '<h4 class="ui-widget-header"><span class="ui-icon ui-icon-home">Kitchen</span>Kitchen</h4>' +
			        '</div>' +
		 	        '<div id="diningRoom" class="ui-widget-content ui-state-default siot-drop-target">' +
			          '<h4 class="ui-widget-header"><span class="ui-icon ui-icon-home">Dining Room</span>Dining Room</h4>' +
			        '</div>' +
		 	        '<div id="bedroom" class="ui-widget-content ui-state-default siot-drop-target">' +
			          '<h4 class="ui-widget-header"><span class="ui-icon ui-icon-home">Bedroom</span>Bedroom</h4>' +
			        '</div>' +
				  '</div>' +
				'</div>' +
			'</div>' +
 	        
 	        '<div class="col-md-3">' +
		        '<div class="panel panel-default">' +
		        	'<div class="panel-heading">' +
		        		'<h3 class="panel-title">Catalog</h3> ' +
		        	'</div>' +
		        	'<div id=catalogBody class="panel-body catalog-panel">' +
				        
				    '</div>' +
			    '</div>' +
			'</div>' +
        '</div>' +
      '</div>'+
    '</div>'+
    '<div class="tab-pane" id="locations">'+
      '<div class="container">'+
        '<h2>Locations</h2>'+
        '<div id="locationsContents">'+
        	'<div id="map-canvas">'+
        	'</div>'+
        '</div>'+
      '</div>'+
   '</div>'+

    '<div class="tab-pane" id="friends">'+
     '<div class="container" id="friendsContainer">'+
        '<h2>Friends</h2>'+
        //'<div id="friendsContents">'+
        //'</div>'+
        '<div class="container" >'+
        //change here to fix.charlotte
            //'<div class="panel-heading">'+
                '<ul class="nav nav-tabs " data-tabs="tabs" id="friendsUL">'+
                    '<li class="active"><a href="#myCurrentFriends" data-toggle="tab" onclick="getUserFriends()">My Friends</a></li>'+
                    '<li><a href="#addNewFriends" data-toggle="tab">Add New Friends</a></li>'+
                 '</ul>'+
            //'</div>'+
            //'<div class="panel-body">'+ style="height: 50px"
            	'<div class="tab-content" >'+
                	'<div class="tab-pane fade in active" id="myCurrentFriends">'+
                	'</div>'+
                	'<div class="tab-pane fade" id="addNewFriends"> '+ 
                			'Search New Friends' +
                		'<div class="input-group custom-search-form">' + 
              				'<input type="text" class="form-control" id="search-users">' +
              				'<span class="input-group-btn">' +
              				'<button class="btn btn-default" type="button" onclick="displayUsers()">' +
              				'<span class="glyphicon glyphicon-search"></span>' +
            				'</button>' +
             				'</span>' +
             			'</div><!-- /input-group -->' +
             			'<div id="friendshipCandidates"></div>' +
                	'</div>'+
               	'</div>'+
            //'</div>'+
        '</div>'+

      '</div>'+
    '</div>'+

    '<div class="tab-pane" id="thriends">'+
      '<div class="container">'+
        "<h2>Thriends</h2>"+
        '<div id="thriendsContents">'+
        '</div>'+
      "</div>"+
    "</div>"+


    '<div class="tab-pane" id="visualization">'+
      '<div class="container">'+
        "<h2>Here is the Visualization </h2>"+
        '<svg id="relationshipMap"></svg>'+
        
      "</div>"+
    "</div>"+

    '</div>'+
  "</div>");

	$('#displayContainer').html("");
	$('#error').html("");

	displayUserProfile();
	defineDrops();
	displayDevices();
	getUserDevices();
	defineIcons();
	getUserFriends();
	getAllUsersShort();

	}

});



