const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
mongoose.connect(process.env.LINKMONGODB)
.then(() => {
    console.log('Connection succesfully');
})
.catch((err) => {
    console.log(`ERROR: ${err}`);
});