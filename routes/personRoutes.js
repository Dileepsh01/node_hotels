const express = require('express')
const router = express.Router();
const Person = require('./../models/person');



// POST /person — Insert person into DB
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /person — Fetch all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched", data);
        res.status(200).json(data);
    } catch (err) {
        console.error("Data not fetched from database", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



// TODO: You can add parameterized routes like GET /person/:id, DELETE, PUT etc.

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'owner' || workType == "manager") {
            const response = await Person.find({ work: workType });

            console.log(' specific  data fethced');
            res.status(200).json(response);

        }
        else {
            console.log(' specific data not fetched ');
            res.status(404).json({ error: 'invalid work type' })

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }

})
router.delete('/:id', async (req, res) => {
  try {
    const personid = req.params.id;

    const response = await Person.findByIdAndDelete(personid);
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log("Data deleted");
    res.status(200).json({ message: 'Person deleted successfully', data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const personid = req.params.id;
    const updatepersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personid,
      updatepersonData,
      {
        new: true,               // Return the updated document
        runValidators: true      // ✅ Fixed: "runvalidation" → "runValidators"
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



module.exports = router;