const { isAdminCreated } = require('../auth/isCreated');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

class AdminController {
    constructor(io) {
        this.io = io;
    }   

    async getAdministrators() {
        try {
            const admins = await Admin.find();
            this.io.emit('server:getAdmins', admins);
        } catch (err) {
            console.log(`ERROR: ${err}`);
        }
    }

    async getAdminById(id) {
        try{
            const admin = await Admin.findById(id);
            this.io.emit('server:getAdminById', admin);
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    }

    async createEditAdmin(admin) {
        if (admin.id) {
            await Admin.findByIdAndUpdate(admin.id, admin);
            this.io.emit('server:createEditAdmin', { success: true, msg: 'Admin edited succesfully' });
            this.getAdministrators(); //Check this line
            console.log('Admin edited');
        }
        else {
            if (await isAdminCreated(admin)) {
                this.io.emit('server:createEditAdmin', { success: false, msg: 'User already exists' });
                console.log('Admin already exists');
            }
            else {
                const {name, email, username, password, address} = admin;
                const encryptedPassword = await bcrypt.hash(password, 10);

                await new Admin({name,email, username, password: encryptedPassword, address}).save();
                this.io.emit('server:createEditAdmin', { success: true, msg: 'User created succesfully' });
                this.getAdministrators(); //Check this line
                console.log('Admin created');
            }
        }
    }

    async deleteAdmin(id) {
        try{
            await Admin.deleteOne({_id: id})
            this.io.emit('server:deleteAdmin', 'Admin removed');
            this.getAdministrators();
        }catch(err){
            console.log(`ERROR: ${err}`);
        } 
    }
}

module.exports = AdminController;
