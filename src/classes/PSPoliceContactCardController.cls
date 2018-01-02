public class PSPoliceContactCardController
{
  @AuraEnabled
  public static String dummy()
  {
    System.debug('dummy invoked...');

    return '';
  }

  @AuraEnabled
  public static String reverseGeocodeEsri(Decimal lat, Decimal lng)
  {
    System.debug('reverseGeocodeEsri invoked...');

    return PSGeoUtils.reverseGeocodeEsri(lat, lng);
  }

  @AuraEnabled
  public static String getUserBadgeNumber()
  {
    System.debug('getUserBadgeNumber invoked...');

    Id userId = UserInfo.getUserId();

    if (userId != null)
    {
      User u = [SELECT Badge_Number__c FROM User WHERE Id = :userId];
      return u.Badge_Number__c;
    }
    else
    {
      return '';
    }

  }


  @AuraEnabled
  public static String geocodeEsri(String addr)
  {
    System.debug('geocodeEsri invoked...');

    return PSGeoUtils.geocodeEsri(addr);
  }

  @AuraEnabled
  public static List<String> getCarYears()
  {
    System.debug('getCarYears invoked...');

    return PSCarQueryUtils.getYears();
  }

  @AuraEnabled
  public static List<String> getCarMakes(Integer year)
  {
    System.debug('getCarMakes invoked...');

    return PSCarQueryUtils.getMakes(year);
  }

  @AuraEnabled
  public static List<String>  getCarModels(Integer year, String make)
  {
    System.debug('getCarModels invoked...');

    return PSCarQueryUtils.getModels(year, make);
  }

  @AuraEnabled
  public static String getDistrict(Decimal lat, Decimal lng)
  {
    System.debug('getDistrict invoked...');

    return PSDenverDistrictUtils.retrieveDistrict(lat, lng);
  }

  @AuraEnabled
  public static String getPicklistValues(String objType)
  {
    System.debug('getPicklistValues invoked...');

    return PSMetaUtils.getObjectPicklists(objType);
  }

  @AuraEnabled
  public static String loadIncidentRecord(String recordId)
  {
    System.debug('loadIncidentRecord invoked...');
    PSResponse resp = new PSResponse();

    try
    {
      /////////////////////////////
      // get the Incident record //
      /////////////////////////////
      Incident__c inc = [SELECT Id, Num_of_Subjects__c, Num_Officers_Involved__c, Address__c,
                         Arrested_suspect_s__c, Basis_for_Full_Search__c, Basis_for_Full_Search_Narrative__c,
                         Basis_for_Pat_Down__c, Basis_for_Pat_Down_Narrative__c, Contact_Type__c, District__c,
                         Duration_of_Contact__c, Foot_Pursuit__c, Full_Search__c, Incident_Date_Time__c, Name,
                         Issued_Summons__c, Location__Latitude__s, Location__Longitude__s, Officer_Badge_Number__c,
                         Officer_in_Uniform__c, Pat_Down__c, Reason__c, Reason_Narrative__c, Siezed_Contraband__c,
                         Type_of_Contraband__c, Vehicle_Pursuit__c, Observation_Notes__c
                         FROM Incident__c
                         WHERE Id = :recordId];

      Map<String, Object>respMap = new Map<String, Object>();
      respMap.put('incident', inc);

      //////////////////////////////////////////////
      // load associated Incident Contact records //
      //////////////////////////////////////////////
      List<Incident_Contact__c> incContacts = [SELECT Id, Name, Age_Group__c, Gang_Affiliation__c, Gender__c,
                                Person_Num__c, Race_Ethnicity__c, Vehicle_Year__c,
                                Vehicle_Make__c, Vehicle_Model__c
                                FROM Incident_Contact__c
                                WHERE Incident__c = :recordId
                                    ORDER BY Name ASC];

      respMap.put('incidentContacts', incContacts);

      ///////////////////////////////
      // load and file attachments //
      ///////////////////////////////
      List<String> fileList = new List<String>();
      List<ContentDocumentLink> cdList = [SELECT ContentDocumentId, Id, IsDeleted, LinkedEntityId, ShareType, SystemModstamp, Visibility
                                          FROM ContentDocumentLink
                                          WHERE linkedentityid = :recordId];
      if (cdList != null)
      {
        for (ContentDocumentLink cdl : cdList)
        {
          fileList.add(cdl.ContentDocumentId);
        }
      }

      respMap.put('incidentFiles', fileList);

      resp.data = respMap;

    }
    catch (exception e)
    {
      resp.status = PSResponse.ERROR;
      resp.msg = e.getMessage();
    }

    return  JSON.serialize(resp);
  }

  @AuraEnabled
  public static String upsertIncidentAndContacts(String params)
  {
    System.debug('upsertIncidentAndContacts invoked...');
    Map<String, String> paramMap = (Map<String, String>)JSON.deserialize(params,   Map<String, String>.class);

    PSResponse resp = new PSResponse();

    try
    {
      //System.debug('incident=' + paramMap.get('incident'));
      //System.debug('incidentContacts=' + paramMap.get('incidentContacts'));
      Incident__c incident = (Incident__c)JSON.deserialize(paramMap.get('incident'), Incident__c.class);
      List<Incident_Contact__c> incidentContacts = (List<Incident_Contact__c>)JSON.deserialize(paramMap.get('incidentContacts'), List<Incident_Contact__c>.class);

      ////////////////////////
      // store the incident //
      ////////////////////////
      if (incident.id == null)
      {
        insert incident;
      }
      else
      {
        update incident;
      }

      /////////////////////////////////
      // store the incident contacts //
      /////////////////////////////////
      if (incidentContacts != null && incidentContacts.size() > 0)
      {
        for (Incident_Contact__c ic : incidentContacts)
        {
          if (ic.Id == null)
          {
            ic.Incident__c = incident.Id;
            insert ic;
          }
          else
          {
            update ic;
          }
        }
      }

      Map<String, Object>respMap = new Map<String, Object>();
      respMap.put('incident', incident);
      respMap.put('incidentContacts', incidentContacts);
      //respMap.put('transactionMsg', payResp.getMessage());

      resp.data = respMap;

    }
    catch (exception e)
    {
      resp.status = PSResponse.ERROR;
      resp.msg = e.getMessage();
    }

    return  JSON.serialize(resp);

  }


}