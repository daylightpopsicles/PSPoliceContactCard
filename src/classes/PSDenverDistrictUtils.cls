public class PSDenverDistrictUtils
{
  public PSDenverDistrictUtils()
  {

  }

  public static String retrieveDistrict(Decimal lat, Decimal lng)
  {
    Http h = new Http();
    String district = '';

    // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
    HttpRequest req = new HttpRequest();
    req.setEndpoint('https://services8.arcgis.com/qHBXBg0jmUrxEOto/ArcGIS/rest/services/police_districts/FeatureServer/0/query?where=&objectIds=&time=&geometry=+' + lng + '%2C+' + lat + '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=DIST_NUM&returnGeometry=false&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=');
    req.setMethod('GET');

    // Send the request, and return a response
    HttpResponse resp = h.send(req);
    System.debug(resp.getBody());
    EsriFeatureResponse esriResp = (EsriFeatureResponse)JSON.deserialize(resp.getBody(), EsriFeatureResponse.class);

    if (esriResp.features != null && esriResp.features.size() > 0)
    {
      for (EsriFeatureResponse.Features f : esriResp.features)
      {
        if (f.attributes != null && f.attributes.DIST_NUM != null)
        {
          district = f.attributes.DIST_NUM;
        }
      }
    }

    return district;
  }

  public static void test()
  {
    String district = PSDenverDistrictUtils.retrieveDistrict(39.757921, -104.966551);
    System.debug('district=' + district);
  }

}