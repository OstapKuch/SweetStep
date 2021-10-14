siteLocalStorage = window.localStorage;
STORAGE_KEY = "cart"


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
    console.log(itemsDict);

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




LoadSite();