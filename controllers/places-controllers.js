
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');





exports.getPlaceById = async (req, res, next ) => {
    const placeId = req.params.pid;
   
    let place;
    try {
     place = await Place.findById(placeId);
 } catch (err) {
     const error = new HttpError('Something went wrong, could not find a place.',500);
     return next(error); 
     }
    if(!place) {
       const error = HttpError('Could not find a place for the provided id.',404);
       return next(error);
    //throw error if the function is sync
    // use " next(error)" is the code is async
    }
     res.json({ place: place.toObject( {getters: true }) });
 };




exports.getPlacesByuserId = async (req, res, next) => {
    const userId = req.params.uid;
    
    //let places;
    let userWithPlaces;
    try {
     userWithPlaces = await User.findById(userId).populate('places');
 } catch (err) {
     const error = new HttpError('Fetching places failed, please try again later',500);
     return next(error);
 }
    if(!userWithPlaces || userWithPlaces.places.length === 0) {
       return next(new HttpError('Could not find a places for the provided id.',404));
    }
 
    res.json({places: userWithPlaces.places.map(place => place.toObject({ getters: true }))});
 };


exports.createPlace = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
const {title, description, address, creator} = req.body;
// const title = req.body.title;
const createdPlace = new Place({
    title,
    description,
    image:'https://lh3.googleusercontent.com/proxy/JDsepNgw2MY-DAOWCbvGPH-mRueHk_y5ymcGtTsjbamXtxQVVGARWGaXF90lgUMMRtsvohGNABFqMsMYvtSRXOBEHVr83MGiVXDzR5-mT7hBalDWO0x75RYuzFSJHGQ9XiBwxzQ',
    address,
    creator
});

let user;

try {
    user = await User.findById(creator);
} catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
}

if(!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next (error);
}

console.log(user);

try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
} catch (err) {
    const error = new HttpError('Creating Place Failed, please try again.', 500);
    return next(error);
}

res.status(201).json({place: createdPlace});
};



exports.updatePlaces = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const {title, description} = req.body;
    const placeId = req.params.pid;

    let place
   try {
       place = await Place.findById(placeId)

   } catch (err) {
            const error = new HttpError('Something went wrong, could not update place.', 500);
            return next(error);
   }

    place.title = title;
    place.description = description;

    try { 
        await place.save();
    } catch (err) { 
        const error = new HttpError('Something went wrong, could not update place', 500);
        return next(error);
    }

    res.status(200).json({place: place.toObject({ getters: true })});
    
};





exports.deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
   
    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete place.', 500);
        return next(error);
    }

   if (!place) {
       const error = new HttpError('Could not find place for this id', 404);
       return next(error);
   }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Something went wrong, Could not delete place.', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted place.'});
};



 // function getPlaceById() { ... }
 // const getPlaceById = function() { ... }