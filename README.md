# CockTale App

Think of a spirit of your taste and "CockTale" will tell you how to prepare the beverage you deserve.

![CockTale Architecture](https://github.com/AlexandraDonisan/service-oriented-architecture/images/blob/main/CockTale%20Architecture.png)

![C4 Diagram](https://github.com/AlexandraDonisan/service-oriented-architecture/images/blob/main/C4%Diagram.PNG)

<br>

## Service Oriented Architecture

- **Web server** exposing secured REST services for:

  - Authentication using JWT
  - Searching a cocktail by its name
  - A caching mechanism for cocktails. There already are a bunch of beverages in the database so that the performance of the application is imrproved. If the searched cocktail is not stored, an additional call is made to [TheCocktailDB](https://www.thecocktaildb.com/about.php), following it to be stored for future use.

- **Web app** consuming the REST services and receiving server side notifications

  - Microfrontend architecture based on webpack module federation is used to develop two components, i.e. Login App and Cocktail App

- **Integration** between the web server and another 3rd party service
  - [TheCocktailDB](https://www.thecocktaildb.com/about.php) provides a free data source API for drinks online
- **Containers** are used to deploy the following services:

  - MongoDB
  - Backend
  - Login App
  - Cocktail App

  ![Docker Containers](https://github.com/AlexandraDonisan/service-oriented-architecture/images/blob/main/Docker%20Containers.PNG)

- The SOA Pattern used is Client/Server/Service
