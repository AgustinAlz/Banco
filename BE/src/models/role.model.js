import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        adminPermission: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Role", roleSchema);