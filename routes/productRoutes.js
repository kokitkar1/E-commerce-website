import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";



const router = express.Router();

//Routes

// 1. For create product route || POST Method
router.post('/create-product', requireSignIn, isAdmin,formidable(), createProductController)


// 2. For get product Route  || GET Method
router.get('/get-product', getProductController)

// 3. For get Single Product Route || GET Method
router.get('/get-product/:slug', getSingleProductController)

// 4. For Product photo Route || GET Method
router.get('/product-photo/:pid', productPhotoController)

// 5.For delete product photo || DELETE Method
router.delete('/delete-product/:pid', deleteProductController)

// 6. For Update product || PUT Method
router.put('/update-product/:pid', requireSignIn, isAdmin,formidable(), updateProductController)

// 7. For Filter the product || POST method
router.post('/product-filters', productFiltersController)

// 8. For pagination- product count || GET Method
router.get('/product-count', productCountController)

// 9. For pagination - product page base || GET Method
router.get('/product-list/:page', productListController)

// 10. Search product  || GET Method
router.get('/search/:keyword', searchProductController)

// 11. Similar product || GET Method
router.get('/related-product/:pid/:cid', relatedProductController)

// 12. Category wise product || GET Method
router.get('/product-category/:slug', productCategoryController)

// 13. Payment Route for token || GET Method
router.get('/braintree/token', braintreeTokenController)

// 14. Payment Route for payments || POST Method
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router