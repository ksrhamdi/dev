const express = require('express');
const app = express();
const router = express.Router(); 


// const { mongoose } = require('./config/mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

// Load in the mongoose models
const{User } = require('./models/User');
const{Action } = require('./models/Action');

const jwt = require('jsonwebtoken');


/* MIDDLEWARE  */

// Load middleware
app.use(bodyParser.json());
//middelware
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'})); // for allowing to futch api in differents sites 



// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});


// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }


        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}

/* END MIDDLEWARE  */


/* ROUTE HANDLERS */

/* USER ROUTES */

/**
 * POST /users
 * Purpose: Sign up
 */
app.post('/users', (req, res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})


/**
 * POST /users/login
 * Purpose: Login
 */
app.post('/users/login', (req, res) => {
    let userLogin = req.body.userLogin;
    let password = req.body.password;

    User.findByCredentials(userLogin, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})


/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})




//controlers
const PactionControl = require('./controllers/PactionControl');
const UserControl = require('./controllers/UserControl');
const ActionController = require('./controllers/ActionController');
const TypeControl = require('./controllers/TypeControl');

//routes

// router to paction controlleur
app.post('/api/pactionn/createPaction', PactionControl.createPaction);
app.get('/api/paction/get/:id', PactionControl.get);
app.get('/paction', PactionControl.gett);

// old
// app.post('/api/pactionThem/get/:id', PactionControl.createTheme);
// app.get('/api/pactionTheme/get/:id', PactionControl.getTheme);

//v2
app.post('/api/pactionThem/:idpland', PactionControl.createThm)
app.patch('/pactionThem/:id', PactionControl.updateThm)
app.get('/themeByIdd/:id', PactionControl.getThemee)
app.get('/Allpland', PactionControl.getAll)
app.delete('/deletethemeByIdd/:id', PactionControl.deleteThm)
app.delete('/deletetheme', PactionControl.deleteThmMany)

// app.put('/api/pactionTheme/getThemeDisign/:id/:idd', PactionControl.updateThemee);

app.get('/api/getSource/get', PactionControl.getSource);
app.get('/api/getvisibilite/get', PactionControl.getVisibilite);
app.get('/api/gettitle/get/:id', PactionControl.getTitle);

// router to user controlleur
app.use('/userss' , UserControl); 


// router to action controlleur
app.post("/action/:id/:idpland", ActionController.create) 
app.get("/listAction/:id",ActionController.findActionByIdPland)
app.get("/action/:id", ActionController.getByID) 
app.get("/actionbyID/:id", ActionController.get) 
app.get("/actionbyIDUser/:id", ActionController.getActByThm) 

app.delete("/action/:id", ActionController.delete)
app.delete("/action", ActionController.deleteMany)
app.patch("/action/:id", ActionController.update)
app.get("/listAction",ActionController.getActions)
app.get("/listActionByTheme/:id",ActionController.getAct)
app.get("/Theme/:id",ActionController.getTheme)
app.post("/ajoutMembre/:id",PactionControl.ajoutMembre)


// router to type controlleur
app.get("/types", TypeControl.get) 
app.get("/listTypeByID/:id",TypeControl.getTypeById)








//making our server on ecoute 
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})