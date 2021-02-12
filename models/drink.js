import mongoose from 'mongoose';

const drinkSchema = mongoose.Schema({
    name: String,
    drinkTime: String,
    createdAt: String
});

const DrinkModel = mongoose.model('DrinkModel', drinkSchema);
export default DrinkModel;