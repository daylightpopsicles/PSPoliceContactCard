({
    doInit: function(component, event, helper) {
        console.log('doInit...');

        var sPageURL = decodeURIComponent(window.location.search.substring(1)); //You get the whole decoded URL of the page.
        var sURLVariables = sPageURL.split('&'); //Split by & so that you get the key value pairs separately in a list
        var sParameterName;
        var i;

        helper.getIncidentPicklists(component);
        helper.getIncidentContactPicklists(component);

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('='); //to split the key from the value.

            if (sParameterName[0] === 'id') { //lets say you are looking for param name - firstName
                component.set("v.recordId", sParameterName[1]);
            }
        }

        var recordId = component.get("v.recordId");

        if (recordId == null || recordId == '') {
            console.log('empty record id');
            helper.createIncident(component);
        } 
        else 
        {
        	helper.loadIncidentRecord(component);
        	//component.set("v.recordId", "");
        	//window.history.pushState({}, document.title, "/");
        }


        helper.getCarYears(component);

        if (recordId == null || recordId == '') {
          helper.loadCurrentLocation(component);
        }

    },
    onVehPursuitChange: function(component, event, helper) {
        console.log('onVehPursuitChange...');
        console.log(JSON.stringify(event));
        console.log('vehPursuit=' + event.getParam("value"));
        var incident = component.get('v.incident');
        incident.Vehicle_Pursuit__c = event.getParam("value");
        component.set('v.incident', incident);
    },
    onVehicleYear: function(component, event, helper) {
    	var year = event.getSource().get("v.value");
    	console.log('year='+ year);
    	component.set("v.vehYearSel", year);
    	helper.getCarMakes(component, year);
    },
    onVehicleMake: function(component, event, helper) {
    	var make = event.getSource().get("v.value");
    	var year = component.get("v.vehYearSel");
    	console.log('make='+ year);
        helper.getCarModels(component, year, make);
    },
    onNumSubjects: function(component, event, helper) {
    	console.log('onNumSubjects...');
    	var num = event.getSource().get("v.value");
    	console.log('num=' + num);
        
        var incidentContacts = component.get("v.incidentContacts");
        console.log('incidentContacts.length=' + incidentContacts.length);
        if (incidentContacts.length == 0)
        {
        	for (var i=0; i<num; i++)
        	{
        		console.log('i=' + i);
        		helper.addIncidentContact(component);
        	}
        }
    },
    onAddressChange: function(component, event, helper) {
        console.log('onAddressChange...');
        var incident = component.get('v.incident');
        console.log('addressValue=' + incident.Address__c);
        helper.geocodeEsri(component, incident.Address__c);
    },
    geoChange: function(component, event, helper) {
        console.log('geoChange...');
        var incident = component.get("v.incident");
        incident.Location__Latitude__s = component.get("v.currLat");
        incident.Location__Longitude__s = component.get("v.currLng");
        component.set("v.incident", incident);
        helper.reverseGeocodeEsri(component, component.get("v.currLat"), component.get("v.currLng"));
    },
    incidentChange: function(component, event, helper) {
        console.log('incidentChange...');
        console.log(JSON.stringify(component.get("v.incident")));
    },
    addPerson: function(component, event, helper) {
        console.log('addPerson...');
        helper.addIncidentContact(component);
    },
    deletePerson: function(component, event, helper) {
        console.log('deletePerson...');
        helper.deleteIncidentContact(component, parseInt(component.get("v.incidentContactSelection")));
    },
    changePerson: function(component, event, helper) {
        console.log('changePerson...');
        console.log('event=' + event.getSource().get("v.value"));
        component.set("v.incidentContactSelection", event.getSource().get("v.value"));
        helper.getCarYears(component);
    },
    saveIncident: function(component, event, helper) {
        console.log('saveIncident...');
        helper.saveIncidentAndContacts(component);
    },
    clearError: function(component, event, helper) {
    	console.log('clearError...');
    	component.set("v.errMsg", undefined);
    },
    handleUploadFinished: function (component, event) {
        // Get the list of uploaded files
        var uploadedFiles = event.getParam("files");
        var incidentFiles = component.get("v.incidentFiles");
        for (var i=0; i<uploadedFiles.length; i++)
        {
           incidentFiles.push(uploadedFiles[i].documentId);
        }
        component.set("v.incidentFiles", incidentFiles);
    }

})