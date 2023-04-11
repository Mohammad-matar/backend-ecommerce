const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const contactSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    image: String
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("About", contactSchema);