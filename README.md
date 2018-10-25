# Rating System Front-End Application
Front End Interface for the Rating System and starting point for a unified front-end application for all R&B in-house web-based solutions.

## Introduction
This application runs in the user's browser.

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