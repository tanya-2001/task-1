console.log("hi");

const itemlist = document.querySelector(".list");
// console.dir(itemlist);

const URL = "./items.json"


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
            if (label.length > 25) {
                label = label.slice(0, 15) + "..." + label.slice(-15);
            }
            li.innerHTML = `<img src="${item.previewImage}" class="list_img" alt="">
            <p class="label"> ${label} </p>`
           console.log(label);
          itemlist.append(li);
        });
       const img_box_img=document.querySelector(".img_box img");
       console.log(img_box_img);
       img_box_img.setAttribute("src",items[0].previewImage);

       const img_box_input=document.querySelector(".title");
       img_box_input.value=items[0].title;
       

    } catch (error) {
        console.log(error);
    }


}

fetch_info();




