
import Navbar from "../../components/Navbar";
import CartItem from "@/src/components/CartItem";



/*
1) The new order will be created after checkout is done, so maybe store temporary order in json???
2) display current items in order -> this is not user specific as the order is not official
  2a) must get product info by selecting from prisma 

const result = await prisma.Order.findUnique({
  where: { USER_ID: 1 },
  select: {
    name: true,
    profileViews: true,
  },
})

const result = await prisma.Product.findUnique({
  where: {PRODUCT_ID: #},
  select: {
    PRODUCT_NAME,
    PRODUCT_PRICE,
    PRODUCT_IMAGE,
  }
})
*/


export default async function Page() {

 
    // const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    // const cartItem = {
    //   id: 1,
    //   name: 'Product Name',
    //   price: 10.99,
    // };
    // existingCartItems.push(cartItem);
    // // Store the updated cart in `localStorage`
    // localStorage.setItem('cart', JSON.stringify(existingCartItems));
  
  return (
    <main>
      <div >
        <Navbar/>
      </div>
      
      <div className="container">
        <div className="row">
          <div className="d-flex align-items-start py-3 px-4 inline-block ">
            <h2 className="text-2xl font-semibold">
              Review Cart
            </h2>
            <hr style={{width: 300}}></hr>
            <div>
              <div className="text-left py-3 px-4 inline-block">
                <img style={{width:50, height:100}} src="https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
              </div>
              <div className="text-left py-3 px-4 inline-block">
                <p className="font-semibold text-xs">Name of Item</p>
                <p className="font-semibold text-xs">$45</p>
                <p className="text-xs">Quantity: 3</p>
              </div>
              <div className="text-s">
              <a>Remove</a>
              </div>
            </div>

            <hr style={{width: 200}}></hr>
          </div>
          
          <div className="inline-block">
          <div  className="text-right py-3 px-4 inline-block border p-3 d-flex justify-content-end">
            <h3 className={` text-center text-xl font-semibold`}>
              Order Summary
            </h3>
            <hr style={{width: 200}}></hr>
            <CartItem />
            <div className="row">
              <div className="text-left py-3 px-4 inline-block">
                <p className="text-left">Item 1</p>
              </div>
              <div className="py-3 px-4 inline-block">
                <p className="text-left">$345678</p>
              </div>
            </div>
            <div className="row">
               <div className="text-left py-3 px-4 inline-block">
                <p className="text-left">Shipping</p>
              </div>
              <div className="py-3 px-4 inline-block">
                <p className="text-left">$3.78</p>
              </div>
            </div>
            <hr style={{width: 200}}></hr>
            <div className="row">
               <div className="text-left py-3 px-4 inline-block">
                <p className="text-left">Subtotal</p>
              </div>
              <div className="py-3 px-4 inline-block">
                <p className="text-left">$3333.78</p>
              </div>
            </div>
            <div className="row">
               <div className="text-left py-3 px-4 inline-block">
                <p className="text-left">Taxes</p>
              </div>
              <div className="py-3 px-4 inline-block">
                <p className="text-left">$32.78</p>
              </div>
            </div>
            <hr style={{width: 200}}></hr>
            <div className="row">
               <div className="text-left py-3 px-4 inline-block">
                <p className="font-semibold text-left">Order Total</p>
              </div>
              <div className="py-3 px-4 inline-block">
                <p className="font-semibold text-left">$323.78</p>
              </div>
            </div>
          </div>
          <button className="border font-semibold text-s">Apply a Coupon</button>
          <button className="border font-semibold">Checkout</button>
          </div>
          
        </div>
      </div>
      
    </main>
  );
}
