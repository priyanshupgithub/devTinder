#devTInder

- create vite +react application
- remove unecessary code and create the Hello World
- install tailwind css 
- install Daisy UI
- add navbar component to app.jsx
- create a NavBar.jsx separate component file
- install react-router-dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create the Outlet in the Body component
- Create the Footer
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to app with configuration : origin, credential :true
- Whenever you are making the API call so pass axios => {withCreadentials:true}
- Install Redux Toolkit https://redux-toolkit.js.org/tutorials/quick-start
- Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store
- Add redux devtools as extension
- Login and see if your data is coming properly in the store
- NavBar is update as soon as the user is logged in
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in the store
- build the user card on feed
- Edit Profile feature
- Toast message on save of Profile






Body
    NavBar
    Route=/ => feed
    Router=/connections => Connections
    Router=/profile => Profile