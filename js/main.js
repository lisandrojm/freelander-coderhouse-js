//Proyecto Freelander: Una calculadora para saber cuánto cobrar como freelancer.

// MONEDA //////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Función para solicitar el input de la MONEDA para hacer el cálculo.
function inputMoneda(e) {
    e.preventDefault();
    // Uso de : let / switch
    let moneda = document.getElementById('inputMoneda').value.toLowerCase();

    switch (moneda) {
        case 'dólar':
        case 'dólares':
        case 'dólar':
        case 'dólares':
        case 'dolar':
        case 'dolares':
        case 'euro':
        case 'euros':
            // Cambio del string "dolar o "dólar" o "euro" a USD o EUR respectivamente para que quede bien
            // en la redacción al usar el template string ${monedaGlobal} y quede correcta la redacción.
            if (moneda === 'dolar' || moneda === 'dólar' || moneda === 'dolares' || moneda === 'dólares') {
                moneda = 'Dólares';
            } else if (moneda === 'euro' || moneda === 'euros') {
                moneda = 'Euros';
            }
            let inputMoneda = document.getElementById('testing');
            inputMoneda.innerText = 'Usted ingresó ' + moneda;
            inputMoneda.className = 'section__1__p';
            //Paso de la variable moneda como parámetro a la función domInputIngresos(monedaGlobal) para
            //utilizarla con el template string ${monedaGlobal} y sea dinámica.
            domInputIngresos(moneda);
            break;
        case 'peso':
        case 'pesos':
        case 'peso argentino':
        case 'pesos argentinos':
            let ingresoPesos = document.getElementById('testing');
            ingresoPesos.innerText = 'Esa moneda devalúa constantemente. Elige por favor una moneda estable de intercambio y ahorro a nivel mundial.';
            ingresoPesos.className = 'parrafoAlerta mt-4 p-3';
            break;
        case 'real':
        case 'reales':
        case 'peso uruguayo':
        case 'pesos uruguayos':
        case 'libra':
        case 'libras':
            let ingresoMonedasVarias = document.getElementById('testing');
            ingresoMonedasVarias.innerText = 'No te recomendamos hacer el cálculo con esa moneda ya que es de uso local. Elige por favor una moneda de intercambio y ahorro a nivel mundial.';
            ingresoMonedasVarias.className = 'parrafoAlerta mt-4 p-3';
            break;
        case '':
            break;
        default:
            let ingresoInvalido = document.getElementById('testing');
            ingresoInvalido.innerText = 'No ingresaste una moneda válida o el sistema no puede hacer el cálculo con esa moneda.';
            ingresoInvalido.className = 'parrafoAlerta mt-4 p-3';
            break;
    }
    localStorage.setItem('monedaEnStorage', JSON.stringify(moneda));
    let monedaEnStorage = JSON.parse(localStorage.getItem('monedaEnStorage'));
    let ingresoMonedaEnStorage = document.getElementById('testMoneda');
    ingresoMonedaEnStorage.innerText = 'El input Moneda ' + monedaEnStorage + ' fue almacenado en Local Storage';
    ingresoMonedaEnStorage.className = 'storageAlerta mt-3';
    return moneda;
}

// INGRESOS ////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Función para cambiar el DOM al ingresar la MONEDA y solicitar el input de los INGRESOS.
function domInputIngresos(monedaGlobal) {
    //La función recibe el parámetro monedaGlobal para utilizarla con el template string ${monedaGlobal}
    let container = document.getElementById('sectionEvent');
    // Utilización de backticks para los templates strings.
    container.innerHTML = `
    <div class="row justify-content-evenly">
      <div class="col-lg-6 col-md-6 blur p-4">
        <div class="container">
          <div>
            <h1 class="section__1__h1--views fw-bold mb-0 text-nowrap">
              Freelo Calculator
            </h1>
          </div>
          <div id="titulo">
            <p class="section__1__p pt-2" >
              0.2 Ingresa <b>el monto</b> de lo que pretendes ganar como freelancer.
            </p>
          </div>
          <form class="text-light" id="form">
            <div class="mb-2">
              <label for="formInput" class="form-label">Pretensión de ingresos mensuales en ${monedaGlobal}</label>
              <input
                type="text"
                class="form-control"
                placeholder="1000 / 3000 / 5000"
                name="moneda"
                id="inputMoneda"
              />
            </div>
            <div>
              <p class="section__1__p" id="testing"></p>
            </div>
            <button
              type="button"
              class="btn btn-sm ms-0 me-3 mt-3 ps-4 pe-4 pb-1 pt-1 btn-light rounded-pill fw-bold"
              value="Input"
              id="btnIngresos"
            >
              Siguiente
            </button>
            <button
              type="reset"
              class="btn btn-sm btn-outline-light mt-3 ps-4 pe-4 pb-1 pt-1 rounded-pill fw-bold"
              value="Reset"
              id="btnLimpiar"
            >
              Limpiar
            </button>
            <div>
                <p class="section__1__p" id="testMoneda"></p>
            </div>
          </form>
          <table class="table table-dark border-light table-hover mt-4">
            <caption>
              Lista de ingresos
            </caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Detalle</th>
                <th scope="col">Ingreso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0.1</td>
                <td>Moneda</td>
                <td>${monedaGlobal}</td>
              </tr>
              <tr id="dias">
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
    let ingresos = document.getElementById('btnIngresos');
    ingresos.addEventListener('click', inputIngresos);
    let btnLimpiar = document.getElementById('btnLimpiar');
    btnLimpiar.addEventListener('click', limpiarIngreso);
}

////////////////////////////////////////////////////////////////////////////////
// Función para solicitar el input de los INGRESOS para hacer el cálculo.
function inputIngresos(e) {
    e.preventDefault();
    let ingresos = document.getElementById('inputMoneda').value.toLowerCase();
    if (ingresos < 1) {
        let ingresoMonedasVarias = document.getElementById('testing');
        ingresoMonedasVarias.innerText = 'Debes ingresar un numero mayor a 0';
        ingresoMonedasVarias.className = 'parrafoAlerta mt-4 p-3';
    } else if (isNaN(ingresos)) {
        let ingresoMonedasVarias = document.getElementById('testing');
        ingresoMonedasVarias.innerText = 'No ingresaste un número válido. Si escribiste el número con letras vuelve a intentarlo con números.';
        ingresoMonedasVarias.className = 'parrafoAlerta mt-4 p-3';
    } else {
        domInputDias(ingresos);
    }
    // Almacenamiento en Local Storage
    localStorage.setItem('ingresosEnStorage', JSON.stringify(ingresos));
    // Parse del JSON y utilización del DOM para mostrar que se han almacenado los datos en el Local Storage.
    // Próximamente utilizaremos estos datos para manipular el DOM y que el html quede como antes de que el usuario cierre la ventana.
    let ingresosEnStorage = JSON.parse(localStorage.getItem('ingresosEnStorage'));
    let ingresoInvalido = document.getElementById('testIngresos');
    ingresoInvalido.innerText = 'El input Ingresos ' + ingresosEnStorage + ' fue almacenado en Local Storage';
    ingresoInvalido.className = 'storageAlerta mt-3';
    return ingresos;
}

// Local Storage ///////////////////////////////////////////////////////////////
// ** Próximamente DIAS ////////////////////////////////////////////////////////

// Función para cambiar el DOM e informar cerrar la ventana y corroborar que los
// datos ingresados en los inputs fueron almacenados en el Local Storage.
// ** Próximamente será la función para cambiar el DOM al ingresar los INGRESOS y solicitar el input de los DIAS.
function domInputDias(ingresosGlobal) {
    // La función recibe el parámetro ingresosGlobal para utilizarla con el template string ${ingresosGlobal}.
    let td = document.getElementById('dias');
    // Utilización de backticks para los templates strings.
    td.innerHTML = `
                <td>0.2</td>
                <td>Ingresos Mensuales</td>
                <td>${ingresosGlobal}</td> `;
    let form = document.getElementById('form');
    form.innerHTML = `
                <form class="text-light" id="form">
                  <div class="mb-2">
                    <label for="formInput" class="form-label">Puedes cerrar la ventana, volverla a abrir y corroborar en el Local Storage del navegador que los datos ingresados han sido almacenados.</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Disabled"
                      name="moneda"
                      id="inputMoneda"
                    />
                  </div>
                  <div>
                    <p class="section__1__p" id="testing"></p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-sm ms-0 me-3 mt-3 ps-4 pe-4 pb-1 pt-1 btn-light rounded-pill fw-bold"
                    value="Input"
                    id="btnIngresos"
                  >
                    Disabled
                  </button>
                  <button
                    type="reset"
                    class="btn btn-sm btn-outline-light mt-3 ps-4 pe-4 pb-1 pt-1 rounded-pill fw-bold"
                    value="Reset"
                    id="btnLimpiar"
                  >
                    Disabled
                  </button>
                  <div>
                      <p class="section__1__p" id="testIngresos"></p>
                  </div>
                </form>
                `;
    let titulo = document.getElementById('titulo');
    titulo.innerHTML = `
                <p class="section__1__p pt-2" >
                  <b>Local Storage</b>.
                </p>`;
}

// LIMPIAR /////////////////////////////////////////////////////////////////////

// Función para limpiar el input y el DOM cuando el usuario ingresa un dato inválido.
// Deja vacío el innerText y pisa la class para que quede como al inicio.
function limpiarIngreso() {
    let test = document.getElementById('testing');
    test.innerText = '';
    test.className = 'section__1__p';
}

// EVENTOS /////////////////////////////////////////////////////////////////////

// Declaración de las variables de los botones para los eventos .
let btnMoneda = document.getElementById('btnMoneda');
btnMoneda.addEventListener('click', inputMoneda);
let btnLimpiar = document.getElementById('btnLimpiar');
btnLimpiar.addEventListener('click', limpiarIngreso);
