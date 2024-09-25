import {useEffect, useState, useMemo} from "react"
import { db } from "../data/db"


const useCart = () => {

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
    
     //state derivado
     const isEmpty = useMemo( () => cart.length === 0, [cart])
     const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart])

    return { 
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
         
    };
};

export default useCart;