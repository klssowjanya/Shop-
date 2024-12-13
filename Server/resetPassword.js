// In your Express app (server.js or a similar file)
const express = require('express');
const User = require('./models/User'); // Adjust the path according to your project structure
const router = express.Router();

router.post('/reset-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's password (you should hash the password before saving)
        user.password = password; // Hash this password before saving in production
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
