const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueArrayPlugin = require('mongoose-unique-array');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
        validate: {
            validator: function (value) {
                if (value.trim().length < 2) {
                    throw new Error(`Name must be at least 8 letter.`);
                }

                if (!value.trim().match(/[a-zA-Z ]+/)) {
                    throw new Error(`Name must contains letters and space only`);
                }
            }
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                if (!validator.isEmail(value)) {
                    throw new Error(`Email is not vaild.`);
                }
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        validate: {
            validator: function (value) {
                console.log(value)
                if (!value.match(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/)) {
                    throw new Error(`Password must be at least 8 symbols.\nPassword must have at least two uppercase letters.\nPassword must have at least one special case letter.\nPassword must have at least two digits.\nPassword must have at least three lowercase letters.\n`)
                }
            }
        }
    },
    sources: {
        type:[{
            type: String,
        }],
    }
}, {
    timestamps: true,
});

userSchema.plugin(uniqueArrayPlugin);

userSchema.methods.generateAuthToken = function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.SECRET, {
        expiresIn: 604800 //7 days in seconds [168 hours]
    });
    return token
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hash = await bcrypt.hash(user.password, saltRounds)
        user.password = hash
        next()
    } catch (e) {
        next(e)
    }
});


userSchema.post('save', function (error, doc, next) {
    console.log("post",error)
    if (error.name === 'MongoError' && error.code === 11000) {
        if (Object.keys(error.keyPattern)[0] === 'email') {
            next({
                errors: {
                    email: 'email must be unique',
                }
            });
        }
    } else {
        const keys = Object.keys(error.errors);
        const errors = keys.reduce((acc, key) => {
            return {
                ...acc,
                [key]: error.errors[key].properties.message
            }
        }, {})
        next({errors});
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User;
