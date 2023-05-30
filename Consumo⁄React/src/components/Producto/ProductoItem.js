import React from "react";
import { useHistory } from "react-router-dom";

import * as ProductoServer from "./ProductoServer";


const ProductoItem=({ producto, listProductos })=>{
    const history = useHistory();
    
  
     const handleDelete = async (productoId) => {
      await ProductoServer.deleteProducto(productoId);
      listProductos();
    }; 
  
    return (
      <div className="col-md-4 mb-4">
        <div className="card card-body">
          <h3 className="card-title">
            {producto.nombre}
            <button onClick={() => history.push(`/updateProducto/${producto.id}`)} className="ms-2 btn btn-sm btn-info">
              Modificar
            </button>
          </h3>
          <p className="card-text">
            Categoria: <strong>{producto.categoria}</strong>
          </p>
          <p className="card-text">
            Cantidad: <strong>{producto.cantidad}</strong>
          </p>
          <button onClick={() => producto.id && handleDelete(producto.id)} className="btn btn-danger my-2">
            Eliminar Producto
          </button> 
        </div>
      </div>
    )
}

export default ProductoItem;