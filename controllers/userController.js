import UserModel from '../models/users.js';

export const getUser = async (req,res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    let user = req.body;
    
    try {
        const startTime = user.startTime;
        const endTime = user.endTime;
        const weight = user.weight;
        let initialWaterRequirement = (2 / 6) * parseInt(weight);
        const startTimeSplit = startTime.split(':');
        const startTimeMinutes = parseInt(startTimeSplit[0]) * 60;
        const totalStartTime = startTimeMinutes + parseInt(startTimeSplit[1]);

        const endTimeSplit = endTime.split(':');
        const endTimeMinutes = parseInt(endTimeSplit[0]) * 60;
        const totalEndTime = endTimeMinutes + parseInt(endTimeSplit[1]);
        let totalWorkTime;
        if (totalStartTime < totalEndTime) {
            totalWorkTime = totalEndTime - totalStartTime;
        } else {
            totalWorkTime = (1440 - totalStartTime) + totalEndTime;
        }
        const totalOuncesOfWaterRequired = (0.4 * totalWorkTime) + initialWaterRequirement;
        // Considering 7 ounces of water = 1 glass
        const goal = Math.round(totalOuncesOfWaterRequired / 7);
        user.goal = goal;
        // let timeGapToDrink = Math.parseFloat(1440/goal);

        const fetchedUser = await UserModel.findOne({name: user.name});
        if (fetchedUser) {
            fetchedUser.name = user.name;
            fetchedUser.startTime = user.startTime;
            fetchedUser.endTime = user.endTime;
            fetchedUser.weight = user.weight;
            fetchedUser.goal = user.goal;
            const updatedUser = await fetchedUser.save();
            if (updatedUser) {
                res.status(200).json(fetchedUser);
            } else {
                res.status(400).json({message: 'User not updated.'});
            }
        } else {
            const newUser = new UserModel(user);
            const userCreated = await newUser.save();
            if (userCreated) {
            res.status(200).json(newUser);
            } else {
                res.status(400).json({message: 'User not created.'});
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}