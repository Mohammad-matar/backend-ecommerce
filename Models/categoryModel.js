const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({

    type: {
        type: String,
        required: [true, "Please enter the category"],
        minLength: 3,
        trim: true
    },
    description: {
        type: String,
        minLength: 3,
        trim: true
    },

},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Category", categorySchema);