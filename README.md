## Integrated Test Framework via Yeoman

##### Goal
The goal of this Integrated Test Framework is to quickly create new tests using
a custom built framework and yeoman generator.

##### Installation
1. Git clone the repo into the desired directory.
2. Run `npm link`
3. Create a new folder adjacent to the repo folder to hold testing framework and tests
4. In this newly created folder, run `npm install yo`
5. run `yo integrated-tests-mediamath`
6. Enter desired default Username and password
    * These will be used as defaults for each new test created
7. run `yo integrated-tests-mediamath:new-test-file`
    * Username and password entries will override defaults for this test
    * Ticket name should match name of assigned ticket (SONIC-####)
    * Advertiser to use for test: Name of an advertiser under Acme organization
        * Default is previously used Advertiser
    * Segment Name is desired name for segment
    * Mocha Timeout: The amount of time in seconds mocha will wait before timing
      a test out as an error
8. Start writing tests in test/SONIC-####.js
    * Browser will start on the Segments page
