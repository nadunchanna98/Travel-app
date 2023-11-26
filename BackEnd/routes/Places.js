const { Places } = require('../models/Places');
const express = require('express');
const router = express.Router();
require('dotenv/config');

router.get('/place/:id', async (req, res) => {
    const item = await Places.findById(req.params.id);

    if (!item) {
        return res.status(404).json({ success: false, message: 'item not found.' });
    }

    res.json({ success: true, data: item });

})


//check topic is exist or not
router.post('/place/checkplace', async (req, res) => {

    const { place } = req.body;

    try {

      const item = await Places.findOne({ place: place });
      if (item) {
        return res.status(200).json({ message: ' already Added' });
      }
  
      res.status(200).json({ message: 'title is available' });
    } catch (error) {
      console.error("err",error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post('/place/add', async (req, res) => {

    try {
      let newItem = new Places({
        place: req.body.place,
        location: req.body.location,
        district: req.body.district,
        description: req.body.description,
        image: req.body.image,
        important: req.body.important,
        veryimportant: req.body.veryimportant,
        recommondation: req.body.recommondation,
      });
  
      newItem = await newItem.save();
  
      if (!newItem) {
        return res.status(400).send('cannot be added!');
      }
  
      res.send(newItem);
    } catch (error) {
      res.status(500).send('Error adding user ' + error);
      console.log(error);
    }
  });

// Get all diesese
router.get('/', async (req, res) => {

    const DiseaseList = await Places.find().sort({ $natural: -1 });

    if (!DiseaseList) {
        res.status(500).json({ success: false })
    }
    res.send(DiseaseList);
})


// //check token is exist or not
// router.get(`/token/:token`, async (req, res) => {
//     const User = await Users.findOne({ token: req.params.token });

//     if (!User) {
//         return res.status(404).json({ success: false, message: 'Token not found.' });
//     }
//     res.json({ success: true, data: User });

// })

// //get by token
// router.get(`/user/:token`, async (req, res) => {
//     const User = await Users.findOne({ token: req.params.token });

//     if (!User) {
//         return res.status(404).json({ success: false, message: 'Token not found.' });
//     }
//     res.json({ success: true, data: User });

// })

// //add  
// router.post('/user/', async (req, res) => {
//     const token = req.body.token;
//     const theme = req.body.theme;

//     const user = await Users.findOne({ token });

//     if (user) {
//         return res.status(400).send('User token already exists!');
//     }

//     let newUser = new Users({ token , theme });

//     newUser = await newUser.save();

//     if (!newUser) {
//         return res.status(400).send('User token cannot be added!');
//     }

//     res.send(newUser);
// });


// //change by token
// router.put('/user/:token', async (req, res) => {

//     const User = await Users.findOneAndUpdate(
//         { token: req.params.token },
//         {
//             theme: req.body.theme,
//         },
//         { new: true }  // to get the updated data
//     )

//     if (!User)
//         return res.status(400).send('User cannot be edit!')

//     res.send(User);
//     console.log(User);
// })



//update the user
router.put('/place/edit/:id', async (req, res) => {

    const item = await Places.findByIdAndUpdate(
        req.params.id,
        {
            place: req.body.place,
            location: req.body.location,
            district: req.body.district,
            description: req.body.description,
            image: req.body.image,
            important: req.body.important,
            veryimportant: req.body.veryimportant,
            recommondation: req.body.recommondation,
        },
        { new: true }  
    )

    if (!item)
        return res.status(400).send('cannot be edit!')

    res.send(item);
})


//delete the post
router.delete('/place/:id', (req, res) => {

  Places.findByIdAndRemove(req.params.id).then(item => {
        if (item) {
            return res.status(200).json({ success: true, message: 'deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})


module.exports = router;
