siteLocalStorage = window.localStorage;
STORAGE_KEY = "cart"


function LocalStorageKeyExists(storageKey) {
    return localStorage.getItem(storageKey) !== null;
}

var data_products;
var data_images;

//"/images/"
function LoadJSONData() {
    let currentLocation = window.location.origin;
    let imagesURL = currentLocation + "/images/"
    let productsURL = currentLocation + "/products/"
    $.ajax({
        url: imagesURL,
        dataType: "json",
        context: document.body,
        success: function (data) {
            data_images = data;
        }
    });
    $.ajax({
        url: productsURL,
        dataType: "json",
        context: document.body,
        success: function (data) {
            data_products = data;
            addRows();
        }
    });

}
function LoadProducts() {
    LoadJSONData();
}

function addRows() {
    let tableRef = document.getElementById("cart-tbody");
    let newRow = tableRef.insertRow();
    console.log(data_products);
    console.log(data_images);

    for (let i = 0; i <= 5; i++) {
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(data_products[i]);
        newCell.appendChild(newText);
    }
}

// addRows();
LoadProducts();