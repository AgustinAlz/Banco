import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        givenName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        fullName: {
            type: String,
            default: function() {
              return this.givenName + " " + this.lastName;
            }},
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: mongoose.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);