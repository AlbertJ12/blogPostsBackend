import Category from "../models/category.model.js";

export const getCategories= async (req, res) => {
    try {
        let categories = await Category.find({}); 
        if (!categories) {
            return res.status(404).json({success:false, message: "Categories not found"})
        }
        res.status(200).json({success:true, data: categories});
    }
    catch (error) {
        console.log("Error in getting categories", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}