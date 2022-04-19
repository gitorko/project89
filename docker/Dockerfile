FROM openjdk:11
WORKDIR /var/app
COPY ./build/libs/project89-1.0.0.jar /var/app/project89-1.0.0.jar
ENV _JAVA_OPTIONS '-Dspring.datasource.host=db-server'
CMD [ "java", "-jar", "/var/app/project89-1.0.0.jar" ]
EXPOSE 8080
