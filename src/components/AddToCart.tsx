'use client'
import React from 'react';

// MUST SEPARATE client side components such as on click events into their own component (put use client at top of file to specify this) and not be async. Async functions cannot be client side b/c waiting on server to provide response? (RAMIN NOTES)
const AddToCart = (props) => {
    const AddedToLocalStorage = (existingCartItems) => {
        try{
            // Store the updated cart in `localStorage`
            localStorage.setItem('cart', JSON.stringify(existingCartItems))
        }
        catch{
            console.log("ERROR when adding product to empty cart")
            return false 
        }
        console.log("Added Product Successfully")
        return true //success
    }

    const AddProduct = (product) => {
        console.log('product being added:', product)
        // localStorage.clear();

        const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Current cart: ', existingCartItems)

        // we are only storing product_id and product_quantity in local storage 
        if (existingCartItems.length === 0){ 
            console.log('cart is empty')
            existingCartItems.push(product)
            AddedToLocalStorage(existingCartItems)
            return
        }

        let i=0
        for(i=0; i<existingCartItems.length; i++){
            if(existingCartItems[i].PRODUCT_ID === product.PRODUCT_ID){
                console.log('This product is already in your cart')
                console.log('old quantity: ', existingCartItems[i].PRODUCT_QUANTITY)
                existingCartItems[i].PRODUCT_QUANTITY += product.PRODUCT_QUANTITY //update quantity
                console.log('updated quantity: ', existingCartItems[i].PRODUCT_QUANTITY)
                AddedToLocalStorage(existingCartItems)
                return
            }
        }

        //product not yet added to cart
        existingCartItems.push(product)
        if(AddedToLocalStorage(existingCartItems) ) //success
            console.log('new product has been added to cart')

    }


    const { product } = props;
    console.log(product)

    return (
    <div>
        {/* <button onClick={AddProduct}>Click Me</button> */}
        <button onClick={() => AddProduct(product)}>Add To Cart</button>
    </div>
    );
};

export default AddToCart;