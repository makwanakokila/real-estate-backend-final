// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema({
//     companyName: String,
//     description: String,
//     details: {
//         overview: String,
//         projectsCount: Number,
//         ongoingCount: Number,
//         rating: Number
//     },
//     establishedYear: Number,
//     imageUrl: String,
//     status: {
//         type: String,
//         enum: ["under construction", "launching soon", "pre-launch","new","Resale"],
//         default: "under construction"
//     },
//     location: {
//         type: String,
//         required: true,
//         lowercase: true,
//         trim: true,
//         enum: [
//             'satellite', 'bopal', 'sg highway', 'thaltej', 'navrangpura', 'vastrapur',
//             'prahladnagar', 'gota', 'chandkheda', 'vasna', 'maninagar', 'paldi',
//             'naranpura', 'sabarmati', 'ranip', 'isanpur', 'memnagar', 'shahibaug'
//         ]
//     },
//     properties: String,
//     brochureUrl: String,
//     // Fields added from PropertySchema
//     priceRange: {
//         min: { type: Number, min: 1, max: 100000000, required: true },
//         max: { type: Number, min: 1, max: 100000000, required: true }
//     },
//     superArea: {
//         min: { type: Number, min: 1, max: 100000000 },
//         max: { type: Number, min: 1, max: 100000000 }
//     },
//     carpetArea: {
//         min: { type: Number, min: 1, max: 100000000 },
//         max: { type: Number, min: 1, max: 100000000 }
//     },
//     propertyType: {
//         type: String,
//         enum: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa', 'Bungalow', 'Duplex'],
//         required: true
//     },
//     floorsRequired: {
//         type: String,
//         enum: ['All Floors', 'G+1', 'G+2', 'G+3', 'G+4+'],
//         default: 'All Floors'
//     },
//     projectTimeline: {
//         type: String,
//         enum: ['Any Timeline', 'Ready to Move', 'Just Started', 'Under Construction', 'Launching Soon'],
//         default: 'Any Timeline'
//     },
//     suggestion: { type: String, trim: true },
//     screenshots: { type: [String], default: [] },
//     createdAt: { type: Date, default: Date.now }
// });

// const projectModel = mongoose.model("Projects", projectSchema);

// module.exports = projectModel;



const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    companyName: String,
    description: String,     ////
    details: {
        overview: String,
        projectsCount: Number,
        ongoingCount: Number,
        rating: Number
    },
    establishedYear: Number,
    imageUrl: String,
    status: {
        type: String,
        enum: ["under construction", "launching soon", "pre-launch", "new", "Resale"],
        default: "under construction"
    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: [
            'satellite', 'bopal', 'sg highway', 'thaltej', 'navrangpura', 'vastrapur',
            'prahladnagar', 'gota', 'chandkheda', 'vasna', 'maninagar', 'paldi',
            'naranpura', 'sabarmati', 'ranip', 'isanpur', 'memnagar', 'shahibaug'
        ]
    },
    properties: String,
    brochureUrl: String,
    // Fields added from PropertySchema
    priceRange: {
        min: { type: Number, min: 1, max: 100000000, required: true },
        max: { type: Number, min: 1, max: 100000000, required: true }
    },
    superArea: {
        min: { type: Number, min: 1, max: 100000000 },
        max: { type: Number, min: 1, max: 100000000 }
    },
    carpetArea: {
        min: { type: Number, min: 1, max: 100000000 },
        max: { type: Number, min: 1, max: 100000000 }
    },
    propertyType: {
        type: String,
        enum: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa', 'Bungalow', 'Duplex'],
        required: true
    },
    floorsRequired: {
        type: String,
        enum: ['All Floors', 'G+1', 'G+2', 'G+3', 'G+4+'],
        default: 'All Floors'
    },
    projectTimeline: {
        type: String,
        enum: ['Any Timeline', 'Ready to Move', 'Just Started', 'Under Construction', 'Launching Soon'],
        default: 'Any Timeline'
    },
    suggestion: { type: String, trim: true },
    screenshots: { type: [String], default: [] },
    // New fields added
    projectCategory: {
        type: String,
        enum: ['Residential', 'Commercial'],
        required: true
    },
    amenities: {
        parking: { type: Boolean, default: false },
        garden: { type: Boolean, default: false },
        swimmingPool: { type: Boolean, default: false }
    },
    createdAt: { type: Date, default: Date.now }
});

const projectModel = mongoose.model("Projects", projectSchema);

module.exports = projectModel;
