# wise-crack
Part 9

Date: 12.12.2022 - 31.12.2022

### Exercises

#### Branches

- [Solution for Exercise 9.1 - 9.3](https://github.com/aiotrope/wise-crack/tree/9.19)

- [Solution for Exercise 9.4 - 9.5](https://github.com/aiotrope/wise-crack/tree/9.20)

- [Solution for Exercise 9.8 - 9.9](https://github.com/aiotrope/wise-crack/tree/9.11)

- [Solution for Exercise 9.10 - 9.11](https://github.com/aiotrope/wise-crack/tree/9.12)

- [Solution for Exercise 9.12 - 9.13](https://github.com/aiotrope/wise-crack/tree/9.13)

- [Solution for Exercise 9.14 - 9.15](https://github.com/aiotrope/wise-crack/tree/9.18)

- [Solution for Exercise 9.16 - 9.18](https://github.com/aiotrope/wise-crack/tree/9.14)

- [Solution for Exercise 9.19 - 9.22](https://github.com/aiotrope/wise-crack/tree/9.16)

- [Solution for Exercise 9.23 - 9.27](https://github.com/aiotrope/wise-crack/tree/9.17)


##### CLI Commands

``` bash
# install dependencies
npm install

# serve frontend at localhost:3000 
npm run start

# build the backend
npm run build

# lint
npm run lint:fix

# code formatting
npm run format

# serve backend at localhost:3001
npm run dev
```

##### API Endpoints 

Base endpoint: **/api**

**GET /patients** - List all patients

**GET /patients/:id** - Fetch patient by id

**GET /patients/public** - List all patients with the SSN

**POST /patients** - Create new patient

**GET /diagnose** - Fetch list of diagnoses

**POST /diagnose** - Create new diagnosis

**GET /occupationalHealth** - Fetch list of occupational health care entries

**POST /occupationalHealth/:id** - Create new occupational health care entry based on patient ID

**GET /health-check** - Fetch list of health check entries

**POST /health-check/:id** - Create new health check entry based on patient ID

**GET /hospital** - Fetch list of hospital entries

**POST /hospital/:id** - Create new hospital entry based on patient ID

##### General Directories

`/src`: Main backend server folder of `patientor` frontend app

`/patientor`: Main frontend folder

`/build`: Build directory of backend `/src`

`/bmi`: Express-TS project folder for exercises `9.1-9.7` 

`/courseinfo`: React-TS folder for exercises `9.14-9.15`






