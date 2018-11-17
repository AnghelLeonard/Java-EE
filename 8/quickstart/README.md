# Java EE 8 Quickstart app for NetBeans 8.2, Payara 5
-----------------------------------------------------
# Build from command line
mvn clean package && docker build -t com.sample/quickstart .

# RUN via Docker
docker rm -f quickstart || true && docker run -d -p 8080:8080 -p 4848:4848 --name quickstart com.sample/quickstart 
