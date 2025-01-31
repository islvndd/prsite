function checkFunc(param) {
    if (isNaN(param)) {
        console.log("Переданное значение не является числом.");
    } else if (param > 170) {
        console.log("Переданное значение больше 170.");
    } else {
        console.log("Переданное значение меньше или равно 170.");
    }
}

// Вызов функции checkFunc() с разными значениями параметра
checkFunc("Значение параметра");
checkFunc(100);
checkFunc(200);
checkFunc(250);


