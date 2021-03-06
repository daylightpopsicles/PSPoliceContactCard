# PSPoliceContactCard

This repo contains the source code for a Lightning component used for the Denver PD Contact Card demo. This source code is for demo purposes only and is covered by the following copyright disclaimer.

<i><b>Copyright 2016, Sales Engineering, Salesforce.com Inc.
<br/>All rights reserved.
<br/>
<br/>Redistribution and use in source and binary forms, with or without modification, 
<br/>are permitted provided that the following conditions are met:
<br/>
<br/>- Recipient acknowledges this source code is for sample purposes only and my not 
<br/>  be developed according to general coding best practices. 
<br/>- Neither the name of the salesforce.com nor the names of its contributors may be
<br/>  used to endorse or promote products derived from this software without specific prior 
<br/>  written permission.
<br/>
<br/>THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
<br/>AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
<br/>IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
<br/>DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
<br/>FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
<br/>DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
<br/>SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
<br/>CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
<br/>OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
<br/>OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</b></i>

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
