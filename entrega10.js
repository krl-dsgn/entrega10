//Definir la clase planta
class Planta {
    constructor(nombre, altura, tipo, precio, img){
        this.nombre = nombre;
        this.altura = altura;
        this.tipo = tipo;
        this.precio = precio;
        if (!img){
            this.img = 'planta-por-defecto.png';
        }else {
            this.img = img;
        }
        
    };

    toString(){
        return `${this.nombre} - $${this.precio}`
    }
    
    iva(){
        return parseFloat(this.precio) * 0.19;
    }

    precioTotal(){
        return parseFloat(this.precio) + parseFloat(this.iva());
    }
}
//JSON-arreglo por defecto
let arreglo_de_plantas = [
    new Planta('Monstera', 130, 'Interior', 10000, 'monstera.jpeg'),
    new Planta('Gomero', 60, 'Interior', 6000, 'gomero.jpeg'),
    new Planta('Singonio', 130, 'Exterior', 12000, 'singonio.jpeg'),
];
//Encontrar arreglo de plantas guardado en local storage
const arreglo_de_plantas_guardadas = JSON.parse(localStorage.getItem('arreglo_de_plantas'))

//Seleccionar el arreglo guardado o el por defecto
const plantas_a_mostrar = Array.isArray(arreglo_de_plantas_guardadas)? 
    arreglo_de_plantas_guardadas: 
    arreglo_de_plantas;
    
//DOM al cargar la página
actualizarContadorPlantas(plantas_a_mostrar.length)
mostrarPlantas(plantas_a_mostrar);


//Elemento contenedor planta
function crearElementoPlanta () {
    const elementoPlanta = document.createElement('div');
    elementoPlanta.classList.add('producto');
    return elementoPlanta
}

//Elemento HTML imagen planta
function crearImagenPlanta(planta){
    const elementoImg = document.createElement('img');
    elementoImg.src = planta.img;
    return elementoImg
}

//Elemento HTML nombre de planta
function crearNombrePlanta(planta) {
    const nombreProductoElement = document.createElement('p');
    nombreProductoElement.classList.add('nombreProducto');
    nombreProductoElement.innerHTML = planta.nombre;
    return nombreProductoElement
}

//Elemento HTML categoría planta
function crearElementoCategoriaPlanta(planta) {
    const categoriaProductoElement = document.createElement('p');
    categoriaProductoElement.classList.add('categoriaProducto');
    categoriaProductoElement.innerHTML = planta.tipo;
    return categoriaProductoElement
}

//Elemento HTML valor planta
function crearElementoValorPlanta(planta){
    const valorProductoElement = document.createElement('p');
    valorProductoElement.classList.add('valorProducto');
    valorProductoElement.innerHTML = planta.precio;
    return valorProductoElement
}

//Seleccionar el formulario de agregar planta
const formulario = document.getElementById("formulario-agregar-planta");

//Evento de submit del formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit", e)
    let formulario = e.target;
    const nombre = formulario.children[0].value;
    const tipo = formulario.children[1].value;
    const altura = formulario.children[2].value;
    const precio = formulario.children[3].value;
    const planta = new Planta(nombre, altura, tipo, precio);

    plantas_a_mostrar.push(planta);

    mostrarPlantas(plantas_a_mostrar);
    actualizarContadorPlantas(plantas_a_mostrar.length)
    localStorage.setItem('arreglo_de_plantas', JSON.stringify(plantas_a_mostrar))
})
ç
//Actualizar el contador de plantas con el valor del largo del arreglo
function actualizarContadorPlantas(numero_plantas){
    const element = document.getElementById('contador-plantas');
    element.innerHTML = `${numero_plantas} plantas agregadas`;
}
//Actualizar el listado de plantas en el DOM
function mostrarPlantas(plantas){
    const contenedor = document.getElementById('contenedor-plantas');
    contenedor.innerHTML = '';
    for(const planta of plantas){
        //Div producto
        const elementoPlanta = crearElementoPlanta();
        //Imagen
        const imgPlanta = crearImagenPlanta(planta);
        //Nombre
        const nombrePlanta = crearNombrePlanta(planta);
        //Categoria
        const categoriaPlanta = crearElementoCategoriaPlanta(planta);
        //Valor
        const valorPlanta = crearElementoValorPlanta(planta);
        elementoPlanta.appendChild(imgPlanta);
        elementoPlanta.appendChild(nombrePlanta);
        elementoPlanta.appendChild(categoriaPlanta);
        elementoPlanta.appendChild(valorPlanta);
        contenedor.appendChild(elementoPlanta);
    }
}