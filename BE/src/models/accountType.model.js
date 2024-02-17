import mongoose from "mongoose";

const accountTypeSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
        },
        currency: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("AccountType", accountTypeSchema);