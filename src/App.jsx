import {useEffect, useState} from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Footer from "./components/Footer"
import { db } from "./data/db"

function App() {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])


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
        
  return (
    <>
    <Header 
        cart={cart}
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
