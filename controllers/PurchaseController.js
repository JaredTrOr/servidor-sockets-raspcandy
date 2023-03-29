const Purchase = require('../models/Purchase');

class PurchaseController {

    constructor(io) {
        this.io = io;
    }

    async getPurchases () {
        try{    
            const purchases = await Purchase.find();
            this.io.emit('server:getPurchases', purchases);
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    }


}

module.exports = PurchaseController;