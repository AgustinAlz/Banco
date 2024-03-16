import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        notes: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Transaction", transactionSchema);