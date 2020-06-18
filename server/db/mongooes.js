const mongoose = require('mongoose');

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;

// Database Connection
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log("Started connection to mongo");
    } else console.log(err);
});
