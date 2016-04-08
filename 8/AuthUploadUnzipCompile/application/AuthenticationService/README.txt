To run the project
------------------ 
Run in the project folder the following command:

mvn clean package exec:java -Dmaven.test.skip=true

To run the JUnit test
----------------------
Run in the project folder the following command:

mvn -Dtest=TestAuthenticationService test

or

mvn -q -Dtest=TestAuthenticationService surefire:test

Note: MongoDB must be running on default port.  
----------------------------------------------     
MongoDB can be started via (but this may vary):

mongod --dbpath ../  