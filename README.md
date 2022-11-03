# Mia2013-masterwork

## A projekt áttekintése

A Tortavilág egy webshop, ahol tortákat lehet rendelni. Ha egyedi kérésünk van, akkor van lehetőségünk üzenet küldésre is.

## Jogosultságkezelés

### Nem regisztrált felhasználó:
Lehetősége van betekinteni az oldalra, megnézni az aktuális kínálatot, regisztrálni az oldalra, kapcsolati űrlap kitöltésre.

### Regisztrált felhasználó:
Lehetősége van tortát rendelni az oldalról, módosíthatja a regisztrációkor megadott adatait, megtekintheti a korábbi rendeléseit, küldhet üzenetet a kapcsolati űrlapon.

## Főbb funkciók:
- Regisztráció név, email és jelszó.
- Bejelentkezés email és jelszó megadásával

## Technikai követelmények:

#### Backend:
- Node.js
- Express.js
- JSON Web Token
- MongoDB
- Docker

#### Frontend:
- React

#### API dokumentáció:
- OpenAPI/Swagger

## Alkalmazás telepítése

- Hozzon létre `.env` fájl a `.env.example` fájl alapján.
- Használja a következő parancsokat:
  - `docker-compose build`
  - `docker-compose up`
- Tortavilág applikáció: [http://localhost:3000/](http://localhost:3000/)
- Open API dokumentáció: [http://localhost:4000/api-docs/](http://localhost:4000/api-docs/)




