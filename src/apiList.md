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

/feed?page=1&limit=10 => 1-10  .skip(0) & limit(10)
/feed?page=2&limit=10 => 11-20 .skip(10) & limit(10)
/feed?page=3&limit=10 => 21-30 .skip(20) & limit(10)

two imp functions
.skip(0)   -> means skips 0 
.limit(10) -> means set limit to 10
so formula of skip can be :  (page-1)*limit

status : ignore,interested,accepted,rejected