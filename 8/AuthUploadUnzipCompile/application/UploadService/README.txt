To run the project
------------------ 
Run in the project folder the following command:

mvn clean package exec:java -Dmaven.test.skip=true

Note: The AuthenticationService must be running.

To run the JUnit test
----------------------
Run in the project folder the following command:

mvn -Dtest=UploadTest test

or

mvn -q -Dtest=UploadTest surefire:test

Note: The AuthenticationService can be stop.
 