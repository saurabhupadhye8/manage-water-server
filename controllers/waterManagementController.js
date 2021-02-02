import DrinkModel from '../models/drink.js';

export const drinkWater = async (req, res) => {
	let drinkObject = req.body;

	try {
		const drinkWater = new DrinkModel(drinkObject);
		const drankWater = await drinkWater.save();
		if (drankWater) {
			res.status(200).json(drinkWater);
		} else {
			res.status(400).json({ message: 'Water not drank.' });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
