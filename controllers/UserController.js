const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Candy = require('../models/Candy');
const bcrypt = require('bcrypt');
const {isUserCreated} = require('../auth/isCreated');

class UserController {

    constructor(io) {
        this.io = io;
    }

    async getActiveUsers() {
        try {
            const users = await User.find();
            this.io.emit('server:getActiveUsers', users);
        } catch (err) {
            console.log(`ERROR: ${err}`);
        }
    }

    async getUnactiveUsers() {
        try {
            const users = await User.find({status: false});
            this.io.emit('server:getUnactiveUsers', users);
        } catch (err) {
            console.log(`ERROR: ${err}`);
        }
    }

    async getUserPurchases(id) {
        try{
            const userPurchases = await Purchase.find({userId: id});
            this.io.emit('server:getUserPurchases', userPurchases);
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    }

    async getUserCandyPurchases (id) {
        const arrayOfAmountsOfCandy = [];
        try{
            //Get the total amount of purchases of the user
            const total = await Purchase.countDocuments({userId: id});
    
            //Get the amount per candy
            const candies =  await Candy.find(); 
            for(const candy of candies){
                const smallSize = await Purchase.countDocuments({$and: [{userId: id}, {candyName: candy.name}, {size: 'Chico'}]});
                const mediumSize = await Purchase.countDocuments({$and: [{userId: id}, {candyName: candy.name}, {size: 'Mediano'}]});
                const bigSize = await Purchase.countDocuments({$and: [{userId: id}, {candyName: candy.name}, {size: 'Grande'}]});
                arrayOfAmountsOfCandy.push(
                    {
                        typeOfCandy: candy.name,
                        small: smallSize,
                        medium: mediumSize,
                        big: bigSize
                    }
                );
            }
            
            this.io.emit('server:getUserCandyPurchases', {totalAmount: total, candyPurchases: arrayOfAmountsOfCandy});
            console.log({totalAmount: total, candyPurchases: arrayOfAmountsOfCandy})
        }catch(err){    
            console.log(`ERROR: ${err}`);
        }
    }

    async getUserById(id) {
        try{
            const user = await User.findById(id);
            this.io.emit('server:getUserById', user);
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    }

    async createEditUser(user) {

        if (user.id) {
            await User.findByIdAndUpdate(user.id, user);
            this.io.emit('server:createEditUser', { success: true, msg: 'User edited succesfully' });
            this.getActiveUsers(); //Check this line
            console.log('User edited');
        }
        else {
            
            if (await isUserCreated(user)) {
                this.io.emit('server:createEditUser', { success: false, msg: 'User already exists' });
                console.log('User already exists');
            }
            else {
                const {name, username, password, email} = user;
                const encryptedPassword = await bcrypt.hash(password, 10);

                await new User({name,username, password: encryptedPassword, email}).save();
                this.io.emit('server:createEditUser', { success: true, msg: 'User created succesfully' });
                this.getActiveUsers(); //Check this line
                console.log('User created');
            }
        }
        
    }

    async deleteUser(id) {
        try{
            await User.deleteOne({_id: id})
            this.io.emit('server:deleteUser', 'User removed');
            this.getActiveUsers();
        }catch(err){
            console.log(`ERROR: ${err}`);
        }    
    }


}

module.exports = UserController;


