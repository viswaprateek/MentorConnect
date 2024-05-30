const mongoose = require('mongoose');

const MeetingSchema=new mongoose.Schema(
    {
        UserId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentee' 
        },
        mentor: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Mentor' 
        },
        date: {
            type: Date ,
            required: true
        },
        time: {
            type: String,
            required: true
          },
          venue: {
            type: String,
            required: true
          },
          MOM: {
            type: String,
            required: true
          },
          duration: {
            type: String,
            required: true
          },
          Remarks: {
            type: String,
            required: true
          }
    }
)
module.exports = mongoose.model('Meeting', MeetingSchema);