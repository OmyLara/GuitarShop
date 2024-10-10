import { useState, useEffect } from "react";
import { Header } from "./Components/Header";
import { Guitar } from "./Components/Guitar";
import { db } from "./data/db";

function App() {

  const initialCart= ()=>{
    const localStorageCart= localStorage.getItem('cart');
    return localStorageCart ?  JSON.parse(localStorageCart) : [];
  }

  const [data,setData]=useState(db);
  const [cart,setCart]=useState(initialCart)
  const MAX_ITEMS= 10;
  const LIMIT_ITEMS= 1;

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])
  
  function addToCart(item){
    const itemExists = cart.findIndex(elemento=>elemento.id=== item.id);
    if(itemExists >=0){

      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);

    }else{
      item.quantity=1
      setCart([...cart,item])
    }
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  function addOneCart(id){
    const updatedCart = cart.map(item =>{
      if(item.id ===id && item.quantity < MAX_ITEMS ){
        return{
          ...item,
          quantity: item.quantity +1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function deleteOneCart(id){
    const updatedCart = cart.map(item =>{
      if(item.id ===id && item.quantity > LIMIT_ITEMS ){
        return{
          ...item,
          quantity: item.quantity -1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([])

  }

 

  return (
    <>
    <Header 
    cart={cart}
    removeFromCart={removeFromCart}
    addOneCart={addOneCart}
    deleteOneCart={deleteOneCart}
    clearCart={clearCart}
    />
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>(
              <Guitar 
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
              />
          ))}
        
        
                
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">Guitar LA - All rights reserved</p>
        </div>
    </footer>

     
    </>
  )
}

export default App
