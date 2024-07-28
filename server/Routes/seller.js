const express=require('express')
const router=express.Router();
const SellerController = require('../Controller/SellerController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
router.post('/store', upload.array('images', 5), SellerController.store);
router.get('/totalRevenue', SellerController.totalRevenue);
router.get('/totalUsers', SellerController.totalUsers);
router.get('/totalDealers', SellerController.totalDealers);
router.get('/totalHouses', SellerController.totalHouses);
router.get('/fetchReviews', SellerController.fetchReviews);
router.get('/products/:id', SellerController.products);
router.get('/fetchHouses', SellerController.fetchHouses);
router.get('/items', SellerController.items);
router.delete('/items/:id', SellerController.deleteHouses);
router.put('/items/:id', SellerController.updatedHouse);
// router.get('/dashboard',AdminController.verifyUser);
module.exports = router;
