import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true
    }
}, {
    collection: 'users'
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;