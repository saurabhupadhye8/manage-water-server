import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    startTime: String,
    endTime: String,
    weight: String,
    goal: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const UserModel = mongoose.model('UserModel', userSchema);
export default UserModel;