// controllers/academicsController.js

const Academic = require('../models/Student');

exports.getAcademicsById = async (req, res) => {

        const academicDetails = await Academic.find({ menteeId: req.params.menteeid })
        .then(details => res.json(details))
            .catch(err=>res.json(err));
            
            

};
