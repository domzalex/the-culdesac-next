import mongoose from "mongoose";

const blogEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const BlogEntry = mongoose.models.blogEntrySchema || mongoose.model("BlogEntry", blogEntrySchema);

export default BlogEntry;