console.log("hi");
import fetch_info, { label_splice } from "./fetch_info.js";

const list = document.querySelector(".list");
const img_box_img = document.querySelector(".img_box img");
const img_box_input = document.querySelector(".title");
const elemDiv = document.querySelector(".div_input");
let selected_li;
let previous_selected_li;

fetch_info().then((res) => {
    selected_li = res;
    previous_selected_li = res;
    // console.log(selected_li);
    selected_li.classList.add("selected"); // By default first item is selected
    const img_url = selected_li.querySelector(".list_img").getAttribute("src");
    img_box_img.setAttribute("src", img_url);
    img_box_input.value = selected_li.lastElementChild.innerText;
});

const remove_previous_set_new_selected_li = () => {
    previous_selected_li.classList.remove("selected");
    previous_selected_li = selected_li;
    selected_li.classList.add("selected");

    const img_url = selected_li.querySelector(".list_img").getAttribute("src");

    img_box_img.setAttribute("src", img_url);
    img_box_input.value = selected_li.lastElementChild.innerText;
};

// -------------   when click event occur -----------------------------

list.addEventListener("click", (e) => {
    const target = e.target;
    const items = list.children;
    if (target.classList.contains("list_item")) {
        selected_li = target;
    } else if (target.classList.contains("list_img")) {
        selected_li = target.parentNode;
    } else if (target.classList.contains("label")) {
        selected_li = target.parentNode;
    }
    remove_previous_set_new_selected_li();
    // console.dir(img_box_input);
    autoResize();
});

// -------------------    when arrow up and down key occur   ---------------------

document.body.addEventListener("keydown", (e) => {
    // console.log(e,e.key);
    let items = list.children;
    // console.log(list);
    if (e.key == "ArrowUp") {
        var nextnode = selected_li.previousElementSibling;
        selected_li = nextnode != null ? nextnode : list.lastElementChild;
    } else if (e.key == "ArrowDown") {
        // console.log(selected_li);
        var nextnode = selected_li.nextElementSibling;
        selected_li = nextnode != null ? nextnode : list.firstElementChild;
    } else {
        return;
    }
    remove_previous_set_new_selected_li();
    autoResize();
});

// ---------------      when title is changed   ------------------

img_box_input.addEventListener("input", (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    const label = document.querySelector(".selected .label");
    const hidden_label = document.querySelector(".selected .hidden_label");
    hidden_label.textContent = value;
    label.textContent = label_splice(value, 15, 15);
});

function autoResize() {
    elemDiv.textContent = img_box_input.value;
    console.log(img_box_input.clientWidth + "px");
    const len = Math.ceil(elemDiv.clientWidth / 435);
    img_box_input.setAttribute("rows", len);
    // console.log(img_box_input.getAttribute("rows"), "  ", len);
}

img_box_input.addEventListener("input", autoResize);