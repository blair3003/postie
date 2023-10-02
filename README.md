# Postie

Postie is a progressive web application, built using the MERN stack, that provides a community of authenticated users a platform to post and comment on images.

https://postie.onrender.com
 
## The App

The front-end is a React application that provides a user interface to the Postie API. It uses client-side routing, data provision through context, protected routes, and persistent login. Users can register on the site, login, and begin posting images and commenting on other posts.

## Features

Features of the app include:

- **Application Context** - A context is used to provide global state management - error and loading states, as well as current user information and fetch methods are available through the store.
- **Authentication** - Users can register and log in to create new posts and add comments - access tokens are sent to the api to confirm identify and roles.
- **Authorisation** - Users are assigned the author role on registration - this allows them to create, edit and delete their own posts. The admin role allows access to modify all posts.
- **Persistent login** - A cookie is used to refresh the user's access token after it expires, or on application reload, avoiding the need to log in again.
- **Error handling** - Error messages, including validation errors, are displayed to the user in an aesthetically consistent manner.
- **Image cache** - Images are cached on the server to improve application load speed.


## The API

The Postie API is a RESTful API built using Node.js with the Express.js framework. Data is stored in MongoDB, and the application interfaces with the document database via the Mongoose library.

[Postie API (GitHub) →](https://github.com/blair3003/postie-api)
