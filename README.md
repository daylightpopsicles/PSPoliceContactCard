# PSPoliceContactCard

THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

This repo contains the source code for a Lightning component used for the Denver PD Contact Card demo. This source code is for demo purposes only and is covered by the following copyright disclaimer.

#### This component shows the ability to:
* Provide simple tab-based form that can be used from mobile devices to collect contact details (i.e. reason for contact, date/time, location, person details, actions taken, notes, etc...). See example screenshots below.
* Provides example of ESRI address lookup to determine police distrct/precinct.
* Utilizes the CarQuery API service to lookup vehicle makes and models based on year. Details of this service can be found [here](http://www.carqueryapi.com/).

![alt text](https://github.com/thedges/PSPoliceContactCard/blob/master/PSPoliceContactCard.png "Sample Image")

#### The primary source code files to review are:
* <b>PSPoliceContactCard Lightning Component</b> - source code of the main component used in the demo. Contains the main markup and logic for creating the tabs, field inputs, persion add/subtract control logic, etc...
* <b>PSCarQueryUtils Apex Class</b> - source code for querying the CarQuery API service to get vehicle models and makes for a selected year
* <b>PSDenverDistrictUtils Apex Class</b> - source code for querying ESRI by providing latitude/longitude and retrieving a district number based on ESRI layer definition

#### It is recommended that anyone utilizing this sample code to be knowledgeable of Salesforce Lightning Component development. Some good resources are the following:
* [Salesforce Lightning Component Developer Guide](https://resources.docs.salesforce.com/210/latest/en-us/sfdc/pdf/lightning.pdf)
* [Salesforce Lightning Component Reference](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/aura_compref.htm)
* [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/)
* [Trailhead: Create a HelloWorldLightning Component](https://trailhead.salesforce.com/projects/workshop-lightning-programmatic/steps/programmatic-step-4)
* [Trailhead: Build Reusable Lightning Components](https://trailhead.salesforce.com/projects/build-reusable-lightning-components)
* [Trailhead: Create a Lightning Component to Display the Weather](https://trailhead.salesforce.com/en/projects/incorporate-ibm-weather-company-data/steps/lightning-component-display-weather)
* [Trailhead: Build an Account Geolocation App](https://trailhead.salesforce.com/projects/account-geolocation-app)

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
