import { createContext, useContext, useState, useMemo } from 'react'

// Creating a React Context
const CartContext = createContext({})

// Creating a Wrapper for that Context

export function CartWrapper({ children }: any) {
  const [cart, setCart] = useState<any[]>([])

  const addToCart = (id: string, name: string, company: string, img: string, unit_price: number) => {
      console.log("adding to cart..")
      // Check whether product is present in cart
      let prodPresent = false
      let tempCart = []
      // If product in present increment quantity by 1
      for (var prod in cart){
          let tempProd = cart[prod]
          if (tempProd.id === id){
              let tempQty = tempProd.qty
              prodPresent = true
              tempProd.qty = tempQty + 1
          }
          tempCart.push(tempProd)
      }
      // If product is not present add it to cart
      if (!prodPresent){
          let newProd = {
              id, name, company, img, unit_price, qty: 1
          }
          tempCart.push(newProd)
      }
      // update Cart
      setCart(tempCart)
  }

  const removeFromCart = (id: string) => {
      let tempCart = []
      let toDelete = false
      // If product in present increment quantity by 1
      for (var prod in cart){
          let tempProd = cart[prod]
          if (tempProd.id === id){
              let tempQty = tempProd.qty
              if (tempQty === 1){
                  toDelete = true
              } else {
                  tempProd.qty = tempQty - 1
              }
          }
          tempCart.push(tempProd)
      }
      // update Cart
      if (toDelete){
          deleteFromCart(id)
      } else {
          setCart(tempCart)
      }
  }

  const deleteFromCart = (id: string) => {
      // If product in present delete product
      let tempCart = []
      for (var prod in cart){
          let tempProd = cart[prod]
          if (tempProd.id !== id){
              tempCart.push(tempProd)
          }
      }
      // update Cart
      setCart(tempCart)
  }

  const values = useMemo(
      () => ({ cart, setCart, addToCart, removeFromCart, deleteFromCart }),
      [ cart ]
  );

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
}

// Function to use the Context
export function useCartContext() {
  return useContext(CartContext);
}
