import Blog from "../models/blog.model.js";

export const getBlogPosts = async (req, res) => {
    try {
        let blogs = await Blog.find({});
        if (await Blog.countDocuments() === 0) {
            return res.status(404).json({success:false, message: "Blogs not found"})
        }

        if(req.query.categoryId) {
            blogs = await Blog.find({categoryId: req.query.categoryId});
        }   
        
        res.status(200).json({success:true, data: blogs});
    }
    catch (error) {
        console.log("Error in getting blogs", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

export const getBlogPostById = async (req, res) => {
    const { id } = req.params;
    try {
        let blogs = await Blog.findById(id);
        if (!blogs) {
            return res.status(404).json({success:false, message: "Blog not found"})
        }
        res.status(200).json({success:true, data: blogs});
    }
    catch (error) {
        console.log("Error in getting blog", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

export const postBlogPost = async (req, res) => {
    const blog = req.body;
    if (!blog.title || !blog.contents || !blog.categoryId) {
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }

    const newBlog = new Blog(blog);

    try {
        await newBlog.save();
        res.status(201).json({success:true, data: newBlog});
    } catch (error) {
        console.error(`Error in create blog: ${error.message}`);
        res.status(500).json({success:false, message:"Server Error"});
    }

}

export const deleteBlogPost = async (req, res) => {
    const { id } = req.params;
    try {
        let blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({success:false, message: "Blogs not found"})
        }
        res.status(200).json({success:true, data: blog, message: "Blog deleted"});
    }
    catch (error) {
        console.log("Error in deleting blog", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}


export const deleteAllBlogPosts = async (req, res) => {
   try {
        let blog = await Blog.deleteMany({});
        if (!blog) {
            return res.status(404).json({success:false, message: "No blogs were not found"})
        }
        res.status(200).json({success:true, data: blog, message: "All blogs deleted"});
    }
    catch (error) {
        console.log("Error in deleting blogs", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

export const putBlogPost = async (req, res) => {
    const { id } = req.params;
    const blog = req.body;
    try {
        let updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true});
        if (!updatedBlog) {
            return res.status(404).json({success:false, message: "Blog not found"})
        }
        res.status(200).json({success:true, data: updatedBlog});
    }
    catch (error) {
        console.log("Error in updating blog", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}