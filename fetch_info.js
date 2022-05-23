const URL = "./items.json";
const list = document.querySelector(".list");

export function label_splice(label, start_len, last_len) {
    if (label.length > 30) {
        label = label.slice(0, start_len) + "..." + label.slice(-last_len);
    }
    return label;
}

export default async function fetch_info() {
    try {
        const res = await fetch(URL);
        const items = await res.json();
        items.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("list_item");
            let label = item.title;
            label = label_splice(label, 15, 15);
            li.innerHTML = `<img src="${item.previewImage}" class="list_img" alt="">
            <p class="label"> ${label} </p>
            <p class="hidden_label"> ${item.title} </p>`
            list.append(li);
        });
        const selected_li = list.firstElementChild;
        return selected_li;

    } catch (error) {
        console.log(error);
    }


}