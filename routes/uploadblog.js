const express = require("express");
const router = express.Router();
const UploadBlog = require("../Schemas/UploadBlogSchema");
const upload = require("./multer");

// ADD NEW uploadblog
router.post("/adduploadblog", upload.single('icon'), async (req, res) => {
    try {
        const uploadblog = new UploadBlog({
            categoryid: req.body.categoryid,
            title: req.body.title,
            date: req.body.date,
            url: req.body.url,
            description: req.body.description,
            likes: req.body.likes,
            liked: req.body.liked,
            share: req.body.share,
            shard: req.body.shared,
            icon: req.file.originalname
        });
        await uploadblog.save();
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

// Display All Categories
router.get("/display_all_blog", async (req, res) => {
    try {
        // const uploadblog = await UploadBlog.find({});
        const uploadblog = await UploadBlog.find({}).populate('categoryid', 'categoryname');
        return res.status(200).json({ status: true, data: uploadblog });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: [] });
    }
})

// Edit a uploadblog
router.post("/edit_data", async (req, res) => {
    try {
        const { categoryid, uploadblogid, title, url, description } = req.body;
        await UploadBlog.updateOne({ _id: uploadblogid }, { categoryid: categoryid, title: title, url: url, description: description });
        console.log(UploadBlog)
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

// Delete a uploadblog
router.post("/edit_uploadblog", upload.single('icon'), async (req, res) => {
    try {
        await UploadBlog.findByIdAndUpdate(req.body.uploadblogid, {
            icon: req.file.originalname
        });
        console.log(UploadBlog)
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

router.post("/edit_likes", async (req, res) => {
    try {
        await UploadBlog.findByIdAndUpdate(req.body.uploadblogid, {
            likes: req.body.likes,
            liked: req.body.liked
        });
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})
router.post("/edit_share", async (req, res) => {
    try {
        await UploadBlog.findByIdAndUpdate(req.body.uploadblogid, {
            share: req.body.share,
            shared: req.body.shared
        });
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

// Update uploadblog Icon 
router.post("/delete_data", async (req, res) => {
    try {
        const { uploadblogid } = req.body;
        await UploadBlog.deleteOne({ _id: uploadblogid });
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false });
    }
})

// to fetch blog in filter
router.post('/blogs', async (req, res) => {
    const categoryIds = req.body.categoryIds;
    console.log(categoryIds);
    try {
        const blogs = await UploadBlog.find({ categoryid: { $in: categoryIds } }).exec();
        console.log(blogs)
        return res.status(200).json({ status: true, data: blogs });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/search', async (req, res) => {
    try {
      const { term } = req.body;
      const blogs = await UploadBlog.find({
        $or: [
          { title: { $regex: term, $options: 'i' } },
          { description: { $regex: term, $options: 'i' } }
        ]
      });
      return res.status(200).json({status:true, data: blogs });
    } catch (err) {
      console.error(err);
      return res.status(500).json({status:false, message: 'Server error' });
    }
  });

module.exports = router;