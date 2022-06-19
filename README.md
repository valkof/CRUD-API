# CRUD API

### Installation

```bash
git clone https://github.com/valkof/CRUD-API.git
```
```bash
cd CRUD-API
```
```bash
git checkout develop
```
```bash
npm i
```

### Command syntax

1. Development mode

```bash
npm run start:dev
```

2. Production mode

```bash
npm run start:build
```

3. Tests

```bash
npm run test
```


### Endpoints

- API path `api/users`:

  - **GET** `api/users` is used to get all persons
  - **GET** `api/users/${userId}` is used to get user with `userId`
  - **POST** `api/users` is used to create record about new user and store it in database
  - **PUT** `api/users/{userId}` is used to update existing user
  - **DELETE** `api/users/${userId}` is used to delete existing user from database

- Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
