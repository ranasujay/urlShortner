const User = require('../Models/User');

exports.getUserByEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }

    try {
        const user = await User.findOne({ email }).populate('links').exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log(user);

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};