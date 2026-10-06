# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST / logout

## profileRouter
- GET /profile/view
- PATCH /profilr/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:user/id   // status -> intrested and ignored 
- POST /request/review/:status/:requestId   // status -> accepted or rejected

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profile of other users on platform 

Status : ignore, intrested, accepted, rejected 