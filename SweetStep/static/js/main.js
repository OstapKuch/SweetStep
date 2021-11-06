siteLocalStorage = window.localStorage;
STORAGE_KEY = "tasty_step_cart"


function LocalStorageKeyExists(storageKey) {
    return localStorage.getItem(storageKey) !== null;
}

function LoadSite() {
    if (LocalStorageKeyExists(STORAGE_KEY)) {
        let items = GetLocalStorageObject(STORAGE_KEY);
        ShowCart(items);
    }
}

function AddItemToCart(item, count) {
    let itemsDict = {};
    if (LocalStorageKeyExists(STORAGE_KEY)) {
        itemsDict = GetLocalStorageObject(STORAGE_KEY);
        if (itemsDict.hasOwnProperty(item)) {
            count = itemsDict[item] + 1
        }
    }
    itemsDict[item] = count
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsDict));
    ShowCart(itemsDict);
    // console.log(itemsDict);

}


function GetLocalStorageObject(key) {
    let cartItems = localStorage.getItem(key);
    return JSON.parse(cartItems);
}

function ShowCart(items) {
    const sum = GetDictValuesSum(items).toString();
    if (sum >= 1) {
        document.getElementById("cart").style.visibility = "visible";
    } else {
        document.getElementById("cart").style.visibility = "hidden";
    }
    document.getElementById("cart_items_count").innerText = sum;
}

function GetDictValuesSum(dictionary) {
    let sum = 0;
    for (let key in dictionary) {
        sum += dictionary[key];
    }
    return sum
}

function WayForPay() {
    let currentLocation = window.location.origin;
    $.ajax({
        url: currentLocation + "/wayforpay/",
        type: 'POST',
        headers: {"X-CSRFToken": getCookie("csrftoken")},
        dataType: "json",
        context: document.body,
        data: JSON.stringify({
            cart: localStorage.getItem(STORAGE_KEY),
            name: document.getElementById("firstName").value,
            surname: document.getElementById("Surname").value,
            middle_name: document.getElementById("middleName").value,
            phone: document.getElementById("Phone").value,
            email: document.getElementById("Email").value,
            post: document.getElementById("PostOffice").value
        }),

        success: function (data) {
            let payForm = document.getElementById("wayforpay-form");

            var input = document.createElement("input");
            input.style = "display: none";
            input.name = "orderReference";
            input.value = data["order_reference"];
            payForm.appendChild(input);

            var input = document.createElement("input");
            input.style = "display: none";
            input.name = "orderDate";
            input.value = "1415379863";
            payForm.appendChild(input);

            var input = document.createElement("input");
            input.style = "display: none";
            input.name = "amount";
            input.value = data["amount"];
            payForm.appendChild(input);

            let len = data["product_name"].length;
            for (let i = 0; i < len; i++) {
                var input = document.createElement("input");
                input.style = "display: none";
                input.name = "productName[]";
                input.value = data["product_name"][i];
                payForm.appendChild(input);
            }
            for (let i = 0; i < len; i++) {
                var input = document.createElement("input");
                input.style = "display: none";
                input.name = "productPrice[]";
                input.value = data["product_price"][i];
                payForm.appendChild(input);
            }
            for (let i = 0; i < len; i++) {
                var input = document.createElement("input");
                input.style = "display: none";
                input.name = "productCount[]";
                input.value = data["product_count"][i];
                payForm.appendChild(input);
            }

            var input = document.createElement("input");
            input.style = "display: none";
            input.name = "clientFirstName";
            input.value = document.getElementById("firstName").value;
            payForm.appendChild(input);

            var input = document.createElement("input");
            input.style = "display: none";
            input.name = "clientLastName";
            input.value = document.getElementById("Surname").value;
            payForm.appendChild(input);

            var input = document.createElement("input");
            input.style = "display: none";
            input.name = "clientEmail";
            input.value = document.getElementById("Email").value;
            payForm.appendChild(input);

            var input = document.createElement("input");
            input.style = "display: none";
            input.name = "merchantSignature";
            input.value = data["key"];
            payForm.appendChild(input);

            let button = document.getElementById("form-button");
            button.click();
        }
    });
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}

function btnFormDisable() {
    if (document.getElementsByClassName('form-control').valueOf() == null) {
        document.getElementById('sb-btn').classList.add('disabled')
    }

}

btnFormDisable()

LoadSite();