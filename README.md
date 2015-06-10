### DMP Automatic Integrated Javascript Tests

v1.0.0 - Brian McQueen - MediaMath Cambridge

* ###### Dev Notes
* ###### Installation
  *  via Yeoman (Recommended)
  *  via git clone
* ###### BrowserBuddy
* ###### LoginBuddy
* ###### BehaviorBuddy
* ###### SegmentBuddy

#### Dev Notes:
##### Syntax for Buddy Methods:

Due to the nature of promises, the following syntax of buddy methods must be
observed:

```javascript
firstAction().then(function() {
    return secondAction();
  }).
  then(function() {
    return thirdAction();
  }).
  then(function() {
    return lastAction();
  }).
  then(function() {
    //final cleanup - all success
  }, function(err) {
    //error logging; something went wrong
  });
  ```

To pass in a return value from one function to the next:
```javascript
firstAction().then(function() {
  return actionThatReturnsAValue();
}).
  then(function(theReturnedValue) {
    return actionThatUsesTheValue(theReturnedValue);
}).
  then(function() {
  //usual cleanup
});
```

#### Usage of `done` callback:
For each test case, the `done` callback must be passed in to mocha and then
called at the end of the test.
```javascript
test.it("test-description", function(done) {
```


#### Installation
##### via Yeoman
  1. Git clone
     "https://github.com/mcquackers/generator-integrated-tests-mediamath.git"
into directory of your choosing
  2. Inside the generator-integrated-tests-mediamath repo directory, run ```npm
     link```
  3. Adjacent to the generator-integrated-tests-mediamath repo directory, create
     a new directory
  4. Inside the new directory, run ```npm install yo``` followed by ```yo
     integrated-tests-mediamath```
  5. Follow the prompts
     * Enter default username and password for T1 login.  These will be the
       defaults for future generated tests.
  6. To generate a new test file: run ```yo
     integrated-tests-mediamath:new-test-file``` And follow prompts
     * Enter username and password for test file.  If left blank, will use
       defaults
     * Enter ticket name.  This should match name of assigned ticket
       (SONIC-####)
     * Enter Advertiser name
     * Enter timeout: the time in seconds Mocha will wait before a test times
       out
  7. Start writing tests in generated test file.  Browser will be on Segments
     page

##### via git Clone
1. Git clone "https://github.com/MediaMath/data-services-ui.git"
2. Inside folder, run ```npm install```
3. Using your text editor, open js-tests/test/new-test-file.js and rename it to
   "SONIC-####.js" to match the ticket.

### Documentation

#### BrowserBuddy
creates a customized Chrome browser instance
* createBrowser(webdriver[, implicitWaitTime])
  * Creates a new instance of Chrome browser using Chromedriver
  * browser is created with an implicit wait time of implicitWaitTime or 45s
    default
  * Best run in the test's "before" block
  * returns a browser object
  * Usage: var browser = browserBuddy.createBrowser(webdriver, 25s);

#### LoginBuddy
Logs in to the T1 app
* login(webdriver, browser[, username, password])
  * Using the supplied webdriver and browser, logs in to T1
  * If username and password were supplied in new-test-file generation, uses
    those credentials, otherwise default credentials used
  * Leaves the browser on the "Organization" page
  * Preferred to be used in the "before" block
  * Usage: loginBuddy.login(webdriver, browser, "meow@meowbeans.com", "woof");

#### BehaviorBuddy
Responsible for all actions related to Behaviors

* initialize(webdriver, browser)
  * Sets up the behaviorBuddy with supplied webdriver and browser
  * Preferred usage is calling in the "Before Block"
  * Usage: behaviorBuddy.initialize(webdriver, browser);
* allBehaviorsAdded(arrayOfExpectedBehaviors)
  * Checks to confirm that all Event Pixels supplied in arrayOfExpectedBehaviors
    have been successfully added.
  * arrayOfExpectedBehaviors is an array of Strings that match Event Pixel
    names.
  * Should be called while on the New/Edit Segments page
  * Usage: behaviorBuddy.allBehaviorsAdded(arrayOfExpectedBehaviors);
  * Promise Return
    * On Success: true
        * On failure: Error("Not all behaviors were added")
* editBehavior(behaviorToEdit)
  * Opens the "Edit Behavior" dialog for the desired behavior.
  * behaviorToEdit is a string of the name of the Behavior to edit
    * Current functionality is only Event Pixels
  * Should be called while on the New/Edit Segments page
  * Usage: behaviorBuddy.editBehavior(behaviorToEdit);
  * Promise Return
    * On Success: true
    * On Failure: Error("Something Went Wrong")
* selectFromDropdown(dropdownElement, stringToSelect)
  * Clicks item stringToSelect that is present in dropdownElement
    * Errors if stringToSelect is present, but not visible in the dropdown -
      Requires additional functionality on selenium-webdriver
  * dropdownElement is a dropdown Web Element
  * stringToSelect is a string that matches the desired item
  * Should be called from where the dropdown is visible
    * Note: This function will be turned into a helper function in future
      versions
  * Usage: behaviorBuddy.selectFromDropdown(dropdownElement, stringToSelect)
  * Promise Return
    * On success: true
    * On failure: Error("Item not found in list")
* addEventPixel(pixelToAdd, advertiserName)
  * Navigates the selection tree and selects pixelToAdd from the tree
  * pixelToAdd is a string that matches the name of the desired Event Pixel
  * advertiserName is the name of the selected Advertiser for the test
  * Usage: behaviorBuddy.addEventPixel(pixelToAdd, advertiserName)
  * Promise Return
    * On success: true
    * On failure: Error("Pixel not found in list")
* addEventPixels(arrayOfPixelsToAdd, advertiserName)
  * Navigates the selection tree and adds multiple Event Pixels
  * arrayOfPixelsToAdd is an array of strings that match desired Event Pixel
    names
    * arrayOfPixelsToAdd can also be a single String
    * Doubled functionality may be merged in future versions
  * advertiserName is the name of the advertiser selected for the test
  * Should be called on the New/Edit Segment page
  * Usage: behaviorBuddy.addEventPixels(arrayOfPixelsToAdd, advertiserName)
  * Promise Return
    * On non-failure: true
      * Note: Does not check to confirm all pixels added
    * On failure: returned Error
* addCampaignClick(campaignName, strategyName, advertiserName)
  * Navigates the select tree and selects "Click" from the desired strategy
    under desired campaign
  * campaignName is a string that matches the desired campaign name
  * strategyName is a string that matches the desired strategy name
  * advertiserName is a string that matches the selected Advertiser for the test
  * Should be called from the New/Edit Segment page
  * Usage: behaviorBuddy.addCampaignClick(campaignName, strategyName,
    advertiserName)
  * Promise Return
    * On success: true
    * On failure: Error("Item not found in list")
* addCampaignClicks(arrayOfCampaignNames, arrayOfStrategyNames, advertiserName)
  * Navigates the selection tree and opens all campaigns found in
    arrayOfCampaignNames, then opens all strategies found in
arrayOfStrategyNames, and then selects all Clicks.
  * arrayOfCampaignNames is an array of strings that match desired campaign
    names
  * arrayOfStrategyNames is an array of strings that match desired strategy
    names
  * advertiserName is the name of the Advertiser set for the test
  * Should be called on New/Edit Segments page
  * Usage: behaviorBuddy.addCampaignClicks(arrayOfCampaignNames,
    arrayOfStrategyNames, advertiserName)
  * Promise Return
    * On non-failure: true
    * On failure: returned Error
* addCampaignImpression(campaignName, strategyName, advertiserName)
  * see addCampaignClick
* addCampaignImpressions(arrayOfCampaignNames, arrayOfStrategyNames,
  advertiserName)
  * see addCampaignClicks

* Helper Functions
  * These functions are called by behaviorBuddy's main functions and while they
    *could* be called by the user, this is not well supported via documentation
  * selectItem(stringToSelect)
  * selectItems(arrayOfStringsToSelect)
  * addBehavior()
  * saveBehavior()

#### SegmentBuddy
SegmentBuddy is responsible for all actions related to segments

* initialize(browser, webdriver)
  * Sets up segmentBuddy with supplied browser and webdriver
  * Preffered to be called in the Before block
  * Usage: segmentBuddy.initialize(browser, webdriver)
* getSegmentSize()
  * Refreshes the Segment Size for the current segment
  * Should be called on the New/Edit segment page
  * Usage: segmentBuddy.getSegmentSize()
  * Promise Return
    * On Success: A string of the size of segment
    * On Failure: returned error or Error("Non-numerical Value.  Maybe give more
      time?")
* exitSegment()
  * Exits the current segment without saving
  * Should be called on New/Edit segment page
  * Usage: segmentBuddy.exitSegment()
  * Promise Return
    * On Success: true
    * On Failure: returned error
  * Known Issue: If the current Segment is not a valid segment, will not
    exitSegment
* saveSegment()
  * Saves the current segment
  * Should be called on the New/Edit Segment page
  * Usage: segmentBuddy.saveSegment()
  * Promise Return:
    * On Success: true
    * On Failure: Returned Error
  * Known Issue: If segment is not a valid segment, will throw Error("Element is
    not clickable at x,y")
* newTestSegment(advertiserName, segmentName)
  * Creates a new segment and sets the segment name to segmentName and the
    advertiser to advertiserName
  * advertiserName is a string of the name of the Advertiser set for the test
  * segmentName is a string of the desired name for the segment
  * Should be called on the Segments index page
  * Usage: segmentBuddy.newTestSegment(advertiserName, segmentName)
  * Promise Return:
    * On Success: true
        * On Failure: returned Error
* Helper Functions
  * addSegment()
  * setSegmentName(segmentName)
  * setAdvertiser(advertiserName)
