const categoryModel = require("../model/category.model");



// Create a new category
const createCategories = async (req, res) => {
  const { name } = req.body;
  const category = {
    name: name,
    isActive: 1,
  };

  try {
    const createdCategory = await categoryModel.create(category)

    res.status(200).json({
        status: true,
        message: "Category created successfully",
        data: createdCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all categories


const getCategories = async (req, res) => {
    try{
        
        const categories = await categoryModel.find({ isActive: 1 });
        res.status(200).json({
            status: true,
            message: "Categories fetched successfully",
            data: categories,
        });

    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}

// Get category by id

const getCategoryById = async (req, res) => {
    try{
        const { id } = req.params;

        const catgory = await categoryModel.findOne({_id: id, isActive:1});
        if(!catgory) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            status: true,
            message: "Category fetched successfully",
            data: catgory,
        })

    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}


// update category by id

const updateCategoryById = async (req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;

        const updatedCategory = await categoryModel.findOneAndUpdate(
            { _id: id, isActive: 1 },
            { $set: { name: name } },
            { new: true }
        )

        if(!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            status: true,
            message: "Category updated successfully",
            data: updatedCategory,
        });

    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = { createCategories, getCategories, getCategoryById, updateCategoryById };
