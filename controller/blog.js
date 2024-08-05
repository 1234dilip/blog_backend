const blogModel = require('../model/blog')

exports.createBlog = async (req, res) => {
    const { title, discription } = req.body
    const image = req.file ? req.file.path : null;
    try {
        let blogDetails = new blogModel({
            title,
            discription,
            image,
            userId: req.userId,
            published:true
        })
        const saveDetails = await blogDetails.save()
        res.status(200).json({ data: saveDetails })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

exports.getAllPost = async (req, res) => {
    try {
        const allPost = await blogModel.find()
        return res.status(200).json({data:allPost})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.specificUserPost = async (req, res) => {
    try {
        const userId = req.params.id
        const blog = await blogModel.find({ userId: userId })
        return res.status(200).json({ data: blog })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const blogDetails = req.body
        const updateBlog = await blogModel.findByIdAndUpdate(blogId, blogDetails, { new: true })
        if(!updateBlog){
            res.status(500).json({message:"blog is not update"})
        }
        return res.status(200).json({message:updateBlog})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const deleteBlog = await blogModel.findByIdAndUpdate(blogId, { isDeleted: true }, { new: true })
        if (!deleteBlog) {
            res.status(500).json({ message: "deleted user not found" })
        }
        return res.status(200).json({ message: 'blog is successfully deleted' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.likeblog = async (req, res) => {
    try {
        const blogId = req.params.id
        const userId = req.userId;
        const blog = await blogModel.findById({ _id: blogId })
        if (!blog) {
            return res.status(404).json({ message: 'Blog is not found' })
        }
        const hasLiked = blog.likedBy.includes(userId);

        if (hasLiked) {
            blog.likes -= 1;
            blog.likedBy = blog.likedBy.filter(id => id.toString() !== userId.toString());
        } else {
            blog.likes += 1;
            blog.likedBy.push(userId);
        }
                const saveBlog = await blog.save()
        return res.status(200).json({ data: saveBlog })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }


}
exports.commentOnBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.userId;
        const { comment } = req.body; 
        if (!comment) {
            return res.status(400).json({ message: 'Comment text is required' });
        }    
        const blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        blog.comments.push({
            user: userId,
            comment,
            commentedAt: Date.now()
        });
        const savedBlog = await blog.save();
                return res.status(200).json({ data: savedBlog });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

