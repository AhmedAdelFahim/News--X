const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const helmet = require('helmet')
const path = require('path')
require('./db/mongooes');
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const sourceRouter = require('./routes/source')


const PORT = process.env.PORT || 5000;

const app = express();


app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        imgSrc:["'self'"],
        styleSrc:["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        fontSrc:["'self'", 'fonts.googleapis.com']
    }
}))
// let corsOptions = {
//     origin: `http://localhost:${process.env.CLIENT_PORT}`
// };

// app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// middleware that logs requests method and the url requested.
// app.use((req, res, next) => {
//     let date = new Date().toISOString().split('T');
//     console.log(`\n\n${date[0]} ${date[1]}`);
//     console.log(`new request, its method: ${req.method}`);
//     console.log(`the url requested: ${req.url}\n`);
//     next();
// });

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/sources', sourceRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

// Initiating the Server
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`App Started on port: ${PORT}`);
    }

});
