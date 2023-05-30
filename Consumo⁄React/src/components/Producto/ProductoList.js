import React, { useEffect, useState } from "react";
import * as ProductoServer from './ProductoServer';
import ProductoItem from "./ProductoItem";


const ProductoList = () => {
    const [productos, setProductos] = useState([]);

    const listProductos = async () => {
        try {
            const res = await ProductoServer.listProductos();
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listProductos();
    }, []);

    return (
        <div className="row">
            {productos.map((producto) => (
                <ProductoItem key={producto.id} producto={producto} listProductos={listProductos}/>
            ))}
        </div>
    );
};

export default ProductoList;