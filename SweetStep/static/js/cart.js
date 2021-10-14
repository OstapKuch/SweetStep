siteLocalStorage = window.localStorage;
STORAGE_KEY = "cart"

function LocalStorageKeyExists(storageKey) {
    return localStorage.getItem(storageKey) !== null;
}

function GetLocalStorageObject(key) {
    let cartItems = localStorage.getItem(key);
    return JSON.parse(cartItems);
}

var data_products;
var data_images;
var items;
var currentLocation = window.location.origin;

//"/images/"
function LoadJSONData() {
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
            createTable();
        }
    });

}

function LoadProducts() {
    if (LocalStorageKeyExists(STORAGE_KEY)) {
        items = GetLocalStorageObject(STORAGE_KEY);
        console.log(items)
        LoadJSONData();
    }

}


function createTable() {
    let tableRef = document.getElementById("cart-tbody");

    console.log(data_products[1]["fields"]["title"]);
    console.log(data_images[1]["fields"]);
    console.log(data_products[1])
    let sum = 0;
    for (let i = 0; i < data_products.length; i++) {
        let identifier = "product_" + data_products[i]["pk"];
        if (identifier in items) {
            console.log(identifier, items[identifier])
            let newRow = tableRef.insertRow();
            // CreateRow(data_images[i]["pk"], newRow);
            AddImage(data_images[i]["fields"]["image"], newRow)
            CreateRow(data_products[i]["fields"]["title"], newRow);
            CreateRow(data_products[i]["fields"]["description"], newRow);
            let product_count = items[identifier];
            if (product_count < 1) {
                product_count = 1;
            } else if (product_count > 100) {
                product_count = 99;
            }
            CreateRow(product_count, newRow);
            let price = data_products[i]["fields"]["price"] * product_count;
            sum += price;
            CreateRow(price.toString() + " грн", newRow);
            AddButton(data_products[i]["pk"], newRow)
            // CreateRow("Del", newRow);
        }
    }
    let pSum = document.getElementById("sum");
    pSum.innerText = "Всього: " + sum;
}


function CreateRow(data, row) {
    let cell = row.insertCell();
    let newText = document.createTextNode(data);
    cell.appendChild(newText);
}

// <th scope="row"><img src="images/hero-image.png" className="img-fluid rounded float-start" style="height: 4em;" alt="">
// </th>
function AddImage(data, row) {
    let cell = row.insertCell();
    let img = new Image();
    // img.src = currentLocation + "/media/" + data;
    img.src = currentLocation + "/static/images/product.JPG";
    img.className = "img-fluid rounded float-start";
    img.style = "height: 4em";
    cell.appendChild(img);
}

function AddButton(id, row) {
    let cell = row.insertCell();
    let button = document.createElement("button");
    button.innerHTML = "Видалити";
    button.className = "delete-cart-but";
    button.id = id;
    button.onclick = function () {
        RemoveItemsFromCart("product_" + id, 1);
        if (LocalStorageKeyExists(STORAGE_KEY)) {
            items = GetLocalStorageObject(STORAGE_KEY);
        }
        var myDiv = document.getElementById("cart-tbody");
        myDiv.innerHTML = "";
        createTable();
    };
    cell.appendChild(button);
}

function RemoveItemsFromCart(item, count) {
    let items = GetLocalStorageObject(STORAGE_KEY);
    let current_item_count = items[item];
    if (current_item_count > count) {
        items[item] = current_item_count - count;
    } else if (current_item_count === count) {
        delete items[item]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    console.log(items);
}

LoadProducts();