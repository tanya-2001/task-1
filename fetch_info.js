const URL = "./items.json";
const list = document.querySelector(".list");

export function label_slice(label) {
  let start_cnt = 20; //no. of character

  if (label.length > 40) {
    // getting overflow after 40 characters  // to reduce tm complexity
    label = label.slice(0, start_cnt) + "..." + label.slice(-start_cnt);
  }
  const div_slice = document.querySelector(".div_slice");
  div_slice.innerHTML = label;
  let len = div_slice.offsetWidth; // no. of pixels;
  while (len > 220) {
    start_cnt--;
    label = label.slice(0, start_cnt) + "..." + label.slice(-start_cnt);
    div_slice.innerHTML = label;
    len = div_slice.offsetWidth;
  }
  return label;
}

export default async function fetch_info() {
  try {
    const res = await fetch(URL);
    const items = await res.json();
    items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("list_item");
      let label = item.title;
      label = label_slice(label);
      li.innerHTML = `<img src="${item.previewImage}" class="list_img" alt="">
            <p class="label"> ${label} </p>
            <p class="hidden_label"> ${item.title} </p>
            `;
      list.append(li);
    });
    const selected_li = list.firstElementChild;
    return selected_li;
  } catch (error) {
    console.log(error);
  }
}

