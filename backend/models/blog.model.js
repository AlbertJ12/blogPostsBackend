import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    },
},{
    timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;