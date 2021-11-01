# Project89

SpringBoot Web + JWT + React.js + Bootstrap + Postgres + chart.js

## Setup

### Postgres DB

```
docker run -p 5432:5432 --name pg-container -e POSTGRES_PASSWORD=password -d postgres:9.6.10
docker ps
docker run -it --rm --link pg-container:postgres postgres psql -h postgres -U postgres
CREATE USER test WITH PASSWORD 'test@123';
CREATE DATABASE "test-db" WITH OWNER "test" ENCODING UTF8 TEMPLATE template0;
grant all PRIVILEGES ON DATABASE "test-db" to test;
```


### Dev

To Run UI in DEV mode

```bash
cd project89/ui
yarn install
yarn build
yarn start
```

To Run backend in DEV mode

```bash
cd project89
./gradlew bootRun
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```
user: admin
pwd: admin@123

user: user
pwd: user@123
```

### Prod
To run as a single jar, both UI and backend are bundled to single uber jar.

```bash
./gradlew cleanBuild
cd project89/build/libs
java -jar project89-1.0.0.jar
```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

```
user: admin
pwd: admin@123

user: user
pwd: user@123
```

