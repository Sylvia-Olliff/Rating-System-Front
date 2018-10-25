# GitHub Users!
This VueJS application was created solely by myself for Rogers and Brown Customs Brokers' child company Rogers and Brown North American Logistics. Where it is used daily by their dispatchers.

The below documentation was intended for internal use. If you wish to see the same documentation this refers to, clone this repository, install all dependencies, and use the command 'npm run doc'. You will then have the js-doc static page under the directory ./out. Also Please note that key portions of the configuration file for this application has been removed. If you attempt to run this application it will FAIL! This code is simply here as a demonstration for those interested in detailed documentation using JSDOC and how to set up an authenticated VueJS application in an INTERNAL environment. I emphasize internal as this app is not setup to be as secure as it would be if it were 'out in the wild' instead of used internally.

## Fellow Software Engineers
This documentation was written specifically for fellow programmers who's only experience were with an IBM environment and the RPG language. If you see somewhere were the documentation can be improved for a broader audience, please feel free to submit a pull request.

Also please note that the LTL (Less than Truck Load) module for the Rating System is currently under construction.

# Rating System Front-End Application
Front End Interface for the Rating System and starting point for a unified front-end application for all R&B in-house web-based solutions.

## Introduction
This application runs in the user's browser and is a self-contained way of interacting with the Rating System API. It remembers user details requiring a fresh login only once every 24 hours. It also remembers user settings like which columns to display in lane maintenance for example.

---

# Using This Interactive Documentation

In the navbar up above there should be a search bar, a dropdown list of modules, a drop down list for global, and the name of this application.

#### Search Bar
This will search the documentation and source code of the entire application displaying a list of possibly relevant locations to choose from, based on the text you provide.
For Example, searching for 'insert' will show you every place in the documentation and source code where that word is mentioned.

#### Modules
This Application is broken down into individual modules designed to perform a given task, ranging from communication, processing, to managing other modules. This dropdown list shows you all of the modules within this application, their relative location, and each item in the dropdown is a link to that module's documentation.

#### Classes
These are used to create instances of an object that will need both properties and its own methods. This allows for the rapid creation of as many of these objects as necessary and ensures that each one will have the same behavior and capabilities as the next. An Example of this would be a Class that describes a single lane. This object would have properties for the origin, destination, rating information, etc... It would also have the ability to take those properties and translate their contents into a SQL string, or into XML format, etc... In Summary, a Class is a blueprint that is used to describe a 'Thing' (either physical or conceptual), that 'Thing's properties that are important, and what that 'Thing' can do that is important. 

#### Global
This is the documentation for anything unique to this application that exists on a 'Global' scale i.e. is available everywhere in the application, Currently this is only Type Definitions. These are documentation for custom objects that are used by more than one module. They can be thought of as Data Structures or Objects that don't have any instanced methods, unlike Classes. A Type Definition describes the contents of an object, what properties are expected and which ones are optional. This is normally only used for large objects that are passed between functions as a parameter, otherwise the contents are described in that function's documentation.

#### Externals
This shows a list of all external modules, these are packaged tools written by someone else for open source and/or free commercial use. The detailed description contains a brief summary of what that module is used for in this application. The description will also contain a link under the bulletin 'See:' that will take you to that module's NPM (Node Package Manager) page. 