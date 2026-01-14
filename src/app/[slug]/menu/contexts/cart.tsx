"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CardProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartConxtext { 
    isOpen: boolean;
    products: CardProduct[],
    toggleCart: () => void;
    addProduct: (product: CardProduct) => void;

}
export const CartContext = createContext<ICartConxtext>({
    isOpen: false,
    products: [],
    toggleCart: () => { },
    addProduct: () => { },
});

export const CartProvider = ({ children }: { children: ReactNode }) => { 
    const [products, setProducts] = useState<CardProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => { 
        setIsOpen(prev => !prev);
    }

    const addProduct = (product: CardProduct) => { 
        // verificar se o produto esta no carrinho
        // se tiver, aumente a sua quantidade
        // se não estiver, o adicione
        const productIsAlreadyOnTheCart = products.some(
            (prevProduct) => prevProduct.id === product.id);
        if (!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product]);
        }
    
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => { 
                if (prevProduct.id === product.id) { 
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity,
                    }
                }
                return prevProduct;
            }
            );
        });
    
    }
    return ( 
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toggleCart,
                addProduct,
            }}
        >
            {children}
        </CartContext.Provider>
     );
}