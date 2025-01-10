#DevTinder

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

connectionRequestRouter 
-POST /request/send/interesed/:userID
-POST /request/send/ignored/:userID
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:userID

userRouter
-GET /user/connections
-GET /user/requests/recieved
-GET /user/feed - gets you the profile of other users on platform

status : ignore,interested,accepted,rejected