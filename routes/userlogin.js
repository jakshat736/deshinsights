const express = require("express");
const router = express.Router();
const User = require("../Schemas/UserSchema");

router.post("/sign_up", async (req, res) => {
    try {
        const { username, emailid, mobileno, password } = req.body;

        // Check if all required fields are provided
        if (!username || !emailid || !mobileno || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const userSignUp = new User({
            username,
            emailid,
            mobileno,
            password
        });

        await userSignUp.save();

        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
});

// router.post("/sign_up", async (req, res) => {
//     try {
//         const userSignUp = new User({
//             username: req.body.username,
//             emailid: req.body.emailid,
//             mobileno: req.body.mobileno,
//             password: req.body.password
//         });
//         await userSignUp.save();
//         return res.status(200).json({ status: true });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false });
//     }
// });

router.post('/user_login', async (req, res) => {
    try {
        const { emailid, password, userid } = req.body;
        console.log(userid);

        const user = await User.findOne({ userid }).maxTimeMS(30000);

        if (user && user.password === password && user.emailid === emailid) {
            console.log('Your credentials have been verified successfully');
            return res.status(200).json({ status: true });
        } else {
            console.log('Incorrect credentials');
            return res.status(401).json({ status: false, error: 'Incorrect credentials' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
});

module.exports = router;