const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Place = require('../models/place');

// ROUTE 1: Get All the Notes using: Get "/api/notes/fetchallnotes". Login required
router.get('/fetchallplaces', fetchuser, async (req, res) => {
    try {
        const places = await Place.find({ user: req.user.id });
        res.json(places);
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note: POST "/api/notes/addnote". Login required
router.post('/addplace', fetchuser, [
    body('place', 'Enter a valid title').isLength({ min: 1 }),
], async (req, res) => {
    try {

        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { place } = req.body;


        const note = new Place({
            place, user: req.user.id
        })


        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteplace/:id', fetchuser, async (req, res) => {
    try {

        // Find the note to be deleted and delete it
        let place1 = await Place.findById(req.params.id);
      
        if (!place1) { return res.status(404).send("Not found") };

        // console.log(place.user.toString());
        // console.log(req.user.id);


        if (place1.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        

        // note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        place1 = await Place.findByIdAndDelete(place1.id);

        res.json({ "Success": "Note has been deleted", place: place1 });

    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router