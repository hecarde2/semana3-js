// ===============================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ===============================

// Método 1: getElementById
const inputNota = document.getElementById("inputNota");

// Método 2: querySelector
const btnAgregar = document.querySelector("#btnAgregar");

// Método 3: getElementById
const listaNotas = document.getElementById("listaNotas");


// Verificar en consola
console.log("Input:", inputNota);
console.log("Botón:", btnAgregar);
console.log("Lista:", listaNotas);


// ===============================
// ARREGLO EN MEMORIA
// ===============================

let notas = [];


// ===============================
// CARGAR NOTAS DESDE LOCAL STORAGE
// ===============================

const notasGuardadas = localStorage.getItem("notas");

if (notasGuardadas) {

    // Convertir JSON a arreglo
    notas = JSON.parse(notasGuardadas);

    console.log(`Se cargaron ${notas.length} notas`);

    // Renderizar notas
    notas.forEach(nota => {
        crearNotaDOM(nota);
    });
}


// ===============================
// EVENTO PARA AGREGAR NOTAS
// ===============================

btnAgregar.addEventListener("click", () => {

    // Obtener texto y eliminar espacios extras
    const textoNota = inputNota.value.trim();

    // Validación
    if (textoNota === "") {
        alert("El input no puede estar vacío");
        return;
    }

    // Agregar al arreglo
    notas.push(textoNota);

    // Guardar en Local Storage
    guardarNotas();

    // Crear nota en DOM
    crearNotaDOM(textoNota);

    // Mensaje consola
    console.log(`Nota agregada: ${textoNota}`);

    // Limpiar input
    inputNota.value = "";

    // Volver a enfocar input
    inputNota.focus();
});


// ===============================
// FUNCIÓN PARA CREAR NOTAS EN DOM
// ===============================

function crearNotaDOM(texto) {

    // Crear elemento li
    const li = document.createElement("li");

    // Agregar texto
    li.textContent = texto;

    // Crear botón eliminar
    const btnEliminar = document.createElement("button");

    btnEliminar.textContent = "Eliminar";

    // Clase CSS
    btnEliminar.classList.add("btn-eliminar");

    // Agregar botón al li
    li.appendChild(btnEliminar);

    // Insertar li en ul
    listaNotas.appendChild(li);


    // ===============================
    // ELIMINAR NOTAS
    // ===============================

    btnEliminar.addEventListener("click", () => {

        // Remover li desde ul
        listaNotas.removeChild(li);

        // Eliminar del arreglo
        notas = notas.filter(nota => nota !== texto);

        // Actualizar Local Storage
        guardarNotas();

        // Mensaje consola
        console.log(`Nota eliminada: ${texto}`);
    });
}


// ===============================
// FUNCIÓN GUARDAR EN LOCAL STORAGE
// ===============================

function guardarNotas() {

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );

    console.log("Notas guardadas en Local Storage");
}