public class PSCarQueryUtils
{
  public PSCarQueryUtils()
  {

  }

  public static List<String> getYears()
  {
    Http h = new Http();

    // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
    HttpRequest req = new HttpRequest();
    req.setEndpoint('https://www.carqueryapi.com/api/0.3/?cmd=getYears');
    req.setMethod('GET');

    // Send the request, and return a response
    HttpResponse res = h.send(req);
    System.debug('response=' + res.getBody());
    GetYearsResponse resp = (GetYearsResponse)JSON.deserialize(res.getBody(), GetYearsResponse.class);

    List<String> carYears = new List<String>();
    carYears.add('-- SELECT --');
    for (Integer i = resp.Years.max_year; i >= resp.Years.min_year; i--)
    {
      carYears.add('' + i);
    }

    return carYears;
  }

  public static List<String> getMakes(Integer year)
  {
    Http h = new Http();

    // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
    HttpRequest req = new HttpRequest();
    req.setEndpoint('https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=' + year + '&sold_in_us=1');
    req.setMethod('GET');

    // Send the request, and return a response
    HttpResponse res = h.send(req);
    System.debug('response=' + res.getBody());
    GetMakesResponse resp = (GetMakesResponse)JSON.deserialize(res.getBody(), GetMakesResponse.class);

    List<String> carMakes = new List<String>();
    carMakes.add('-- SELECT --');
    for (Integer i = 0; i < resp.Makes.size(); i++)
    {
      carMakes.add(resp.Makes[i].make_display);
    }

    return carMakes;
  }

  public static List<String> getModels(Integer year, String make)
  {
    Http h = new Http();

    // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
    HttpRequest req = new HttpRequest();
    req.setEndpoint('https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=' + make + '&year=' + year + '&sold_in_us=1');
    req.setMethod('GET');

    // Send the request, and return a response
    HttpResponse res = h.send(req);
    System.debug('response=' + res.getBody());
    GetModelsResponse resp = (GetModelsResponse)JSON.deserialize(res.getBody(), GetModelsResponse.class);

    List<String> carModels = new List<String>();
    carModels.add('-- SELECT --');
    for (Integer i = 0; i < resp.Models.size(); i++)
    {
      carModels.add(resp.Models[i].model_name);
    }

    return carModels;
  }

  public class GetYearsResponse
  {
    public AutoYears Years;
  }

  public class AutoYears
  {
    public Integer min_year;
    public Integer max_year;
  }


  public class GetMakesResponse
  {
    public  List<AutoMake> Makes;
  }

  public class AutoMake
  {
    public String make_id;
    public String make_display;
    public String make_is_common;
    public String make_country;
  }

  public class GetModelsResponse
  {
    public  List<AutoModel> Models;
  }

  public class AutoModel
  {
    public String model_name;
    public String model_Make_id;
  }

  public static void test()
  {
    List<String> years = getYears();
    System.debug('years=' + JSON.serialize(years));

    List<String> makes = getMakes(2014);
    System.debug('makes=' + JSON.serialize(makes));

    List<String> models = getModels(2014, 'Ford');
    System.debug('models=' + JSON.serialize(models));
  }
}