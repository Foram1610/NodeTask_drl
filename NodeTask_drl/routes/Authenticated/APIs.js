const express = require('express');
const CategoryModel = require('../../model/CategoryModel');
const DishModel = require('../../model/DishModel');
const MenuModel = require('../../model/MenuModel');
const router = express.Router()

router.use(express.json());

router.post('/menu', (req, res) => {
    const { name, availability, timeFrom, timeTo } = req.body;
    const menu1 = new MenuModel({
        name: name,
        availability: availability,
        timeFrom: timeFrom,
        timeTo: timeTo
    })
    MenuModel.findOne({ availability: availability }, async(err, menu) => { 
        if (menu) {
            res.status(200).send({ message: 'Menu is not available at day you select!! Kindly Request for select another day!!' })
        }
        else {
            const data = await menu1.save()
            if (data) {
                res.status(200).send({ message: 'Menu Created!!' })
            }
            else {
                res.status(400).send({ message: 'Something went wrong!!' })
            }
        }
    })
})

// router.get('/getMenu', async (req, res) => {
//     const { name } = req.body
//     const data = await MenuModel.find({ name: name });
//     res.send(data)
// })

router.post('/category',async(req,res) => {
    const { name, menu} = req.body;
    const data = await CategoryModel.create({
        name : name,
        menu : menu
    })
    const CatDisplay = await CategoryModel.findOne({_id:data._id})
    .populate('menu','-createdAt -updatedAt -__v')
    res.status(200).send({message : 'Category Created!!', data:CatDisplay})
})

router.post('/dish',async(req,res) => {
    const {name, price,menu,category,isAvailable, allergy} = req.body;
    const data = await DishModel.create({
            name : name,
            price:price,
            menu : menu,
            category : category,
            isAvailable : isAvailable,
            allergy:allergy
    })
    const DishDisplay = await DishModel.findOne({_id:data._id})
    .populate('menu','-createdAt -updatedAt -__v')
    .populate('category', '-createdAt -updatedAt -__v')
    res.status(200).send({message : 'Dish Added!!', data:DishDisplay})
})

router.get('/dishes',async(req,res) => {
    DishModel.estimatedDocumentCount().exec(async (err, totalDish) => {
        if (err) return res.status(400).json(err);
        if (totalDish) {
          const menus = await MenuModel.find();
          return res.status(200).json({
            totalDish: totalDish,
            menus: menus,
          });
        } else {
          return res.status(404).json({
            message: "Menu Not Found",
          });
        }
    })
})
    // await MenuModel.aggregate({$lookup: {
    //     localField : "name timeFrom timeTo",
    //     foreignField : "DishMode", as :"total_dish_count"
    // }})


router.get('/getAll',async(req,res) => {
    const data = await DishModel.find().populate([
        { path: "category",  path: "menu" },
      ]);
    // var data1 = await DishModel.find({})
    // .select('-createdAt -updatedAt -__v')
    // .populate('menu','-_id -createdAt -updatedAt -__v')
    // .populate('category','-_id -createdAt -updatedAt -__v')
    // // .then(async (result) => {
    // //     result = await MenuModel.populate(result,{path:'category.menu',select : 'name'})
    // // })
     res.send({data : data})
})

module.exports = router;
