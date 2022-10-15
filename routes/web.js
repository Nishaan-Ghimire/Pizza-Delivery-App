const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customer/cartController');
const orderController = require('../app/http/controllers/customer/orderController');
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');
const AdminorderController = require('../app/http/controllers/admin/orderController');

function initRoutes(app)
{
    // Routing
    app.get('/',homeController().index);    
    app.get('/login',guest,authController().login);
    app.post('/login',authController().postLogin);
    app.get('/register',guest,authController().register);    
    app.post('/register',authController().postRegister);    
    app.post('/logout',authController().logout);    
    app.get('/cart',cartController().index);
    app.post('/update-cart',cartController().update);
    app.post('/orders',auth,orderController().store);
    app.get('/customer/orders',auth,orderController().index);
    app.get('/admin/orders',admin,AdminorderController().index);
    
  
}

module.exports = initRoutes;