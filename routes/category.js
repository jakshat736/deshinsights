const express = require("express");
const router = express.Router();
const Category = require("../Schemas/CategorySchema");
const upload = require("./multer");

// ADD NEW CATEGORY
router.post("/addcategory", upload.single('icon'), async (req, res) => {
    try {
        const { categoryname } = req.body;
        console.log(categoryname)
        const icon = req.file.originalname;
        console.log(icon)
        const category = new Category({ categoryname, icon });
        await category.save();
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

// // to fetch blog in filter
// router.post('/blogs', async (req, res) => {
//     const categoryIds = req.body.categoryIds; // Assuming the category IDs are sent in the request body as an array
  
//     try {
//       const blogs = await Blog.find({ categoryid: { $in: categoryIds } }).exec();
//       res.json(blogs);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// Display All Categories
router.get("/display_all_category", async (req, res) => {
    try {
        const categories = await Category.find({});
        console.log(categories)
        return res.status(200).json({ status: true, data: categories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: [] });
    } 
})

// Edit a Category
router.post("/edit_data", upload.single('icon'), async (req, res) => {
    try {
        const { categoryid, categoryname } = req.body;
        await Category.updateOne({ _id: categoryid }, { categoryname });
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

// Delete a Category
router.post("/delete_data", async (req, res) => {
    try {
        const { categoryid } = req.body;
        await Category.deleteOne({ _id: categoryid });
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

// Update Category Icon 
router.post("/edit_icon", upload.single('icon'), async (req, res) => {
    try {
        const { categoryid } = req.body;
        const icon = req.file.originalname;
        await Category.updateOne({ _id: categoryid }, { icon });
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

module.exports = router;