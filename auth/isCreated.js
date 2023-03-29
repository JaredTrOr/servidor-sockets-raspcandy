const User = require('../models/User');
const Admin = require('../models/Admin');

async function isUserCreated(user) {
    const userWithSameUsername = await User.findOne({username: user.username});
    return userWithSameUsername ? true : false;
}

async function isAdminCreated(admin) {
    const adminWithSameUsername = await Admin.findOne({username: admin.username});
    return adminWithSameUsername ? true : false;
}
module.exports = {isUserCreated, isAdminCreated};