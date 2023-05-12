const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
  })

const commentsSchema = mongoose.Schema({
    photoUrl: String,
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId },
    comment: String
  })

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    description: String,
    favorites: [favoritesSchema],
    comments: [commentsSchema],
    location: String,
    latitude: Number,
    longitude: Number,
    postDate: {type: Date, default: Date.now}
})


// postSchema.pre('save', async function (next) {
//   if (this.isModified('location') || this.isNew) {
//     try {
//       const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.location)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
//       const { results } = res.data;

//       if (results.length) {
//         const { lat, lng } = results[0].geometry.location;
//         this.latitude = lat;
//         this.longitude = lng;
//       } else {
//         throw new Error('No results found');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   next();
// });


module.exports = mongoose.model('Post', postSchema);


