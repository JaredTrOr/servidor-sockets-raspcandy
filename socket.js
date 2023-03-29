const UserController = require('./controllers/UserController');
const AdminController = require('./controllers/AdminController');
const PurchaseController = require('./controllers/PurchaseController');

const socket = (io) => {
    io.on('connection', (socket) => {

        //OBJECT DECLARATION
        const userController = new UserController(io);
        const adminController = new AdminController(io);
        const purchaseController = new PurchaseController(io);

        //USERS
        userController.getActiveUsers();
        socket.on('client:getUserById', (id) => userController.getUserById(id));
        socket.on('client:getUserPurchases', (id) => userController.getUserPurchases(id));
        socket.on('client:getUserCandyPurchases', (id) => userController.getUserCandyPurchases(id));
        socket.on('client:createEditUser', (user) => userController.createEditUser(user));
        socket.on('client:deleteUser', (id) => userController.deleteUser(id));

        //ADMINISTRATORS
        adminController.getAdministrators();
        socket.on('client:getAdminById', (id) => adminController.getAdminById(id));
        socket.on('client:createEditAdmin', (admin) => adminController.createEditAdmin(admin));
        socket.on('client:deleteAdmin', (id) => adminController.deleteAdmin(id));

        //PURCHASES
        purchaseController.getPurchases();
    });
}

module.exports = socket;