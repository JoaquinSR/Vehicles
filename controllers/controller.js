/* Variables globales */
var car;
var arrayCar = new Array();
var carForm = document.getElementById('carForm');
var wheelForm = document.getElementById('wheelForm');
var carInfo = document.getElementById('carInfo');
/* Funciones para crear un coche y añadirle ruedas */
function createCar() {
    var plate = document.getElementById('plate');
    var brand = document.getElementById('brand');
    var color = document.getElementById('color');
    if (validateCar(plate, color, brand)) {
        car = new Car(plate.value, color.value, brand.value);
        console.log(car);
        arrayCar.push(car);
        /* Ocultar form car, mostrar form wheel  */
        carForm.classList.remove('d-flex');
        carForm.classList.add('d-none');
        wheelForm.classList.remove('d-none');
        wheelForm.classList.add('d-flex');
        printCar();
    }
}
function addWheels() {
    if (validateWheels()) {
        for (var i = 1; i <= 4; i++) {
            var diameter = document.getElementById('dWheel' + i).value;
            var brand = document.getElementById('bWheel' + i).value;
            car.addWheel(new Wheel(diameter, brand));
        }
        console.log(car.wheels);
        console.log(arrayCar);
        printWheel();
        /* Ocultar form wheel, mostrar form car. Resetear formularios  */
        wheelForm.classList.remove('d-flex');
        wheelForm.classList.add('d-none');
        document.getElementById('form2').reset();
        carForm.classList.remove('d-none');
        carForm.classList.add('d-flex');
        document.getElementById('form1').reset();
    }
}
/* Funciones para imprimir por pantalla un coche y sus ruedas, add div elemento padre  */
function printCar() {
    var newDiv = document.createElement('div');
    carInfo.appendChild(newDiv).innerHTML = "\n    <br>\n    <div class=\"row col-12 text-center\">\n            <div class=\"col-4\"><div class=\"font-weight-bold\">Car Plate</div>" + car.plate + "</div>\n            <div class=\"col-4\"><div class=\"font-weight-bold\">Brand</div>" + car.brand + "</div>\n            <div class=\"col-4\"><div class=\"font-weight-bold\">Color</div>" + car.color + "</div>\n    </div>\n    ";
}
function printWheel() {
    var newDiv = document.createElement('div');
    carInfo.appendChild(newDiv).innerHTML = "\n    <br>\n    <div class=\"row col-12 text-center\">\n            <div class=\"col-3\"><div class=\"font-weight-bold\">Wheel 1</div>\n                Brand: " + car.wheels[0].brand + " \n                <p>Diameter: " + car.wheels[0].diameter + "</p></div>\n            <div class=\"col-3\"><div class=\"font-weight-bold\">Wheel 2</div>\n                Brand: " + car.wheels[1].brand + "\n                <p>Diameter: " + car.wheels[1].diameter + "</p></div>\n            <div class=\"col-3\"><div class=\"font-weight-bold\">Wheel 3</div>\n                Brand: " + car.wheels[2].brand + "\n                <p>Diameter: " + car.wheels[2].diameter + "</p></div>\n            <div class=\"col-3\"><div class=\"font-weight-bold\">Wheel 4</div>\n                Brand: " + car.wheels[3].brand + "\n                <p>Diameter: " + car.wheels[3].diameter + "</p></div>\n    </div>\n    <hr width=\"90%\" />\n    ";
}
/* Funciones para validar los campos */
function validateCar(plate, color, brand) {
    var accumError = 0;
    plate.classList.remove("is-invalid");
    color.classList.remove("is-invalid");
    brand.classList.remove("is-invalid");
    var errorPlate = document.getElementById('errorPlate');
    var errorColor = document.getElementById('errorColor');
    var errorBrand = document.getElementById('errorBrand');
    if (plate.value == "") {
        required(plate, errorPlate);
        accumError = +1;
    }
    else if (!validatePlate(plate.value)) {
        plate.classList.add("is-invalid");
        errorPlate.textContent = "The plate must contain 4 numbers and 3 letters.";
        accumError = +1;
    }
    if (color.value == "") {
        required(color, errorColor);
        accumError = +1;
    }
    if (brand.value == "") {
        required(brand, errorBrand);
        accumError = +1;
    }
    if (accumError > 0) {
        return false;
    }
    else {
        return true;
    }
}
function validatePlate(plate) {
    var plateReg = /^[0-9]{4}[a-zA-Z]{3}$/;
    return plateReg.test(plate) ? true : false;
}
function required(inputId, errorId) {
    inputId.classList.add("is-invalid");
    errorId.textContent = "The field is required.";
}
function validateWheels() {
    var accumError = 0;
    /* Bucle para recorrer inputs ruedas */
    for (var i = 1; i <= 4; i++) {
        var diameter = document.getElementById('dWheel' + i);
        var brandW = document.getElementById('bWheel' + i);
        var errorDiameter = document.getElementById('errorDwheel' + i);
        var errorBrandW = document.getElementById('errorBwheel' + i);
        diameter.classList.remove("is-invalid");
        brandW.classList.remove("is-invalid");
        if (diameter.value == "") {
            required(diameter, errorDiameter);
            accumError = +1;
        }
        else if (diameter.value < 0.4 || diameter.value > 2) {
            diameter.classList.add("is-invalid");
            errorDiameter.textContent = "The diameter of the wheel should be between 0.4 and 2.";
            accumError = +1;
        }
        if (brandW.value == "") {
            required(brandW, errorBrandW);
            accumError = +1;
        }
    }
    if (accumError > 0) {
        return false;
    }
    else {
        return true;
    }
}
