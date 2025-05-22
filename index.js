const contenidoXML = document.getElementById("esquema-xml").textContent.trim();
const documentoXML = new DOMParser().parseFromString(contenidoXML, "text/xml");

//Esta función convierte un documento XML con productos a un array de objetos JSON
function pasoXMLtoJSON(xml) {
    const productos = xml.getElementsByTagName("producto"); //Pilla del XML los atributos de la etiqueta producto
    const resultado = [];

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        resultado.push({
            //Extrae y convierte cada atrubuto del XML a un objeto con nombre, precio y stock
            nombre: producto.getElementsByTagName("nombre")[0].textContent.trim(),
            precio: parseFloat(producto.getElementsByTagName("precio")[0].textContent.trim()),
            stock: parseInt(producto.getElementsByTagName("stock")[0].textContent.trim())
        });
    }
    return resultado; //Devuelve el array que contiene los atributos del XML que se extrajeron antes
}

function generarTabla(productos) {
    const seccionProductos = document.getElementById("tabla-productos");
    const tabla = document.createElement("table");

    //Cabecera de la tabla
    tabla.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Stock</th>
    </tr>
  `;

    //Recorre cada producto del archivo guardado antes para agregar una fila
    productos.forEach(({ nombre, precio, stock }) => {
        let clase = "";
        if (stock < 20) {
            clase = "stock_bajo"; //Si el stock es menor de 20, la clase del producto será un color rojizo
        }

        //Agrega filas por cada producto con los datos que le corresponden
        tabla.innerHTML += `
      <tr class="${clase}">
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${stock}</td>
      </tr>
    `;
    });
    //Agrega la tabla creada HTML gracias a innerHTML en la sección del documento HTML
    seccionProductos.appendChild(tabla);
}
const productosJson = pasoXMLtoJSON(documentoXML);
generarTabla(productosJson);