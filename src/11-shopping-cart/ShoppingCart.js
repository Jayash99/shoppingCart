import { useState } from 'react'

const items = [{
  name: 'apple',
  price: 2
}, {
  name: 'banana',
  price: 3
}, {
  name: 'cherry tomatoes',
  price: 4
}]

function ShoppingCart () {
  /* { name: 'apple', quantity: 3, price: 0.39 },{ name: 'banana', quantity: 3, price: 0.79 } */
  const [total,setTotal] = useState(0)
  const [cart,setCart] = useState([]);
  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className='cart'>
        <div className='items'>
          <h2>Items</h2>
          {items.map(item => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={()=>{
                if(cart.filter(it=>it.name===item.name).length>=1){
                  cart.forEach(cartItem=>{
                    if (cartItem.name===item.name){
                      cartItem.quantity+=1
                      let newTotal = 0;
                      cart.length>1?newTotal = total+cartItem.price:newTotal = cartItem.quantity*cartItem.price
            
                      setTotal(newTotal)
                    }
                  })
                  setCart([...cart])
                }
                else{
                  const newItem = {
                    name:item.name,
                    quantity: 1,
                    price:item.price
                  }
                  const newTotal = total+(newItem.quantity*newItem.price)
        
                  setTotal(newTotal)
                  const updatedCart = [...cart,newItem]
                  setCart(updatedCart)
                }
              }}>Add to Cart</button>
            </div>)
          )}
        </div>
        <div>
          <h2>Cart</h2>
          {cart.map(item => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>
                <button onClick={()=>{
                  cart.forEach(cartItem=>{
                    if (cartItem.name===item.name){
                      cartItem.quantity-=1
                      let newTotal;
                      cart.length>1?newTotal = total-cartItem.price:newTotal = cartItem.quantity*cartItem.price
            
                      setTotal(newTotal)
                      if(cartItem.quantity===0){
                        const index = cart.indexOf(el=>el.quantity===0)
                        const newCart = cart.splice(index,1)
                        setCart([...newCart])
                      }
                    }
                  })
                  setCart([...cart])
                }}>-</button>
                {item.quantity}
                <button onClick={()=>{
                  cart.forEach(cartItem=>{
                    if (cartItem.name===item.name){
                      cartItem.quantity+=1
                      let newTotal;
                      cart.length>1?newTotal = total+cartItem.price:newTotal = cartItem.quantity*cartItem.price
            
                      setTotal(newTotal)
                    }
                  })
                  setCart([...cart])
                }}>+</button>
              </p>
              <p>Subtotal: ${item.price*item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='total'>
        <h2>Total: ${total}</h2>
      </div>
    </div>
  )
}

export default ShoppingCart
