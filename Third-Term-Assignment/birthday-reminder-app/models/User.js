import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: [true, "Username is required."],
    unique: [true, "Username is already in use."]
  },
  email: { 
    type: String,
    required: [true, "Email is required."],
    unique: [true, "Email is already in use."],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."]
  },
  date_of_birth: {
    type: Date,
    required: [true, "Date of birth is required."],
    validate: [
      {
        validator: (v) => validator.isDate(v),
        message: "Please provide a valid date."
      },
      {
        validator: (v) => v < new Date(),
        message: "Date of birth cannot be a future date."
      } 
    ]
  }
},
{ timestamps: true }
)

export const User = mongoose.model("User", userSchema)