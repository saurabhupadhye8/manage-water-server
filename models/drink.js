import mongoose from 'mongoose';

const drinkSchema = mongoose.Schema({
    name: String,
    drinkTime: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const DrinkModel = mongoose.model('DrinkModel', drinkSchema);
export default DrinkModel;