const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const aboutSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true

    },

    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    }
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("About", aboutSchema);