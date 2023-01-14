const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require('../../config/config')


const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invalid email!");
      },
    },
    password: { type: String, trim: true, min: 6, max: 50 },
    // mobile: {
    //   type: String,
    //   trim: true,
    //   unique: true,
    //   validate(value) {
    //     if (!validator.isMobilePhone(value.toString(), "ar-EG"))
    //       throw "invalid mobile!"
    //   },

    // },
    assignments: [{
      date: { type: Date, default: Date.now() },
      title: { type: String },
      rate: { type: Number }
    }],
    tokens: [{ token: { type: String } }],
    lang: { type: String, default: 'ar' },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  { timestamp: true }
);

userSchema.pre("save", function () {
  const user = this;
  if (user.isModified("password")) {
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
});

userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user);
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('#1.1.2');
  return user
}


userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, config.JWTKEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token
}




const User = mongoose.model("Users", userSchema, "Users");
module.exports = User;
