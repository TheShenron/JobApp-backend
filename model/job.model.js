const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    compnayname:{
        type: String,
        required: true,
        lowercase: true
    },
    position: {
        type: String,
        required: true,
        lowercase: true
    },
    contract: {
        type: String,
        required: true,
        lowercase: true
    },
    location: {
        type: String,
        required: true,
        lowercase: true
    }

},

    { timestamps: true }

)


const jobModel = mongoose.model('job', jobSchema)

module.exports = jobModel