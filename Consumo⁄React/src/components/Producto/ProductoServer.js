const API_URL ="https://spring-production-b814.up.railway.app/productos";

export const listProductos = async () => {
    return await fetch(API_URL);
};

export const getProducto = async (productoId) => {
    return await fetch(`${API_URL}/${productoId}`);
};

export const registerProducto = async (newProducto) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nombre": String(newProducto.nombre).trim(),
            "categoria": String(newProducto.categoria).trim(),
            "cantidad": parseInt(newProducto.cantidad),
            
        })
    });
};

export const updateProducto = async (productoId, updatedProducto) => {
    return await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": productoId,
            "nombre": String(updatedProducto.nombre).trim(),
            "categoria": String(updatedProducto.categoria).trim(),
            "cantidad": parseInt(updatedProducto.cantidad),
        })
    });
};

export const deleteProducto = async (productoId) => {
    return await fetch(`${API_URL}/${productoId}`, {
        method: 'DELETE'
    });
};