import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";


import * as ProductoServer from "./ProductoServer";

const ProductoForm = () => {
  const history = useHistory();
  const params = useParams();


  const initialState = { id: 0, name: "", foundation: 1950, website: "" };

  const [producto, setProducto] = useState(initialState);

  const handleInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!params.id) {
        res = await ProductoServer.registerProducto(producto);
        const data = await res.json();
        if (data.message === "Success") {
          setProducto(initialState);
        }
      } else {
        await ProductoServer.updateProducto(params.id, producto);
      }
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getProducto = async (productoId) => {
    try {
      const res = await ProductoServer.getProducto(productoId);
      const data = await res.json();
      const { nombre, categoria, cantidad } = data;
      setProducto({ nombre, categoria, cantidad });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getProducto(params.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-md-3 mx-auto">
      <h2 className="mb-3 text-center">Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" value={producto.nombre} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" autoFocus required />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <input type="text" name="categoria" value={producto.categoria} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" autoFocus required />
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input type="num" name="cantidad" value={producto.cantidad} onChange={handleInputChange} className="form-control" minLength="1" maxLength="50" autoFocus required />
        </div>
        
        <div className="d-grid gap-2">
          {params.id ? (
            <button type="submit" className="btn btn-block btn-primary">
              Actualizar
            </button>
          ) : (
            <button type="submit" className="btn btn-block btn-success">
              Agregar
            </button>
          )}
          <button onClick={() => history.push(`/`)} className="d-grid gap-2 btn-info">
          Cancelar
        </button>
        </div>
      </form>
    </div>
  );
};

export default ProductoForm;