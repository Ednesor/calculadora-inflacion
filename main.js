const inputPrice = document.getElementById("inputPrice");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const inputButton = document.getElementById("inputButton");
const spanErrores = document.getElementById("errores");
const spanPrecioFinal = document.getElementById("finalPrice");
let inputFaltante = [];

const datoInflacion = {
  "2023": [6.6, 6.6, 7.7, 8.4, 7.8, 6.0, 6.3, 12.4, 12.7, 8.3, 12.8, 25.5],
  "2024": [20.6, 13.2, 11.0, 8.8, 4.2, 4.6, 4.0, 4.2, 3.5, 2.7, 2.4],
};


const detectarErrores = () => {
  let hayErrores = false;
//   console.log(parseFloat(inputPrice.value.trim()));
  if (
    inputPrice.value.trim() === "" ||
    isNaN(parseFloat(inputPrice.value.trim()))
  ) {
    inputFaltante = inputFaltante.filter((item) => item !== "precio");
    inputFaltante = [...inputFaltante, "precio"];
    hayErrores = true;
  } else inputFaltante = inputFaltante.filter((item) => item !== "precio");

  if (inputMonth.value === "0") {
    inputFaltante = inputFaltante.filter((item) => item !== "mes");
    inputFaltante = [...inputFaltante, "mes"];
    hayErrores = true;
  } else inputFaltante = inputFaltante.filter((item) => item !== "mes");

  if (inputYear.value === "0") {
    inputFaltante = inputFaltante.filter((item) => item !== "año");
    inputFaltante = [...inputFaltante, "año"];
    hayErrores = true;
  } else inputFaltante = inputFaltante.filter((item) => item !== "año");

  return hayErrores;
};

const mostrarPrecio = () => {
  if (detectarErrores()) {
    spanErrores.textContent = `Para calcular el precio final necesita ingresar: ${inputFaltante.join(
      ", "
    )}`;
    spanPrecioFinal.textContent = "";
  } else {
    spanErrores.textContent = "";
    const precioFinal = calcularPrecio(parseFloat(inputPrice.value.trim()), inputMonth.value-1, parseInt(inputYear.value))
    spanPrecioFinal.textContent = precioFinal !== undefined ? `El precio final del producto es de $ ${precioFinal}` : `Aun no esta publicado el dato de inflacion del mes seleccionado`;
  }
};

const calcularPrecio = (precio, mesIngresado, anioIngresado) => {
    const fechaActual = new Date();
    const actualYear = fechaActual.getFullYear();
  if(anioIngresado == actualYear && mesIngresado >= datoInflacion[actualYear.toString()].length){
    return undefined;
  }else {
    for (let a = anioIngresado; a <= actualYear; a++) {
      for (let m = mesIngresado; m < datoInflacion[a.toString()].length; m++) {
        // console.log(`Precio: ${precio} x ${(datoInflacion[a.toString()][m] / 100 + 1)}`)
        precio *= (datoInflacion[a.toString()][m] / 100 + 1)
      }
    }

    return precio.toFixed(1);
  }
};

inputButton.addEventListener("click", mostrarPrecio);
