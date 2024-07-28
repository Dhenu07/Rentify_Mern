const ItemModel=require('../model/HouseModel')
const OrderModel=require('../model/orderModel')
const UserModel=require('../model/userModel')
const ReviewModel=require('../model/reviewModel')
const jwt= require('jsonwebtoken');
const SellerController={
    async store(req,res){
        try {
            const { category, name, price, available,bathroom,ageOfProperty, amenities, furnished, area } = req.body;
            const images = req.files.map((file) => file.originalname);
            const newItem = new ItemModel({category:JSON.parse(category),name,price,available:JSON.parse(available),bathroom:JSON.parse(bathroom),ageOfProperty: JSON.parse(ageOfProperty),amenities: JSON.parse(amenities),furnished,area,images,});
            await newItem.save();
            res.status(201).json({ message: 'Item created successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async totalRevenue(req,res){
        try {
            const totalPriceOfOrders = await OrderModel.aggregate([{ $group: { _id: null, totalPrice: { $sum: { $toDouble: "$price" } } } }]);
            res.json(totalPriceOfOrders[0].totalPrice);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async totalUsers(req,res){
        try {
            const role = req.query.role; 
            const count = await UserModel.countDocuments({ role: role }); 
            res.json(count);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async totalDealers(req,res){
        try {
            const role = req.query.role; 
            const count = await UserModel.countDocuments({ role: role }); 
            res.json(count);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async totalHouses(req, res) {
        try {
            const itemCount = await ItemModel.countDocuments();
            res.json(itemCount);
        } catch (error) {
            console.error('Error retrieving total houses:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    },


    async fetchReviews(req,res){
        try {
            const reviews = await ReviewModel.find();
            res.json(reviews);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async products(req,res){
        try {
            const { id } = req.params;
            const product = await ItemModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async fetchHouses(req,res){
        try {
            const distinctStockTypes = await ItemModel.distinct('type');
            res.json(distinctStockTypes);
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async items(req,res){
        try {
            const items = await ItemModel.find();
            res.json(items);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async deleteHouses(req,res){
        const { id } = req.params;
        try {
            const item = await ItemModel.findById(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            await ItemModel.findByIdAndDelete(id);
            return res.json({ message: 'Item deleted successfully' });
        } catch (error) {
            console.error('Error deleting item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    async updatedHouse(req,res){
        try {
        const { id } = req.params;
            const updatedItem = await ItemModel.findByIdAndUpdate(id, req.body, { new: true });
            res.json(updatedItem);
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).json({ error: 'Error updating item' });
        }
    },
}

module.exports =SellerController