siteLocalStorage = window.localStorage;
STORAGE_KEY = "tasty_step_cart"

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

function LoadJSONData() {
    let imagesURL = currentLocation + "/images/"
    let productsURL = currentLocation + "/products/"

    $.ajax({
        url: productsURL,
        dataType: "json",
        context: document.body,
        success: function (data) {
            data_products = data;
            $.ajax({
                url: imagesURL,
                dataType: "json",
                context: document.body,
                success: function (data) {
                    data_images = data;
                    if (isEmpty(items)) {
                        document.getElementById("table-container").style.display = "none";
                        document.getElementById("empty-cart").style.display = "block";
                        document.getElementById("empty-cart-nav").style.display = "none";
                    } else {
                        createTable();
                    }

                }
            });
        }
    });

}

function LoadProducts() {
    if (LocalStorageKeyExists(STORAGE_KEY)) {
        items = GetLocalStorageObject(STORAGE_KEY);
        // console.log(items)
        LoadJSONData();
    }

}


function createTable() {
    let tableRef = document.getElementById("cart-tbody");

    // console.log(data_products[1]["fields"]["title"]);
    // console.log(data_images[1]["fields"]);
    // console.log(data_products[1])
    let sum = 0;
    for (let i = 0; i < data_products.length; i++) {
        let identifier = "product_" + data_products[i]["pk"];
        if (identifier in items) {
            let newRow = tableRef.insertRow();
            // CreateRow(data_images[i]["pk"], newRow);
            AddImage(data_images[i]["fields"]["image"], newRow)
            CreateRow(data_products[i]["fields"]["title"], newRow);
            // CreateRow(data_products[i]["fields"]["description"], newRow);
            let product_count = items[identifier];
            if (product_count < 1) {
                product_count = 1;
            }
            CreateRow(product_count, newRow);
            let price = data_products[i]["fields"]["price"] * product_count;
            sum += price;
            CreateRow(price.toString() + " ??????", newRow);
            AddButton(data_products[i]["pk"], newRow)
        }
    }
    let input = document.getElementById("cart-input");
    input.value = localStorage.getItem(STORAGE_KEY);
    let pSum = document.getElementById("sum");
    pSum.innerText = "????????????: " + sum + " ??????";
}


function CreateRow(data, row) {
    let cell = row.insertCell();
    let newText = document.createTextNode(data);
    cell.appendChild(newText);
}

function AddImage(data, row) {
    let cell = row.insertCell();
    let img = new Image();
    img.src = "/media/" + data;
    img.className = "img-fluid rounded";
    img.style = "height: 4em";
    cell.appendChild(img);
}

function AddButton(id, row) {
    let cell = row.insertCell();
    let button = document.createElement("button");
    var delete_icon = document.createElement('img')
    delete_icon.src = '/static/images/icons/trash.svg'
    button.className = "delete-cart-but btn";
    button.appendChild(delete_icon)
    button.id = id;
    button.onclick = function () {
        RemoveItemsFromCart("product_" + id, 1000);
        if (LocalStorageKeyExists(STORAGE_KEY)) {
            items = GetLocalStorageObject(STORAGE_KEY);
        }
        var myDiv = document.getElementById("cart-tbody");
        myDiv.innerHTML = "";
        createTable();
    };
    cell.appendChild(button);
}

function AddPlusButton(id, row) {
    let cell = row.insertCell();
    let button = document.createElement("button");
    var delete_icon = document.createElement('img')
    delete_icon.src = '/static/images/icons/trash.svg'
    button.className = "delete-cart-but btn";
    button.appendChild(delete_icon)
    button.id = id;
    button.onclick = function () {
        RemoveItemsFromCart("product_" + id, 1000);
        if (LocalStorageKeyExists(STORAGE_KEY)) {
            items = GetLocalStorageObject(STORAGE_KEY);
        }
        var myDiv = document.getElementById("cart-tbody");
        myDiv.innerHTML = "";
        createTable();
    };
    cell.appendChild(button);
}

function AddMinusButton(id, row) {
    let cell = row.insertCell();
    let button = document.createElement("button");
    var delete_icon = document.createElement('img')
    delete_icon.src = '/static/images/icons/trash.svg'
    button.className = "delete-cart-but btn";
    button.appendChild(delete_icon)
    button.id = id;
    button.onclick = function () {
        RemoveItemsFromCart("product_" + id, 1000);
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
    if (count === 1) {
        items[item] = current_item_count - count;
    } else if (count === 1000) {
        delete items[item]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    items = GetLocalStorageObject(STORAGE_KEY);

    if (isEmpty(items)) {
        document.getElementById("table-container").style.display = "none";
        document.getElementById("empty-cart").style.display = "block";
        document.getElementById("empty-cart-nav").style.display = "none";
    }
    // console.log(items);
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

LoadProducts();