const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
 
  try { 
    let categoryData = await Category.findAll({
    include: {
      model: Product,
      attributes: ['id','product_name','price','stock']
    }
  });
  res.status(200).json(categoryData)
} catch (err) {
  res.status(500).json(err)
}

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
   try {
    let categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id','product_name','price','stock']
      }
    });
    res.status(200).json(categoryData)
} catch (err) {
  res.status(500).json(err)
}
  
});

router.post('/', async (req, res) => {
  // create a new category
try {
  let createNewCategoryData = await Category.create(req.body);
  res.status(200).json(createNewCategoryData);
} catch (err) {
  res.status(400).json(err)
}
});

router.put('/:id',  async (req, res) => {
  // update a category by its `id` value
  try {
    let updateCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(updateCategoryData)
} catch (err) {
  res.status(500).json(err)
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    let deleteCategory = await Category.destory({
      where: {
        id: req.params.id
      }
    })
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this id!'})
      return;
    }
    res.status(200).json(deleteCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
