category_prod = [];
var minCost = "";
var maxCost = "";
var busqueda = "";

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category_prod = resultObj.data;
            showProductList(category_prod);
        }
    })
});

function deafultProducts() {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category_prod = resultObj.data;
            showProductList(category_prod);
        }
    })
}


document.getElementById("sortByRelevanceMm").addEventListener("click", function () {
    category_prod = sortDesc_BySoldCount(category_prod);
    showProductList(category_prod);
});


document.getElementById("sortByPriceMm").addEventListener("click", function () {
    category_prod = sortDesc_ByCost(category_prod);
    showProductList(category_prod);
});


document.getElementById("sortByPricemM").addEventListener("click", function () {
    category_prod = sortAsc_ByCost(category_prod);
    showProductList(category_prod);
});


document.getElementById("inputSearch").addEventListener('keyup', (event) => {
    busqueda = document.getElementById("inputSearch").value;
    showProductList(category_prod);
});

/* document.getElementById("btnSearch").addEventListener("click", (event) => {
    busqueda = document.getElementById("inputSearch").value;
    showProductList(category_prod);
}); */


document.getElementById("rangeFilterCost").addEventListener("click", function () {
    setPriceRange();
    showProductList(category_prod);
});


document.getElementById("clearFilters").addEventListener("click", function () {
    clearFields();
    deafultProducts();
});


// Devuelve ordenado por precio de menor a mayor el arreglo pasado como parametro, utilizando el metodo insertion sort.

function sortAsc_ByCost(arr) {
    const l = arr.length;
    let j, temp;

    for (let i = 1; i < l; i++) {
        j = i;
        temp = arr[i];
        while (j > 0 && arr[j - 1].cost > temp.cost) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }

    return arr;
};


// Devuelve ordenado por precio de mayor a menor el arreglo pasado como parametro, utilizando el metodo insertion sort.

function sortDesc_ByCost(arr) {
    const l = arr.length;
    let j, temp;

    for (let i = 1; i < l; i++) {
        j = i;
        temp = arr[i];
        while (j > 0 && arr[j - 1].cost < temp.cost) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }

    return arr;
};


// Devuelve ordenado por cantidad de vendidos de mayor a menor el arreglo pasado como parametro, utilizando el metodo insertion sort.

function sortDesc_BySoldCount(arr) {
    const l = arr.length;
    let j, temp;

    for (let i = 1; i < l; i++) {
        j = i;
        temp = arr[i];
        while (j > 0 && arr[j - 1].soldCount < temp.soldCount) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }

    return arr;
};

// Fija el rango de precios.

function setPriceRange() {
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;
}

function getSearchResults(arr, busqueda) {
    resultados = [];
    for (let i = 1; i < arr.length; i++) {
        if ((arr[i].name.includes(busqueda)) || (arr[i].description.includes(busqueda))) {
            alert(arr[i].name);
        }
    }
}

// Limpia todos los campos.

function clearFields() {
    document.getElementById("inputSearch").value = "";
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";
    minCost = "";
    maxCost = "";
    busqueda = "";
}


// Crea una etiqueta por cada elemento del array pasado como parametro y lo añade al html.

function showProductList(arr) {
    let cont = 0;
    
    let htmlContentToAppend = "";

    for (let i = 0; i < arr.length; i++) {
        let prod = arr[i];

        if (((minCost == "") || (minCost != "" && prod.cost >= minCost)) &&
            ((maxCost == "") || (maxCost != "" && prod.cost <= maxCost))) {

            if((arr[i].name.indexOf(busqueda) > -1) || (arr[i].description.indexOf(busqueda) > -1)){
            cont ++;
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + prod.imgSrc + `" alt="` + prod.name + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ prod.name + `</h4>
                            <small class="text-muted">U$S ` + prod.cost + `</small>
                        </div>
                        <p class="mb-1">` + prod.description + `</p>
                        <small class="text-muted">` + ` (` + prod.soldCount + ` vendidos) </small>
                    </div>
                </div>
            </a>
            `
            }
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
    if(cont == 0){
        htmlContentToAppend +=`
        <div class="row">
            <div class="container p-3">
                <p class="mb-1 tex">No hay productos para mostrar.</p>
            </div>
        </div>
        `;
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
    
};