var siotRouter = new app.Router();
Backbone.history.start();
var socialite_server = "http://jersey.socialiot.net/SIOT/rest/";
//var socialite_server = "http://54.152.116.161:8080/SIOT/rest/";

var testing = false;
var testingRegistration = true;

var currentUserOutdoor;
var currentUser;
var map;
var newDevice;

var deviceToDrop;
var roomNumber;
var manufacturerName;
var deviceDialog;

var defaultDeviceDialog = $('#DefaultDeviceForm').dialog({
  autoOpen: false,
  height: 500,
  width: 350,
  modal: true,
  buttons: {
    "Register Device": registerNewDevice,
    Cancel: function(){defaultDeviceDialog.dialog("close");}
    }
  });

var nestDeviceDialog = $('#NestDeviceForm').dialog({
  autoOpen: false,
  height: 500,
  width: 350,
  modal: true,
  buttons: {
    "Register Device": registerNewDevice,
    Cancel: function(){nestDeviceDialog.dialog("close");}
    }
  });

var netatmoDeviceDialog = $('#NetatmoDeviceForm').dialog({
  autoOpen: false,
  height: 500,
  width: 350,
  modal: true,
  buttons: {
    "Register Device": registerNewDevice,
    Cancel: function(){netatmoDeviceDialog.dialog("close");}
    }
  });

var philipsDeviceDialog = $('#PhilipsDeviceForm').dialog({
  autoOpen: false,
  height: 500,
  width: 350,
  modal: true,
  buttons: {
    "Register Device": registerNewDevice,
    Cancel: function(){philipsDeviceDialog.dialog("close");}
    }
  });

var virtualDeviceDialog = $('#VirtualDeviceForm').dialog({
  autoOpen: false,
  height: 500,
  width: 350,
  modal: true,
  buttons: {
    "Register Device": registerNewDevice,
    Cancel: function(){virtualDeviceDialog.dialog("close");}
    }
  });

var roomNames = ["livingRoom", "kitchen", "diningRoom", "bedRoom"];
$( "#datepicker").datepicker();
// there's the gallery and the dropTarget
var $gallery = $( "#gallery" );
var $dropTarget = $( ".siot-drop-target" );

function defineDrops(){
	$gallery = $( "#gallery" );
	$dropTarget = $( ".siot-drop-target" );
	// let the gallery items be draggable
	$( "li", $gallery ).draggable({
	cancel: "a.ui-icon", // clicking an icon won't initiate dragging
	revert: "invalid", // when not dropped, the item will revert back to its initial position
	containment: "document",
	helper: "clone",
	cursor: "move"
	});

	// let the dropTarget be droppable, accepting the gallery items
	$dropTarget.droppable({
	accept: ".ui-widget-content.ui-corner-tr",
	activeClass: "ui-state-highlight",
	drop: function( event, ui ) {
	  console.log($(this).attr("id"));
	  if ($(this).attr("id")==="livingRoom") {
	  console.log("target is the livingRoom");
	  manufacturerName = ui.draggable.data("info").name;
	  showDeviceForm(ui.draggable.data("info").model, manufacturerName, "livingRoom");
	  deviceToDrop = ui.draggable.clone();
	  roomNumber = 0;
	  } else if ($(this).attr("id")==="kitchen") {
	    console.log("target is the kitchen");
	    manufacturerName = ui.draggable.data("info").name;
	    showDeviceForm(ui.draggable.data("info").model, manufacturerName, "kitchen");
	    deviceToDrop = ui.draggable.clone();
	    roomNumber = 1;
	  } else if ($(this).attr("id")==="diningRoom") {
	    console.log("target is the diningRoom");
	    manufacturerName = ui.draggable.data("info").name;
	    showDeviceForm(ui.draggable.data("info").model, manufacturerName, "diningRoom");
	    deviceToDrop = ui.draggable.clone();
	    roomNumber = 2;
	  } else if ($(this).attr("id")==="bedroom") {
	    console.log("target is the office");
	    manufacturerName = ui.draggable.data("info").name;
	    showDeviceForm(ui.draggable.data("info").model, manufacturerName, "bedRoom");
	    deviceToDrop = ui.draggable.clone();
	    roomNumber = 3;
	  }
	}
	});

}

//TODO: Should probably refactor this so that it works via templates instead
function showDeviceForm(model, name, room)
{

	if (name == "Nest") {
		deviceDialog = nestDeviceDialog;
	} else if (name == "Netatmo") {
		deviceDialog = netatmoDeviceDialog;
	} else if (name == "Virtual") {
		deviceDialog = virtualDeviceDialog;
	} else if (name == "Philips") {
		deviceDialog = philipsDeviceDialog;
	} else {
		deviceDialog = defaultDeviceDialog;
	}

	var username = $.cookie("username");
	$('#' + name + 'DeviceType').val(model);
	$('#' + name + 'DeviceManufacturer').val(name);

	// Placeholders for testing so I don't have to paste this in every time
	if(testingRegistration)
	{
		$('#' + name + 'ClientID').val("b9e698b2-70db-417f-8f4f-c2fbfd76bd65");
		$('#' + name + 'ClientSecret').val("WVLhNAnWZHEN08MXpFGDaPRyi");
	}
	else;

	deviceDialog.dialog("open");
	newDevice = new app.DeviceModel({
	deviceType: $('#' + name + 'DeviceType').val(),
	deviceManufacturer: $('#' + name + 'DeviceManufacturer').val(),
	deviceRoom: username + "_Home_1st_Floor_" + room
	});
}

function registerNewDevice()
{
	var username = $.cookie("username");
	var formsFilled = true;
	var inputs = $('#' + manufacturerName + 'DeviceForm').find('input');
	inputs.each(function(){
		console.log($(this).val());
		if ($(this).val() == "") {
			formsFilled = false;
		}
	});
	/*
	if($('#' + manufacturerName + 'DeviceID').val() == "")
	formsFilled = false;
	if($('#' + manufacturerName + 'DeviceName').val() == "")
	formsFilled = false;
	if($('#' + manufacturerName + 'ClientID').val() == "")
	formsFilled = false;
	if($('#' + manufacturerName + 'ClientSecret').val() == "")
	formsFilled = false;
	if($('#' + manufacturerName + 'Code').val() == "")
	formsFilled = false;
	*/
	if(testing)
	{
		deleteImage(deviceToDrop, roomNumber);
		deviceDialog.dialog("close");
	}
	else if(formsFilled)
	{
	newDevice.set("deviceName", $('#' + manufacturerName + 'DeviceName').val());
	newDevice.set("deviceManufacturerId", $('#' + manufacturerName + 'DeviceID').val());
	newDevice.set("client_id", $('#' + manufacturerName + 'ClientID').val());
	newDevice.set("client_secret", $('#' + manufacturerName + 'ClientSecret').val());
	newDevice.set("code", $('#' + manufacturerName + 'Code').val());

	var payload;
	if (manufacturerName == "Nest") {
		payload = JSON.stringify({"Device":{
			"deviceManufacturerId": newDevice.get("deviceManufacturerId"),
			"deviceName": newDevice.get("deviceName"),
			"deviceManufacturer": newDevice.get("deviceManufacturer"),
			"deviceType": newDevice.get("deviceType"),
			"client_id": newDevice.get("client_id"),
			"client_secret": newDevice.get("client_secret"),
			"code": newDevice.get("code"),
			"deviceRoom" : newDevice.get("deviceRoom")
			}
		});
	} else if (manufacturerName == "Netatmo") {
		payload = JSON.stringify({"Device":{
			"deviceManufacturerId": newDevice.get("deviceManufacturerId"),
			"deviceName": newDevice.get("deviceName"),
			"deviceManufacturer": newDevice.get("deviceManufacturer"),
			"deviceType": newDevice.get("deviceType"),
			"client_id": newDevice.get("client_id"),
			"client_secret": newDevice.get("client_secret"),
			"deviceRoom" : newDevice.get("deviceRoom")
			}
		});
	} else if (manufacturerName == "Virtual") {
		payload = JSON.stringify({"Device":{
			"deviceManufacturerId": newDevice.get("deviceManufacturerId"),
			"deviceName": newDevice.get("deviceName"),
			"deviceManufacturer": newDevice.get("deviceManufacturer"),
			"deviceType": newDevice.get("deviceType"),
			"client_id": newDevice.get("client_id"),
			"client_secret": newDevice.get("client_secret"),
			"deviceRoom" : newDevice.get("deviceRoom")
			}
		});
	} else if (manufacturerName == "Philips") {
		payload = JSON.stringify({"Device":{
			"deviceManufacturerId": newDevice.get("deviceManufacturerId"),
			"deviceName": newDevice.get("deviceName"),
			"deviceManufacturer": newDevice.get("deviceManufacturer"),
			"deviceType": newDevice.get("deviceType"),
			"deviceRoom" : newDevice.get("deviceRoom"),
			"client_id": "",
			"client_secret": ""
			//Philips user name to be added at a later date
			}
		});
	} else {
		payload = JSON.stringify({"Device":{
			"deviceManufacturerId": newDevice.get("deviceManufacturerId"),
			"deviceName": newDevice.get("deviceName"),
			"deviceManufacturer": newDevice.get("deviceManufacturer"),
			"deviceType": newDevice.get("deviceType"),
			"deviceRoom" : newDevice.get("deviceRoom")
			}
		});
	}
	

	$.ajax({
	  type: "POST",
	  //url: "http://54.174.179.125/SIOT/rest/devices/"+username,
	  url: socialite_server+"devices/"+username,
	  data: payload,
	  contentType: "application/json; charset=utf-8",
	  datatype: "json",
	  Origin: "*",
	  success: function(data){
	  deleteImage(deviceToDrop, roomNumber);
	  deviceDialog.dialog("close");
	  $('#' + manufacturerName + 'DeviceID').val("");
	  $('#' + manufacturerName + 'DeviceName').val("");
	  $('#' + manufacturerName + 'ClientID').val("");
	  $('#' + manufacturerName + 'ClientSecret').val(""); 
	  $('#' + manufacturerName + 'Code').val("");
	  },
	  failure: function(errMsg){alert(errMsg);
	  }
	});

	}
}

// let the gallery be droppable as well, accepting items from the dropTarget
$gallery.droppable({
	accept: ".siot-drop-target li",
	activeClass: "custom-state-active",
	drop: function( event, ui ) {
	  recycleImage( ui.draggable );
	}
});

// image deletion function
var delete_icon = "<a href='#' title='Recycle this image' style='float:right'><i class='glyphicon glyphicon-trash' aria-hidden='true'></i></a>",
edit_icon = "<a href='#' title='Edit this device' style='float:left'><i class='glyphicon glyphicon-pencil' aria-hidden='true'></i></a>",
controls_icon = "<a href='#' title='Control this device' style='float:right'><i class='glyphicon glyphicon-tasks' aria-hidden='true'></i></a>",
chart_icon = "<a href='#' title='History of device' style='float:left'><i class='glyphicon glyphicon-stats' aria-hidden='true'></i></a>";

function deleteListItem() {
	console.log("Trash was clicked");
	//console.log("This is a " + $item.html());
	return true;
}

function deleteImage( $item, room ) {
var roomIndex = room;
$item.fadeOut(function() {
  var $list = $( "ul", $dropTarget[roomIndex] ).length ?
    $( "ul", $dropTarget[roomIndex] ) :
    $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $dropTarget[roomIndex] );

  $item.find( "a.ui-icon-dropTarget" ).remove();
  $item.prepend( edit_icon, controls_icon ).append( delete_icon, chart_icon ).appendTo( $list ).fadeIn(function() {
    $item
      .animate({ width: "48px" })
      .find( "img" )
        .animate({ height: "36px" });
  });
});
}

// image recycle function
var dropTarget_icon = "<a href='link/to/dropTarget/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-dropTarget'>Delete image</a>";
function recycleImage( $item ) {
$item.fadeOut(function() {
  $item
    .find( "a.ui-icon-refresh" )
      .remove()
    .end()
    .css( "width", "96px")
    .append( dropTarget_icon )
    .find( "img" )
      .css( "height", "72px" )
    .end()
    .appendTo( $gallery )
    .fadeIn();
});
}

// image preview function, demonstrating the ui.dialog used as a modal window
function viewLargerImage( $link ) {
var src = $link.attr( "href" ),
  title = $link.siblings( "img" ).attr( "alt" ),
  $modal = $( "img[src$='" + src + "']" );

if ( $modal.length ) {
  $modal.dialog( "open" );
} else {
  var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
    .attr( "src", src ).appendTo( "body" );
  setTimeout(function() {
    img.dialog({
      title: title,
      width: 400,
      modal: true
    });
  }, 1 );
}
}

//DEPRECATED: Function to control the slider in the thermometer panel
//$(function() {
$( "#slider-range-min" ).slider({
  range: "min",
  value: 67,
  min: 1,
  max: 105,
  slide: function( event, ui ) {
    $( "#amount" ).val( ui.value + " F");
  }
});
$( "#amount" ).val( $( "#slider-range-min").slider( "value" ) + " F");
//});

function updateDevice(id, type) { //TODO: Change this code so that it does different things depending on deviceType and form URL differently depending on parameter
	//deviceId forms part of URL for REST endpoint
	//deviceType dictates what kind of payload we send
	
	deviceId = id;
	deviceType = type;
	
	console.log("UpdateDevice: Device has ID " + deviceId + " and type " + deviceType);
	
	//Sets payload which user sends back to server
	
	var userPayload = "false";

	if ($("#on").is(":checked") == true) {
		userPayload = "true";
	}

	parameter = "OnState"; //Parameter is OnState b/c on setting was changed
	
	var url = socialite_server + "devices/" + $.cookie("username") + "/" + deviceId + "/" + parameter;

	$.ajax({
		type: "PUT",
		url: url,
		data: userPayload,
		contentType: "application/json; charset=utf-8",
		datatype: "json",
		Origin: "*",
		success: function(data){
		},
		failure: function(errMsg){alert(errMsg);
		}
	});
	//Blank form values so that we can use them later
	//$("input[id=deviceId]").val("");
	//$("input[id=deviceType]").val("");
}

//TODO: Make AJAX call - or get info from Backbone.js model - and then populate ONE single form (as opposed to making one form per device)
function openControls(id, type) {
	console.log("Device ID is " + id + " and type is " + type); //Switch case on deviceType
	//Render Underscore template to inject device type and ID
	var template = _.template($( "#controlsDialogDisplay" ).html());
	html = template({ deviceId: id, deviceType: type });

	//Create and open dialog
	controlsDialog = $( html ).dialog({
		autoOpen: false,
		height: 350,
		width: 350,
		modal: true,
		buttons: {
			"Update Device": function() {
				updateDevice(id, type);
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});

	controlsDialog.dialog("open");
}

function defineIcons (){
// resolve the icons behavior with event delegation
$( ".ui-widget-content.ui-state-default.siot-drop-target.ui-droppable" ).on("click", "li", function( event ) {
var $item = $( this ),
  $target = $( event.target );
//Get device ID and device type
deviceId = $item.children().eq(2).attr('id');
deviceType = $item.children().eq(2).children().eq(2).val();
if ( $target.is("a > i.glyphicon-trash") ) {
  console.log("glyphicon-trash was clicked");
  $item.fadeOut(); //TODO: actually delete whatever device was clicked
} else if ( $target.is( "a > i.glyphicon-tasks" ) ) {
  console.log("openControls is being called on device " + deviceId + " of type " + deviceType);
  openControls(deviceId, deviceType); //Pass deviceId and device type
}  else if( $target.is('a > i.glyphicon-stats')) {
	// Generate and open chart with static device history
	// will replace data with info from server when implemented
	var chartDialog = $( "#thermoChart" ).dialog({
	    autoOpen: true,
	    height: 600,
	    width: 800,
	    modal: true,
	    buttons: {
	    Cancel: function() {
	      chartDialog.dialog( "close" );
	    }
	}
	});

	$.ajax({
	  type: "GET",
	  //url: "http://54.174.179.125:80/SIOT/rest/devices/"+$.cookie('username')+"/TempSensor_Servers/HistoryData",
	  url: socialite_server+ "devices/"+$.cookie('username')+"/TempSensor_Servers/HistoryData",
	  contentType: "application/json; charset=utf-8",
	  datatype: "json",
	  Origin: "*",
	  success: function(data){
	  	//alert(data.content[0][0]);
	  	var timestamps = [];
	  	var temps = [];
	  	for(var i = 23; i >= 0; i--)
	  	{
	  		var time = data.content[data.content.length - i-1][0];
	  		var d = new Date(0);
	  		d.setUTCSeconds(time);
	  		timestamps[i] = d.getHours();
	  		//alert(timestamps[i]);
	  		temps[i] = parseInt(data.content[data.content.length - i-1][1]);
	  	}
	  	$('#thermoChart').highcharts({
          title: {text: "Temperature Last 24 Hours",
              //text: 'Temperatures In Last 24 Hours',
              x: -20 //center
          },
          xAxis: {
      		title: {text: "Hour"},
              categories: timestamps
          },
          yAxis: {
              title: {
                  text: 'Temperature (°C)'
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              valueSuffix: '°C'
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
          },
          series: [{
              name: 'Kitchen Thermostat',
              data: temps
          }]
      });
	  	  },
	  failure: function(errMsg){alert(errMsg);
	  }
	});
	
} else if ( $target.is( "a.ui-icon-zoomin" ) ) {
  viewLargerImage( $target );
} else if ( $target.is( "a.ui-icon-refresh" ) ) {
  recycleImage( $item );
};

return false;
});
}


var userDialog = $( "#profileForm" ).dialog({
		autoOpen: false,
		height: 350,
		width: 350,
		modal: true,
		buttons: {
		"Update Profile": updateProfile,
		Cancel: function() {
			userDialog.dialog( "close" );
		}
	}
});

var outdoorDialog = $('#outdoorLocationForm').dialog({
		autoOpen: false,
		height: 600,
		width: 350,
		modal: true,
		buttons: {
		"Update Profile": updateLocation,
		Cancel: function() {
			outdoorDialog.dialog( "close" );
		}
	}
});

var indoorDialog = $('#indoorLocationForm').dialog({
		autoOpen: false, 
		heigh : 350, 
		width : 350,
		modal: true,
		buttons: {
			"Update Profile": updateIndoorLocation, 
			Cancel: function() {
				indoorDialog.dialog("close"); 
		}
	}
});

function registerUser() 
{
	if($('#username').val() == "" || $('#pass').val() == "" || $('#pass2').val() == "" || $('#fullName').val() == "")
	{
		$('#error').html("One or more forms were not filled out");
	}
	else if($('#pass').val() != $('#pass2').val())
	{
		$('#error').html("Your passwords did not match!");
	}
	else
	{
		$('#error').html("Register form successful");
	
	var newUser = new app.RegisterInfo({
		username: $('#username').val(),
		password: $('#pass').val(),
		fullname: $('#fullName').val()
	});

	var userPayload = JSON.stringify({'User': {
		'LoginInfo' : {
			'username': newUser.get('username'),
			'password': newUser.get('password')
		},
		'userAlias' : newUser.get('fullname')
	}});

		
	$.ajax({
		type: "POST",
		//url: "http://54.174.179.125/SIOT/rest/users",
		url: socialite_server+"users",
		data: userPayload,
		contentType: "application/json; charset=utf-8",
		datatype: "json",
		Origin: "*",
		success: function(data){alert("User registered!");
		var fullUrl = $(location).attr('href');
		fullUrl = fullUrl.split("#");
		url = fullUrl[0];
		$(location).attr('href', url);
		},
		failure: function(errMsg){alert(errMsg);
		}
	});

	
	}
}

function goToRegister()
{
	var fullUrl = $(location).attr('href');
	fullUrl = fullUrl.split("#");
	url = fullUrl[0];
	$(location).attr('href', url + "#register");
}

function loginUser()
{
	if($('#username').val() == "" || $('#pass').val() == "")
	{
		$('#error').html("One or more forms were not filled out");
	}
	else
	{
		$.ajax({
		type: "GET",
		//url: "http://54.174.179.125/SIOT/rest/users/" + $('#username').val(),
		url: socialite_server+"users/" + $('#username').val(),
		contentType: "application/json",
		datatype: "json",
		Origin: "*",
		success: function(data){
			//var payload = JSON.parse(data);
			if($('#pass').val() == data.content.LoginInfo.Password)
			{
				$.cookie('username', data.content.LoginInfo.Username);
				$('#error').html("Successfully logged in!");
				var fullUrl = $(location).attr('href');
				fullUrl = fullUrl.split("#");
				url = fullUrl[0];
				$(location).attr('href', url + "#portal");
			}
			else
			{
				$('#error').html("Username or password incorrect");
			}
			
			
		},
		error: function(){
			$('#error').html("Username or password incorrect");
		}
		});

	}
}

function displayUserProfile()
{
	var username = $.cookie("username");
	$.ajax({
		type: "GET",
		url: socialite_server+ "users/" + username, // Old server for now, new one breaks locations
		contentType: "application/json",
		datatype: "json",
		Origin: "*",
		success: function(data){
			currentUser = new app.User({
				username: username,
				fullName: data.content.UserAlias,
				password: data.content.LoginInfo.Password
			});
			var currentUserView = new app.UserView({model: currentUser});
			$('#profileContents').html(currentUserView.render().el);

			$('#profileChangeName').val(currentUser.get("fullName"));
			$('#profileChangePassword').val(currentUser.get("password"));

			
			if(data.content.OutdoorLocation == null)
			{
				$('#profileOutdoor').html("No Outdoor Location");
			}

			else
			{
				currentUserOutdoor = new app.OutdoorLocation({
				PostalCode: data.content.OutdoorLocation.Address.PostalCode,
				CountryName: data.content.OutdoorLocation.Address.CountryName,
				StateName: data.content.OutdoorLocation.Address.StateName,
				CityName: data.content.OutdoorLocation.Address.CityName,
				StreetAddress: data.content.OutdoorLocation.Address.StreetAddress,
				Latitude: data.content.OutdoorLocation.GeoLocation.Latitude,
				Longitude: data.content.OutdoorLocation.GeoLocation.Longitude,
				LocationId: data.content.OutdoorLocation.LocationId
				});
				var currentOutdoorView = new app.OutdoorView ({model: currentUserOutdoor});
				$('#profileOutdoor').html(currentOutdoorView.render().el);
				$('#profileChangeAddress').val(currentUserOutdoor.get("StreetAddress"));
				$('#profileChangeCity').val(currentUserOutdoor.get("CityName"));
				$('#profileChangeState').val(currentUserOutdoor.get("StateName"));
				$('#profileChangePostal').val(currentUserOutdoor.get("PostalCode"));
				$('#profileChangeCountry').val(currentUserOutdoor.get("CountryName"));
				$('#profileChangeLat').val(currentUserOutdoor.get("Latitude"));
				$('#profileChangeLong').val(currentUserOutdoor.get("Longitude"));
			}

			if (data.content.OutdoorLocation.IndoorLocations[0] == null) {
				$('#profileIndoor').html("No Indoor Location");
			}

			else {
				console.log("rooms are available");

				var currentIndoorLocationCollection = new app.IndoorLocations(); 
				var rooms = data.content.OutdoorLocation.IndoorLocations[0].Rooms;
				$.each(rooms, function(i, item) {
					currentIndoorLocation = new app.IndoorLocation ({
						RoomId: item.RoomId,
						RoomName: item.RoomName
					});
					//alert ("roomID " + currentIndoorLocation.get("RoomId") + " roomName " + currentIndoorLocation.get("RoomName"));
					currentIndoorView = new app.IndoorView({model: currentIndoorLocation});

					currentIndoorLocationCollection.push(currentIndoorLocation);
					//$('#profileIndoor').html(currentIndoorView.render().el);
					$('#profileIndoor').append(currentIndoorView.render().el);
					//alert(currentIndoorLocationModel.get("RoomName"));
				 });

				//alert(currentIndoorLocationCollection.models);
				//var currentIndoorCollectionView = new app.IndoorCollectionView ({ collection: currentIndoorLocationCollection}); 
				//$('#profileIndoor').html(currentIndoorCollectionView.render().el);
			}

			
		},

		error: function(){
			var fullUrl = $(location).attr('href');
			fullUrl = fullUrl.split("#");
			url = fullUrl[0];
			$(location).attr('href', url);
		}
	});
	//$('#profileIndoor').html("Living Room, Kitchen, Dining Room, Bedroom");
}

function openProfileForm()
{
	userDialog.dialog("open");

}

function updateProfile()
{
	if($('#profileChangeName').val()!="" && $('#profileChangePassword').val()!="")
	{
		var fullname = JSON.stringify({'userAlias':$('#profileChangeName').val()});
		var pass = JSON.stringify({'password':$('#profileChangePass').val()});
		var username = $.cookie("username");

		$.ajax({
			type: "PUT",
			//url: "http://54.174.179.125/SIOT/rest/users/"+username+"/userAlias",
			url: socialite_server + "users/"+username+"/userAlias",
			data: fullname,
			contentType: "application/json; charset=utf-8",
			datatype: "json",
			Origin: "*",
			success: function(data){displayUserProfile();
			},
			failure: function(errMsg){alert(errMsg);
			}
		});

		$.ajax({
			type: "PUT",
			//url: "http://54.174.179.125/SIOT/rest/users/"+username+"/LoginInfo",
			url: socialite_server + "users/"+username+"/LoginInfo",
			data: pass,
			contentType: "application/json; charset=utf-8",
			datatype: "json",
			Origin: "*",
			success: function(data){displayUserProfile();
				userDialog.dialog( "close" );
			},
			failure: function(errMsg){alert(errMsg);
			}
		});
	}
}

function openLocationForm()
{
	outdoorDialog.dialog("open");
}

function updateLocation()
{
	var username = $.cookie("username");
	var formsValid = true;

	if($('#profileChangeAddress').val()=="")
		formsValid = false;;
	if($('#profileChangeCity').val()=="")
		formsValid = false;
	if($('#profileChangeState').val()=="")
		formsValid = false;
	if($('#profileChangePostal').val()=="")
		formsValid = false;
	if($('#profileChangeCountry').val()=="")
		formsValid = false;
	if($('#profileChangeLat').val()=="")
		formsValid = false;
	if($('#profileChangeLong').val()=="")
		formsValid = false;

	if(!formsValid)
		alert("Must fill out all forms");
	else
	{
		if($('#profileOutdoor').html() == "No Outdoor Location")
		{
			var newLocation = JSON.stringify({
			"OutdoorLocation" :{
			"friendlyLocName": "Home",
			"Address": {
				"countryName": $('#profileChangeCountry').val(),
				"stateName": $('#profileChangeState').val(),
				"postalCode": $('#profileChangePostal').val(),
				"streetAddress": $('#profileChangeAddress').val(),
				"cityName": $('#profileChangeCity').val()
				},
			"GeoLocation": {
				"latitude": $('#profileChangeLat').val(),
				"longitude": $('#profileChangeLong').val()			
							}
			}});

			$.ajax({
				type: "POST",
				//url: "http://54.174.179.125/SIOT/rest/locations/" +username+"/OutdoorLocation",
				url: socialite_server + "locations/" +username+"/OutdoorLocation",
				data: newLocation,
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				Origin: "*",
				success: function(data){outdoorDialog.dialog("close");
				displayUserProfile();
				},
				failure: function(errMsg){alert(errMsg);
				}
			});
		}

		else
		{
			var newAddress = JSON.stringify({"streetAddress":$('#profileChangeAddress').val(),
			"postalCode":$('#profileChangePostal').val(),
			"stateName":$('#profileChangeState').val(),
			"cityName":$('#profileChangeCity').val(),
			"countryName":$('#profileChangeCountry').val(),
			});
			$.ajax({
				type: "PUT",
				//url: "http://54.174.179.125/SIOT/rest/locations/"+username+"/"+currentUserOutdoor.get("LocationId")+"/Address",
				url: socialite_server + "locations/"+username+"/"+currentUserOutdoor.get("LocationId")+"/Address",
				data: newAddress,
				async: true,
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				Origin: "*",
				success: function(data){},
				failure: function(errMsg){alert(errMsg);
				}	
			});
		

			var newGeo = JSON.stringify({"latitude":$('#profileChangeLat').val(),
			"longitude":$('#profileChangeLong').val()});
			$.ajax({
				type: "PUT",
				url: socialite_server + "locations/"+username+"/"+currentUserOutdoor.get("LocationId")+"/GeoLocation",
				data: newGeo,
				async: false,
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				Origin: "*",
				success: function(data){
					outdoorDialog.dialog("close");
					displayUserProfile();
				},
				failure: function(errMsg){alert(errMsg);
				}	
			});

		}
	}
}

function openIndoorLocationForm() {
	indoorDialog.dialog("open"); 
}

function updateIndoorLocation  () {
	var username = $.cookie("username");
	var rooms = JSON.stringify({ "IndoorLocation": 
		{ "friendlyLocName": "1st Floor", "Rooms": 
		[ { "roomName": "livingRoom" }, { "roomName": "kitchen" }, { "roomName": "diningRoom" }, { "roomName": "bedRoom" } ] } });
	$.ajax({
		type: "POST",
		url: socialite_server + "locations/"+username+"/"+currentUserOutdoor.get("LocationId")+"/IndoorLocation",
		data: rooms,
		async: false,
		contentType: "application/json; charset=utf-8",
		datatype: "json",
		Origin: "*",
		success: function(data){
			indoorDialog.dialog("close");
			displayUserProfile();
		},
		failure: function(errMsg){alert(errMsg);
		}	
	});
}

function displayLocation()
{
		var coordinates= new google.maps.LatLng(currentUserOutdoor.get("Latitude"), currentUserOutdoor.get("Longitude"));
		var mapOptions = {
			center: coordinates,
			zoom: 16
		};
		map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
		var marker = new google.maps.Marker({
			position: coordinates,
			map: map,
			title: "Home"
		});
}

function displayDevices()
{
	var username = $.cookie("username");
	$.ajax({
		type: "GET",
		url: socialite_server + "devices/supported",
		contentType: "application/json",
		datatype: "json",
		Origin: "*",
		success: function(data){
			//Need to create a variable that will hold device types
			var deviceTypeGroup = new app.DeviceTypeCollection();
			var catalogCollection;
			var supportedType;
			/*
			* Now we loop through the payload, and instantiate
			* device model types and  push them into the 
			* deviceTypeGroup collection. At the same time
			* we populate each device type's catalog items
			* collection with the names of the devices under
			* each device type.
			*/
			for (var key in data.content) {
				console.log("key is " + key);
				supportedType = new app.DeviceTypeModel();
				supportedType.set("deviceType", key);
				console.log("supportedType.deviceType == " + supportedType.deviceType);
				console.log("Now resetting catalogCollection");
				catalogCollection = new app.CatalogItemCollection();
				for (var i = data.content[key].length - 1; i >= 0; i--) {
					console.log("Adding a catalog item: " + data.content[key][i]);
					//add this item to the catalog collection in supportedType
					catalogCollection.add(
						new app.SingleCatalogItemModel({
							deviceType: key,
							itemName: data.content[key][i].toString(),
							img: "images/" + key + ".png"
						})
					);
				};

				console.log("Pointing supportedType.catalogItems to newly created collection.");
				supportedType.set("catalogItems", catalogCollection);
				console.log("Now printing the collection we just created: " + JSON.stringify(catalogCollection));
				console.log("Now we will test to make sure collection was added.");
				console.log(JSON.stringify(supportedType.catalogItems));
				console.log("Now initializing the view for catalogCollection");
				supportedType.initCatalogItemsView(catalogCollection);
				console.log("Now adding new supported type to deviceTypeGroup");
				deviceTypeGroup.add(supportedType);
			};
			console.log("Now we will print the device types to make sure they are correct.")
			console.log(JSON.stringify(deviceTypeGroup));

			//Now we need to render the views for all the supported 
			//types, but we need views for each of them first.
			console.log("Now adding deviceTypeGroup to deviceTypeGroupView");
			var deviceTypeGroupView = new app.AllDeviceTypesView({
				collection: deviceTypeGroup
			});
			console.log("Now rendering the view of deviceTypeGroupView");
			$("#catalogBody").html(deviceTypeGroupView.render().el);
		},

		error: function(){
			var fullUrl = $(location).attr('href');
			fullUrl = fullUrl.split("#");
			url = fullUrl[0];
			$(location).attr('href', url);
		}
	});
}

function getUserDevices()
{
	var username = $.cookie("username");
	var newItem;
	var catalogCollection;
	var room;
	var roomNumber = 0;
	$.ajax({
		type: "GET",
		url: socialite_server + "devices/" + username,
		contentType: "application/json",
		datatype: "json",
		Origin: "*",
		success: function(data){
			for (var index in data) {
				var deviceType = data[index].DeviceType;
				deviceType = deviceType.split("#");
				deviceType = deviceType[1];
				var deviceId = data[index].DeviceId;
				newItem = new app.SingleCatalogItemModel({
							deviceId: deviceId,
							deviceType: deviceType,
							itemName: data[index].DeviceManufacturer,
							img: "images/" + deviceType + ".png"});

				var catalogItemView = new app.SingleCatalogItemView ({ model: newItem });
				$('#userDevices').html("");
				$('#userDevices').html(catalogItemView.render().el);
				$('li', '#userDevices').draggable({
				cancel: "a.ui-icon", // clicking an icon won't initiate dragging
				revert: "invalid", // when not dropped, the item will revert back to its initial position
				containment: "document",
				helper: "clone",
				cursor: "move"
				});
				room = data[index].Room.RoomName;
				if(room == "livingRoom")
					roomNumber = 0;
				else if(room == "kitchen")
					roomNumber = 1;
				else if(room=="diningRoom")
					roomNumber = 2;
				else if(room =="bedRoom")
					roomNumber = 3;
				deleteImage($('#userDevices li'), roomNumber);
			}
		},
		error: function(){

		}
	});
}

function getUserFriends() {
	
	var username = $.cookie("username"); 
	var friends = new app.AllFriendshipCollection(); 
	
	$.ajax({
		type: "GET",
		url: socialite_server + "relationships/" + username + "/friendship",
		contentType: "application/json",
		datatype: "json",
		Origin: "*", 
		success: function(data) {
			//console.log(username);
			//console.log(data.content);
			//create a collection 
			//console.log('this is is is is   getUserFriends');
			//var friends = new app.AllFriendShipCollection(); 
			for (var index in data.content) {
				//console.log(data.content[index].RelationshipId);
				var friend = new app.SingleRelationshipModel({
					relationshipId: data.content[index].RelationshipId, 
					relationshipType: data.content[index].RelationshipType,
					subjectId: data.content[index].SubjectId,
					subjectType: data.content[index].SubjectType, 
					objectId: data.content[index].ObjectId,
					objectType: data.content[index].ObjectType
				});
				console.log(friend.get("relationshipId"));
				friends.add(friend);
				//console.log(friend.objectID);

			}
			//console.log("Friend ObjectID here here here");
			var friendsView = new app.AllFriendshipsView({collection: friends});
			$("#myCurrentFriends").html(friendsView.render().el);
			
		}
	});
}

function getAllUsersShort() {

	$.ajax({
		type: "GET",
		url: socialite_server + "users",
		contentType: "application/json",
		datatype: "json",
		Origin: "*",
		success: function(data) {
			console.log(data.content); 
			//var users = new app.AllUserCollection(); 
			var users = new Array; 
			for (var index in data.content) {
				console.log (data.content[index].UserAlias);
				var user = new app.User({
					userAlias: data.content[index].UserAlias,
					username: data.content[index].LoginInfo.UserName
				}); 
				console.log("user name : " + user.get("userAlias"));
				//users.add(user); 	
				users.push(user.get("userAlias")); 	
				console.log(users);
			} 
			$("#search-users").autocomplete({
     			source: users,
    		});
		} //success
	}); //ajax
}

function displayUsers() {

	var selectedUserName = $("#search-users").val();
	console.log(selectedUserName);
	$.ajax({
		type: "GET",
		//url: socialite_server + "users/username=?" + selectedUserName,
		url: socialite_server + 'users/query?fullname='+ selectedUserName,
		//url: socialite_server + 'users/'+ selectedUserName,
		contentType: "application/json",
		datatype:"json",
		Origin: "*",
		success: function (data) {
			console.log(data.content);
			var candidates = new app.AllFriendCandidateCollection(); 
			for (var index in data.content) {
				var candidate = new app.SingleFriendCandidate ({
					fullName: data.content[index].UserAlias,
					//change API
					
					username: data.content[index].LoginInfo.Username, 
					//address: data.content[index].locationType,
					address: data.content[index].OutdoorLocation.Address.StreetAddress + " " 
						+ data.content[index].OutdoorLocation.Address.CityName + " " 
						+ data.content[index].OutdoorLocation.Address.StateName + " "
						+ data.content[index].OutdoorLocation.Address.CountryName + " " 
				});
				//console.log(candidate);
				candidates.add(candidate);
			}
			//console.log(candidates);
			console.log(url);
			var allFriendCandidatesView = new app.AllFriendCandidatesView({collection: candidates});
			$("#friendshipCandidates").html(allFriendCandidatesView.render().el);
			
			//console.log($(this));
		}

	});


}

function addFriend(objectUserName){
	//response.addHeader("Access-Control-Allow-Origin", "*");
	//var selectedUserName = document.getElementById("userSearchName").value;
	//var selectedUserName = $("#search-users").val();
	//console.log(clicked_id);
	var userName = $.cookie('username');
	//var objectUserName = document.getElementById("serSearchName").innerHTML;
	console.log(userName);
	console.log(objectUserName);

	/*
	var newFriendship = new app.SingleRelationshipModel({
		subjectId: username,
		objectId: objectUserName,
		relationshipType: "friendship"
	}	);
	*/
	var  payload = JSON.stringify({
		"relationshipType": 'friendship',
        "subjectId": userName,
      	"objectId": objectUserName
	});

	$.ajax({
		type: "POST",
		url: socialite_server + 'relationships/',
		data: payload,
	  	contentType: "application/json; charset=utf-8",
		Origin: "*",
		success: function (data) {
			//console.log(data.content);
			console.log('successs');
			alert("You have added "+ objectUserName + " as a friend"); 
		},
		 failure: function(errMsg){alert(errMsg); }
	});
	
}
