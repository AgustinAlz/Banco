import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        number: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        owners: [{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }],
        accountType: {
            type: mongoose.Types.ObjectId,
            ref: "AccountType",
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Account", accountSchema);