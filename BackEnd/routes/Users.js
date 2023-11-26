const { Users } = require('../models/Users');
const express = require('express');
const router = express.Router();
require('dotenv/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// get user info by id
router.get('/user/:id', async (req, res) => {
  const User = await Users.findById(req.params.id);

  if (!User) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  res.json({ success: true, data: User });

})


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key');

    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      theme: user.theme,
      language: user.language,
      dob: user.dob,
      number: user.number,
      role: user.role,
    };


    res.json({ token, user: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/user/checkemail', async (req, res) => {

  const { email } = req.body;
  console.log(email);

  try {

    const user = await Users.findOne({ email: email });
    if (user) {
      return res.status(200).json({ message: 'email already registered' });
    }

    res.status(200).json({ message: 'email is available' });
  } catch (error) {
    console.error("err", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/user/register', async (req, res) => {
  hashedPassword = await bcrypt.hash(req.body.password, 10);

  console.log(req.body);

  try {
    let newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      dob: req.body.dob,
      theme: req.body.theme,
      language: req.body.language,
      number: req.body.number,
    });

    console.log(newUser);

    newUser = await newUser.save();

    if (!newUser) {
      return res.status(400).send('New user cannot be added!');
    }

    res.send(newUser);
  } catch (error) {
    res.status(500).send('Error adding user ' + error);
    console.log(error);
  }
});

//add bookmark a post into user saved array by id
router.post('/addbookmark/:id', async (req, res) => {
  CardId = req.body.CardId;

  console.log(CardId);
  console.log(req.params.id);

  Users.findByIdAndUpdate(req.params.id,
    { $push: { saved: CardId } },
    { new: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding bookmark."
      });
    });
});

//remove bookmark a post from user saved array by id
router.post('/removebookmark/:id', async (req, res) => {

  CardId = req.body.CardId;
  Users.findByIdAndUpdate(req.params.id,

    { $pull: { saved: CardId } },
    { new: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing bookmark."
      });
    });
});

//get saved posts by user id
router.get('/saved/:id', async (req, res) => {
  const User = await Users.findById(req.params.id);

  if (!User) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  res.json({ success: true, data: User.saved });

})

// Update a user's notes by user ID
// Update a user's notes by user ID
router.put('/note', async (req, res) => {
  try {
    const userId = req.body.user;
    const newNoteContent = req.body.note;

    // Check if userId is provided and valid
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    // Check if newNoteContent is provided and valid
    if (!newNoteContent || typeof newNoteContent !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid note content.' });
    }

    const user = await Users.findByIdAndUpdate(
      userId,
      {
        $push: { notes: { content: newNoteContent } },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, data: user.notes });
  } catch (error) {
    console.error('Error updating user notes:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


// Get notes by user ID
router.get('/note/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, data: user.notes });
  } catch (error) {
    console.error('Error fetching user notes:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Delete a user's note by user ID and note ID
router.delete('/note/:userId/:noteId', async (req, res) => {

  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;


    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    if (!noteId) {
      return res.status(400).json({ success: false, message: 'Note ID is required.' });
    }

    const user = await Users.findByIdAndUpdate(

      userId,
      {
        $pull: { notes: { _id: noteId } },
      },
      { new: true }

    );

    if (!user) {

      return res.status(404).json({ success: false, message: 'User not found.' });

    }

    res.json({ success: true, data: user.notes });

  } catch (error) {

    console.error('Error deleting user note:', error);

    res.status(500).json({ success: false, message: 'Internal server error.' });

  }

});


// edit note by user ID and note ID
router.put('/editnote', async (req, res) => {

  try {
    const userId = req.body.user;
    const noteId = req.body.noteid;
    const newNoteContent = req.body.note;

    // Check if userId is provided and valid
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    // Check if newNoteContent is provided and valid
    if (!newNoteContent || typeof newNoteContent !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid note content.' });
    }

    if (!noteId) {
      return res.status(400).json({ success: false, message: 'Note ID is required.' });

    }

    const user = await Users.findOneAndUpdate(
      { _id: userId, 'notes._id': noteId },
      { $set: { 'notes.$.content': newNoteContent } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, data: user.notes });
  } catch (error) {
    console.error('Error updating user notes:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});





// // Get all users 
// router.get(`/token/`, async (req, res) => {

//     const UserList = await Users.find().sort({ $natural: -1 });

//     if (!UserList) {
//         res.status(500).json({ success: false })
//     }
//     res.send(UserList);
// })


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
router.put('/user/edit/:id', async (req, res) => {

  const User = await Users.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      theme: req.body.theme,
      number: req.body.number,
      language: req.body.language,
    },
    { new: true }
  )

  if (!User)
    return res.status(400).send('User cannot be edit!')

  res.send(User);
})


// //delete the post
// router.delete('/token/:id', (req, res) => {

//     Users.findByIdAndRemove(req.params.id).then(user => {
//         if (user) {
//             return res.status(200).json({ success: true, message: 'user deleted!' })
//         } else {
//             return res.status(404).json({ success: false, message: "user not found!" })
//         }
//     }).catch(err => {
//         return res.status(500).json({ success: false, error: err })
//     })
// })


module.exports = router;
