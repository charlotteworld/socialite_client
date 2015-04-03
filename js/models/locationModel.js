var app = app || {};

app.OutdoorLocation = Backbone.Model.extend({
	
	friendlyLocName: null,
	
	CountryName: null,
	StateName: null,
	PostalCode: null,
	StreetAddress: null,
	CityName: null,
	LocationId: null,

	Latitude: 0,
	Longitude: 0
});

