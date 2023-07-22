const express = require('express');
const router = express.Router();
const Admin = require('../Schemas/adminSchema');

// router.post("/submit_login", async (req, res) => {
//         try {
//                 const { adminId, adminPassword } = req.body; // Assuming the adminId and adminPassword are provided in the request body

//                 const admin = new Admin({ adminId, adminPassword });
//                 await admin.save();
//                 console.log("Admin credentials inserted successfully");

//                 res.status(200).json({ message: "Admin details inserted successfully" });
//         } catch (error) {
//                 console.error(error);
//                 res.status(500).json({ error: "Failed to insert admin details" });
//         }
// });

router.post('/check_admin_login', async (req, res, next) => {
        const { adminId, adminPassword } = req.body;
        console.log(adminId)
        try {
                const admin = await Admin.findOne({ adminId }).maxTimeMS(30000);
                if (admin && admin.adminPassword === adminPassword) {
                        console.log('Admin credentials verified successfully');
                        return res.status(200).json({ status: true });
                } else {
                        console.log('Incorrect admin credentials');
                        res.status(401).json({ status:false,error: 'Incorrect admin credentials' });
                }
        } catch (error) {
                console.error(error);
                res.status(500).json({ status:false, error: 'Internal server error' });
        }
});

module.exports = router;
