({
    dummy: function(component) {
        console.log('dummy invoked...');
        var action = component.get("c.dummy");
        action.setCallback(this, function(a) {
            console.log('dummy resp=' + a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    createIncident: function(component, lat, lng) {
    	var self = this;
    	
        var incident = {
            'sobjectType': 'Incident__c',
            'Reason__c': '',
            'Reason_Narrative__c': '',
            'Num_of_Subjects__c': '',
            'Num_Officers_Involved__c': '',
            'Address__c': '',
            'Arrested_suspect_s__c': '--None--',
            'Basis_for_Full_Search__c': '',
            'Basis_for_Full_Search_Narrative__c': '',
            'Basis_for_Pat_Down__c': '',
            'Basis_for_Pat_Down_Narrative__c': '',
            'Contact_Type__c': '',
            'District__c': '',
            'Location__Latitude__s': '',
            'Location__Longitude__s': '',
            'Duration_of_Contact__c': '',
            'Foot_Pursuit__c': '--None--',
            'Full_Search__c': '--None--',
            'Incident_Date_Time__c': '',
            'Issued_Summons__c': '--None--',
            'Officer_Badge_Number__c': '',
            'Officer_in_Uniform__c': '',
            'Pat_Down__c': '--None--',
            'Siezed_Contraband__c': '--None--',
            'Type_of_Contraband__c': '',
            'Vehicle_Pursuit__c': '--None--',
            'Observation_Notes__c': ''
        };
        //'Location__c': 'API location: [30.346583657407518 -97.91127204895021]',
        var dttm = new Date();
        dttm = new Date(dttm.getTime() - dttm.getTimezoneOffset() * 60000);
        incident.Incident_Date_Time__c = dttm.toISOString().substring(0, 16);
        component.set("v.incident", incident);

        self.getUserBadgeNumber(component);
    },
    addIncidentContact: function(component) {
        var incidentContact = {
            'sobjectType': 'Incident_Contact__c',
            'Person_Num__c': '',
            'Age_Group__c': '',
            'Gang_Affiliation__c': '',
            'Gender__c': '',
            'Race_Ethnicity__c': '',
            'Vehicle_Year__c': '',
            'Vehicle_Make__c': '',
            'Vechile_Model__c': ''
        };
        var incidentContacts = component.get("v.incidentContacts");
        var perNum = 0;
        console.log('start loop');
        for (var i = 0; i < incidentContacts.length; i++) {
            var ic = incidentContacts[i];
            console.log('person_num=' + ic.Person_Num__c);
            if (ic.Person_Num__c > perNum) {
                perNum = ic.Person_Num__c;
            }
        }
        console.log('perNum=' + perNum);
        incidentContact.Person_Num__c = perNum + 1;
        incidentContacts.push(incidentContact);
        component.set("v.incidentContacts", incidentContacts);
    },
    deleteIncidentContact: function(component, indx) {
        console.log('deleteIncidentContact...');
        console.log('indx=' + indx);
        var incidentContacts = component.get("v.incidentContacts");
        console.log('before=' + JSON.stringify(incidentContacts));
        incidentContacts.splice(indx, 1);
        console.log('after=' + JSON.stringify(incidentContacts));
        component.set("v.incidentContacts", incidentContacts);
        component.set("v.incidentContactSelection", 0);
    },
    reverseGeocodeEsri: function(component, lat, lng) {
        console.log('execReverseGeocodeEsri invoked...');
        var self = this;
        var action = component.get("c.reverseGeocodeEsri");
        action.setParams({
            "lat": lat,
            "lng": lng
        });
        action.setCallback(this, function(a) {
            console.log('resp=' + a.getReturnValue());
            var resp = JSON.parse(a.getReturnValue());
            if (resp.hasOwnProperty('error')) {
                //component.set('v.fullAddress', resp.error.details[0]);
            } else {
                var incident = component.get('v.incident');
                incident.Address__c = resp.address.Match_addr;
                component.set('v.incident', incident);
            }
            self.getDistrict(component, lat, lng);
        });
        $A.enqueueAction(action);
        //$A.clientService.runActions([action], this, function() {});
        //$A.clientService.runActions([action]);
    },
    geocodeEsri: function(component, addr) {
        console.log('geocodeEsri invoked...');
        var self = this;
        var action = component.get("c.geocodeEsri");
        action.setParams({
            "addr": addr
        });
        action.setCallback(this, function(a) {
            console.log('resp=' + a.getReturnValue());
            var resp = JSON.parse(a.getReturnValue());
            if (resp.hasOwnProperty('error')) {
                // do nothing
            } else {
                console.log('lat=', resp.candidates[0].location.y);
                console.log('lng=', resp.candidates[0].location.x);
                var incident = component.get("v.incident");
                incident.Location__Latitude__s = resp.candidates[0].location.y;
                incident.Location__Longitude__s = resp.candidates[0].location.x;
                component.set("v.incident", incident);
                self.getDistrict(component, resp.candidates[0].location.y, resp.candidates[0].location.x);
            }
        });
        $A.enqueueAction(action);
    },
    getDistrict: function(component, lat, lng) {
        console.log('getDistrict invoked...');
        var action = component.get("c.getDistrict");
        action.setParams({
            "lat": lat,
            "lng": lng
        });
        action.setCallback(this, function(a) {
            console.log('resp=' + a.getReturnValue());
            if (a.getReturnValue() != '') {
                var incident = component.get('v.incident');
                incident.District__c = 'District ' + a.getReturnValue();
                component.set('v.incident', incident);
            }
        });
        $A.enqueueAction(action);
    },
    getIncidentPicklists: function(component) {
        console.log('getIncidentPicklists invoked...');
        var self = this;
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "objType": "Incident__c"
        });
        action.setCallback(this, function(a) {
            console.log('resp=' + a.getReturnValue());
            component.set('v.incidentPicklists', JSON.parse(a.getReturnValue()));
        });
        $A.enqueueAction(action);
    },
    getIncidentContactPicklists: function(component) {
        console.log('getIncidentContactPicklists invoked...');
        var self = this;
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "objType": "Incident_Contact__c"
        });
        action.setCallback(this, function(a) {
            console.log('resp=' + a.getReturnValue());
            component.set('v.incidentContactPicklists', JSON.parse(a.getReturnValue()));
        });
        $A.enqueueAction(action);
    },
    saveIncidentAndContacts: function(component) {
        console.log('saveIncident invoked...');
        var self = this;
        var action = component.get("c.upsertIncidentAndContacts");
        var incident = component.get("v.incident");
        var errMsg = [];
        for (var property in incident) {
            if (incident.hasOwnProperty(property)) {
                console.log(property + '=' + incident[property]);
                if (incident[property] == '--None--' || incident[property] == '-- SELECT --') {
                    if (errMsg.length == 0) {
                        errMsg.push('The following properties have not been set!');
                        errMsg.push(property);
                    } else {
                        errMsg.push(property);
                    }
                }
            }
        }
        if (errMsg.length > 0) {
            component.set("v.errMsg", errMsg);
            return;
        }
        /////////////////////////////////////////////////////////////
        // build list of parameters //
        /////////////////////////////////////////////////////////////
        var paramMap = {};
        console.log('before=' + JSON.stringify(incident));
        incident.Incident_Date_Time__c = incident.Incident_Date_Time__c + ':00.000Z';

        for (var property in incident) {
            if (incident.hasOwnProperty(property)) {
                if (typeof incident[property] === 'object') {
                    incident[property] = incident[property][0];
                }
            }
        }
/*
        if (typeof incident.Arrested_suspect_s__c === 'object') incident.Arrested_suspect_s__c = incident.Arrested_suspect_s__c[0];
        if (typeof incident.Foot_Pursuit__c === 'object') incident.Foot_Pursuit__c = incident.Foot_Pursuit__c[0];
        if (typeof incident.Full_Search__c === 'object') incident.Full_Search__c = incident.Full_Search__c[0];
        if (typeof incident.Issued_Summons__c === 'object') incident.Issued_Summons__c = incident.Issued_Summons__c[0];
        if (typeof incident.Siezed_Contraband__c === 'object') incident.Siezed_Contraband__c = incident.Siezed_Contraband__c[0];
        if (typeof incident.Vehicle_Pursuit__c === 'object') incident.Vehicle_Pursuit__c = incident.Vehicle_Pursuit__c[0];
        if (typeof incident.Pat_Down__c === 'object') incident.Pat_Down__c = incident.Pat_Down__c[0];
        */

        console.log('after=' + JSON.stringify(incident));
        paramMap['incident'] = JSON.stringify(incident);
        var incidentContacts = component.get("v.incidentContacts");
        paramMap['incidentContacts'] = JSON.stringify(incidentContacts);
        action.setParams({
            "params": JSON.stringify(paramMap)
        });
        action.setCallback(this, function(actionResult) {
            console.log("received result...");
            var resp = JSON.parse(actionResult.getReturnValue());
            if (resp.status === 'ERROR') {
            	console.log("error...");
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": resp.msg,
                    "mode": "sticky",
                    "type": "error"
                });
                toastEvent.fire();
            } else {
            	console.log("success...");
            	if (resp.data.incident.Incident_Date_Time__c != null) {
                    resp.data.incident.Incident_Date_Time__c = resp.data.incident.Incident_Date_Time__c.substring(0, 16);
                }
                component.set("v.incident", resp.data.incident);
                console.log("incidentContacts", JSON.stringify(resp.data.incidentContacts));
                component.set("v.incidentContacts", resp.data.incidentContacts);

                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Your incident has been saved: " + resp.data.incident.Name,
                    "duration": 2000,
                    "type": "success"
                });
                toastEvent.fire();
                console.log("success end");
                // resp.data.transactionId
            }
        });
        $A.enqueueAction(action);
    },
    loadIncidentRecord: function(component) {
        console.log('loadIncidentRecord...');
        var recordId = component.get("v.recordId");
        var action = component.get("c.loadIncidentRecord");
        /////////////////////////////////////////////////////////////
        // build list of parameters //
        /////////////////////////////////////////////////////////////
        action.setParams({
            "recordId": recordId
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            console.log("received result...");
            var resp = JSON.parse(actionResult.getReturnValue());
            console.log('resp=' + JSON.stringify(resp.data));
            if (resp.status === 'ERROR') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": resp.msg,
                    "mode": "sticky",
                    "type": "error"
                });
                toastEvent.fire();
            } else {
                console.log("incident", JSON.stringify(resp.data.incident));
                if (resp.data.incident.Incident_Date_Time__c != null) {
                    resp.data.incident.Incident_Date_Time__c = resp.data.incident.Incident_Date_Time__c.substring(0, 16);
                }
                component.set("v.incident", resp.data.incident);
                console.log("incidentContacts", JSON.stringify(resp.data.incidentContacts));
                component.set("v.incidentContacts", resp.data.incidentContacts);
                component.set("v.incidentFiles", resp.data.incidentFiles);

                if (resp.data.incidentContacts.length > 0)
                {
                  component.set("v.carMakes", [resp.data.incidentContacts[0].Vehicle_Make__c]);
                  component.set("v.carModels", [resp.data.incidentContacts[0].Vehicle_Model__c]);
                }

                self.getUserBadgeNumber(component);
            }
        });
        $A.enqueueAction(action);
    },
    loadCurrentLocation: function(component) {
        navigator.geolocation.getCurrentPosition(function(location) {
            component.set("v.currLat", location.coords.latitude);
            component.set("v.currLng", location.coords.longitude);
            component.set("v.currPos", true);
        });
    },
    getCarYears: function(component) {
        console.log('getCarYears...');
        var action = component.get("c.getCarYears");
        var self = this;
        action.setCallback(this, function(actionResult) {
            console.log("getCarYears result...");
            console.log("resp=" + actionResult.getReturnValue());
            var resp = actionResult.getReturnValue();
            component.set("v.carYears", resp);

            
            var indx = component.get("v.incidentContactSelection");
            var incidentContacts = component.get("v.incidentContacts");
            if (incidentContacts.length > 0)
            {
              var year = incidentContacts[indx].Vehicle_Year__c;
              self.getCarMakes(component, year);
            }
        });
        $A.enqueueAction(action);
    },
    getCarMakes: function(component, year) {
        console.log('getCarYears...');
        var action = component.get("c.getCarMakes");
        action.setParams({
            "year": year
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            console.log("received result...");
            var resp = actionResult.getReturnValue();
            component.set("v.carMakes", resp);

            var indx = component.get("v.incidentContactSelection");
            var incidentContacts = component.get("v.incidentContacts");
            if (incidentContacts.length > 0)
            {
              var year = incidentContacts[indx].Vehicle_Year__c;
              var make = incidentContacts[indx].Vehicle_Make__c;
              self.getCarModels(component, year, make);
            }
        });
        $A.enqueueAction(action);
    },
    getCarModels: function(component, year, make) {
        console.log('getCarModels...');
        var action = component.get("c.getCarModels");
        action.setParams({
            "year": year,
            "make": make
        });
        var self = this;
        action.setCallback(this, function(actionResult) {
            console.log("received result...");
            var resp = actionResult.getReturnValue();
            component.set("v.carModels", resp);
        });
        $A.enqueueAction(action);
    },
    getUserBadgeNumber: function(component) {
        console.log('getUserBadgeNumber...');
        var action = component.get("c.getUserBadgeNumber");
        var self = this;
        action.setCallback(this, function(actionResult) {
            console.log("getUserBadgeNumber result...");
            console.log("badge_number=" + actionResult.getReturnValue());
            var resp = actionResult.getReturnValue();

            var incident = component.get("v.incident");
            incident.Officer_Badge_Number__c = resp;
            component.set("v.incident", incident);
        });
        $A.enqueueAction(action);
    }
})