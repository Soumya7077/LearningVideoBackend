const subcategoryModel = require("../model/subcategory.model");



const getAllSubcategories = async (req, res) => {
    try{

        const subcategories = await subcategoryModel.find({ isActive: 1 });

        res.status(200).json({
            status: true,
            message: "Subcategories fetched successfully",
            data: subcategories,
        });

    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}

// Create a new sub category
const createSubcategories = async (req, res) => {
  const { categoryId, name } = req.body;
  const subcategory = {
    categoryId: categoryId,
    subcategoryName: name,
    isActive: 1,
  };
  try {
    const createdSubcategory = await subcategoryModel.create(subcategory)

    res.status(200).json({
        status: true,
        message: "Subcategory created successfully",
        data: createdSubcategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all sub categories


const getSubcategories = async (req, res) => {
    try{

        const subcategories = await subcategoryModel.find({ isActive: 1 });
        res.status(200).json({
            status: true,
            message: "Subcategories fetched successfully",
            data: subcategories,
        });

    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}

// Get sub category by id

const getSubcategoryById = async (req, res) => {
    try{
        const { id } = req.params;

        const subcategory = await subcategoryModel.findOne({_id: id, isActive:1});
        if(!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        return res.status(200).json({
            status: true,
            message: "Subcategory fetched successfully",
            data: subcategory,
        })

    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}


// update category by id

const updateSubcategoryById = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, categoryId } = req.body;

        const updatedSubcategory = await subcategoryModel.findOneAndUpdate(
            { _id: id, isActive: 1 },
            { $set: { subcategoryName: name, categoryId: categoryId } },
            { new: true }
        )

        if(!updatedSubcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        return res.status(200).json({
            status: true,
            message: "Subcategory updated successfully",
            data: updatedSubcategory,
        });

    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const getSubcategoryByCategoryId = async(req, res) => {
    try{
        const { categoryId } = req.params;
        const subcategories = await subcategoryModel.find({ categoryId: categoryId, isActive: 1 });
        if(!subcategories) {
            return res.status(404).json({ message: "Subcategories not found" });
        }
        return res.status(200).json({
            status: true,
            message: "Subcategories fetched successfully",
            data: subcategories,
        });
    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = { getSubcategoryByCategoryId, getAllSubcategories, createSubcategories, getSubcategories, getSubcategoryById, updateSubcategoryById };
