const ItemModel=require('../model/HouseModel')
const OrderModel=require('../model/orderModel')
const UserModel=require('../model/userModel')
const ReviewModel=require('../model/reviewModel')
const CartModel=require('../model/cartModel')
const WishListModel=require('../model/wishListModel')
const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const UserController={
    async items(req,res){
        const { location } = req.params;
        try {
            const items = await ItemModel.find({ area: location });
            res.json(items);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async addToCart(req,res){
        try {
            const { userEmail, productId } = req.body;
            // console.log(userEmail);
            if (!userEmail || !productId) {
                return res.status(400).json({ message: 'User email and product ID are required' });
            }
            const existingCartItem = await CartModel.findOne({ userEmail, productId });
            if (existingCartItem) {
                return res.status(400).json({ message: 'Item already exists in the cart' });
            }
            const newCartItem = new CartModel({
                userEmail: userEmail,
                productId: productId
            });
            await newCartItem.save();
            return res.status(200).json({ message: 'Item added to cart successfully' });
        } catch (error) {
            console.error('Error adding item to cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    async wishlist(req,res){
        try {
            const { userEmail, productId } = req.body;
            if (!userEmail || !productId) {
                return res.status(400).json({ message: 'User email and product ID are required' });
            }
            const existingWishListItem = await WishListModel.findOne({ userEmail, productId });
            if (existingWishListItem) {
                return res.status(400).json({ message: 'Item already exists in the wishlist' });
            }
            const newWishListItem = new WishListModel({
                userEmail: userEmail,
                productId: productId
            });
            await newWishListItem.save();
            return res.status(200).json({ message: 'Item added to wishlist successfully' });
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    async products(req,res){
        try {
            const { itemId } = req.params;
            console.log(itemId);
            if (!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }
            const product = await ItemModel.findById(itemId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async reviews(req,res){
        try {
            const productId = req.params.id;
            const reviews = await ReviewModel.find({ productId });
            res.status(200).json(reviews);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async addReview(req,res){
        try {
            const { productId, review, userEmail } = req.body;
            const user = await UserModel.findOne({ email: userEmail });
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            const newReview = new ReviewModel({
                productId,
                review,
                userEmail,
                username: user.username,
            });
            await newReview.save();
            res.status(200).json({ message: 'Review added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async userWishlist(req,res){
        const { email } = req.params;
        try {
            const items = await WishListModel.find({ userEmail: email });
            res.json(items);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async delWishlist(req,res){
        const { productId,userEmail } = req.params;
        try {
            const existingWishListItem = await WishListModel.findOne({ userEmail, productId });
            if (!existingWishListItem) {
                return res.status(404).json({ message: 'Product not found in wishlist' });
            }
            await WishListModel.findOneAndDelete({ userEmail, productId });
            res.status(200).json({ message: 'Product removed from wishlist successfully' });
        } 
        catch (error) {
            console.error('Error removing product from wishlist:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async userCart(req,res){
        const { email } = req.params;
        try {
            const items = await CartModel.find({ userEmail: email });
            // console.log(items);
            res.json(items);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async delCart(req,res){
        const { productId,userEmail } = req.params;
        try {
            const existingCartItem = await CartModel.findOne({ userEmail, productId });
            if (!existingCartItem) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }
            await CartModel.findOneAndDelete({ userEmail, productId });
            res.status(200).json({ message: 'Product removed from cart successfully' });
        } 
        catch (error) {
            console.error('Error removing product from cart:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async order(req,res){
        try {
            const newOrder = await OrderModel.create(req.body);
            res.status(201).json(newOrder);
        } 
        catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async userEmail(req,res){
        try{
            const { _id } = req.params;
            const user = await UserModel.findById(_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ email: user.email,name: user.firstName });
        }
        catch(error){
            console.error("Error fetching user:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async user(req,res){
        try {   
            const { email } = req.params;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ username: user.username, mobile: user.mobile });
        } catch(error) {  
            console.error("Error fetching user:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async orderHistory(req,res){
        try{
            const {email}=req.params;
            const orders=await OrderModel.find({email:email});
            res.json(orders);
        }
        catch(error){
            console.log("Error fetching orders",error);
            res.status(500).json({error:'Internal server error'});
        }
    },

}

module.exports = UserController