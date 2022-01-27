# CockTale App

Think of a spirit of your taste and "CockTale" will tell you how to prepare the beverage you deserve.

<br>

## Service Oriented Architecture

- **Web server** exposing secured REST services
- **Web app** consuming the REST services and receiving server side notifications.
  - microfronend architecture based on webpack module federation is used
- **Integration** between the web server and another 3rd party service
  - [TheCocktailDB](https://www.thecocktaildb.com/about.php) provides a free data source API for drinks online
- **Containers** are used to deploy the solution
