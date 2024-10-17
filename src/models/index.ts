
import Otp from "./otp";
import User from "./user"


// // Vendor
// Vendor.hasMany(Product);
// Vendor.hasMany(Order);
// Vendor.hasOne(VendorWallet)
// Buyer.hasMany(Order)
// Buyer.hasMany(Address)
// Buyer.hasMany(Review)
// Buyer.hasOne(WishList)

// // Product
// Product.belongsTo(Vendor);
// Product.hasMany(Coupon)
// // Product.belongsTo(SubCategory)
// // Product.belongsToMany(Order, { through: OrderProduct });
// // Cart
// // Cart.belongsTo(Buyer)
// // Cart.hasMany(CartItem)
// Coupon.belongsTo(Product)

// //Wishlist
// WishList.belongsTo(Buyer)
// WishList.hasMany(WishListItem)

// // Cart Item
// // CartItem.belongsTo(Product)
// // CartItem.belongsTo(Cart)

// // WishList Item
// WishListItem.belongsTo(WishList)
// WishListItem.belongsTo(Product)

// // order
// Order.belongsTo(Buyer)
// Order.belongsTo(Vendor)
// Order.hasMany(OrderProduct)
// Product.hasOne(OrderProduct)
// Product.hasMany(Review)
// // Order.hasOne(Address)
// // Order.belongsToMany(Product, { through: OrderProduct });

// // category
// SuperCategory.hasMany(Category)
// Category.hasMany(SubCategory)

// //Business Type
// Business.hasMany(SubBusiness)

// // sub-category
// SubCategory.belongsTo(Category)
// Category.belongsTo(SuperCategory)

// // Sub Business Type
// SubBusiness.belongsTo(Business)
// // SubCategory.hasMany(Product, {
// //     foreignKey: 'subCategory',
// //     // as: "subCategory",
// //     constraints: false
// // })

// // Shipping address
// Address.belongsTo(Buyer)
// // Address.belongsTo(Order)

// // Order items
// OrderProduct.belongsTo(Order)
// OrderProduct.belongsTo(Product)
// OrderProduct.hasOne(Returns)

// // reviews
// Review.belongsTo(Buyer)
// Review.belongsTo(Product)

// //returns
// Returns.belongsTo(OrderProduct)

// VendorWallet.belongsTo(Vendor)

export {
    User,
    Otp
    // Vendor,
    // Coupon,
    // Admin,
    // Product,
    // Otp,
    
    // Location,
    // Charges,
    // Settlement,
    // Order,
    // OrderProduct,
    // Category,
    // SubCategory,
    // SuperCategory,
    // Address,
    // Review,
    // Business,
    // SubBusiness,
    // WishList,
    // WishListItem,
    // Chat,
    // Message,
    // Notification,
    // Support,
    // Returns,
    // Transaction,
    // VendorWallet,
    // BusinessWallet,
    // Dimension,
    // Area,
    // Miscellaneous,
    // Weight,
    // Volume,
    // Count
};
