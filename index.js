console.log("hi");

const list = document.querySelector(".list");
// console.dir(itemlist);

const URL = "./items.json"
var selected_li;

const fetch_info = async () => {
    try {
        const res = await fetch(URL);
        // console.log(res);
        const items = await res.json();
        // console.log(items);
        items.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("list_item");
            let label = item.title;
            if (label.length > 30) {
                label = label.slice(0, 15) + "..." + label.slice(-15);
            }
            li.innerHTML = `<img src="${item.previewImage}" class="list_img" alt="">
            <p class="label"> ${label} </p>
            <p class="hidden_label"> ${item.title} </p>`
            // console.log(label);
            list.append(li);
        });

        const first_item=list.firstElementChild;
        selected_li=first_item;

        console.log(first_item,selected_li);

        first_item.classList.add("selected");
        const img_box_img = document.querySelector(".img_box img");
        //    console.log(img_box_img);
        img_box_img.setAttribute("src", items[0].previewImage);

        const img_box_input = document.querySelector(".title");
        img_box_input.value = items[0].title;


    } catch (error) {
        console.log(error);
    }
}

fetch_info();



list.addEventListener("click", (e) => {
    const target = e.target;
    
    const items = list.children;
    for (item of items) {

        item.classList.remove("selected");
    }


    if (target.classList.contains("list_item")) {
         selected_li=target;
      
    }
    else if (target.classList.contains("list_img")) {
        selected_li=target.parentNode;
    }
    else if (target.classList.contains("label")) {
        selected_li=target.parentNode;
    }
    selected_li.classList.add("selected");

    const img_box_img = document.querySelector(".img_box img");

    img_url=selected_li.firstElementChild.getAttribute("src");
     
           console.log(img_url);
        img_box_img.setAttribute("src", img_url);

        const img_box_input = document.querySelector(".title");
        console.dir(selected_li.lastElementChild,"***");
        img_box_input.value = selected_li.lastElementChild.innerText;
})

document.addEventListener("keydown",(e)=>{
    // console.log(e,e.key);
    const items = list.children;
   
    if(e.key=="ArrowUp")
    {
        var nextnode=selected_li.previousElementSibling;
        selected_li=(nextnode!=null)?nextnode:selected_li;
    }
    else if(e.key=="ArrowDown")
    {
        // console.log(selected_li);
        var nextnode=selected_li.nextElementSibling;
        selected_li=(nextnode!=null)?nextnode:selected_li;
    }
    else{
        return;
    }
    for (item of items) {

        item.classList.remove("selected");
    }
    selected_li.classList.add("selected");

    const img_box_img = document.querySelector(".img_box img");

    img_url=selected_li.firstElementChild.getAttribute("src");
     
           console.log(img_url);
        img_box_img.setAttribute("src", img_url);

        const img_box_input = document.querySelector(".title");
        console.dir(selected_li.lastElementChild,"***");
        img_box_input.value = selected_li.lastElementChild.innerText;

})

const img_box_input = document.querySelector(".title");
console.log(img_box_input);

img_box_input.addEventListener("input",(e)=>{
    console.log(e.target.value);
    const label=document.querySelector(".selected .label")
    const hidden_label=document.querySelector(".selected .hidden_label")
    console.log(label);
    label.textContent=e.target.value;
    hidden_label.textContent=e.target.value;
})


