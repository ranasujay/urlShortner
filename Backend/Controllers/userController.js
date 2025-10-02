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
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get user's URLs separately using the new structure
        const UrlModel = require('../Models/UrlModel');
        const userUrls = await UrlModel.find({ userId: user._id });

        console.log('User found with URLs:', { user, userUrls });

        return res.status(200).json({
            success: true,
            data: {
                ...user.toObject(),
                links: userUrls // Include URLs for backward compatibility
            }
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};