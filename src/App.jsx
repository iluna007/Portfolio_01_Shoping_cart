import {useEffect, useState} from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Footer from "./components/Footer"
import { db } from "./data/db"
import { func } from "prop-types"

function App() {

    const initialCart = () =>{
        const localData = localStorage.getItem("cart")
        return localData ? JSON.parse(localData) : []
    }

    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)

    //const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        console.log("cargando datos")
        setData(db)
    }, [])  


    function addToCart(item) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if(itemExist >=0) {
            console.log("El item ya existe en el carrito")
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            console.log("No existia...Agregando item al carrito")
            item.quantity = 1
            setCart(prevCart => [...prevCart, item])
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter((guitar) => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if(item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                } 
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                } 
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }


        
  return (
    <>
    <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
    />
       
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar) => {
                    return (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            cart={cart}
                            addToCart={addToCart}

                        />
                    );
                })}  
                      
            </div>
        </main>


        
        <Footer />
    </>
  )
}

export default App
