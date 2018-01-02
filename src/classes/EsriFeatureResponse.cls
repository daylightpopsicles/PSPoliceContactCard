public class EsriFeatureResponse
{
  public EsriFeatureResponse()
  {

  }

  public String objectIdFieldName;
  public String globalIdFieldName;
  public String geometryType;
  public SpatialReference spatialReference;
  public List<Fields> fields;
  public List<Features> features;

  public class SpatialReference
  {
    public Integer wkid;
    public Integer latestWkid;
  }

  public class Fields
  {
    public String name;
    public String alias;
    public String sqlType;
    public Integer length;
    public String domain;
    public String defaultValue;
  }

  public class Features
  {
    public Attributes attributes;
  }

  public class Attributes
  {
    public String DIST_NUM;
  }

}