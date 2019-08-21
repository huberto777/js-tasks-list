const form = document.querySelector("form");
const input = document.querySelector("input");
const search = document.querySelector("input.search");
const ul = document.querySelector("ul");
const tasks = [];
ul.style.margin = "0";
ul.style.padding = "0";

const addTask = e => {
  e.preventDefault();
  // console.log('add');
  const task = input.value;
  if (task === "" || input.value.length < 3) return;
  const li = document.createElement("li");
  li.className = "task text-white p-2";
  li.style.listStyleType = "none";
  li.innerHTML = "<input type='checkbox'> " + task + " <button>del</button>";
  const del = li.querySelector("button");
  const check = li.querySelector("input");
  del.className = "btn btn-danger btn-sm";
  del.style.float = "right";
  tasks.push(li);
  render();
  input.value = "";
  del.addEventListener("click", deleteTask);
  check.addEventListener("input", checkTask);
};

const render = () => {
  ul.textContent = "";
  tasks.forEach((li, key) => {
    // console.log(li, key);
    li.dataset.key = key;
    ul.appendChild(li);
  });
};

const deleteTask = e => {
  // console.log(e.target.parentNode);
  e.target.parentNode.remove();
  const index = e.target.parentNode.dataset.key;
  tasks.splice(index, 1);
  render();
};

const checkTask = e => {
  //   console.log(e.target.checked); // true, false
  console.log(e.target.parentNode);
  if (e.target.checked === true) {
    e.target.parentNode.style.textDecoration = "line-through";
    // e.target.parentNode.className = "checked";
    e.target.parentNode.style.backgroundColor = "red";
  } else {
    e.target.parentNode.style.textDecoration = "";
    // e.target.parentNode.className = "";
    e.target.parentNode.style.backgroundColor = "";
  }
};

const searchTask = e => {
  // console.log(e.target.value);
  const searchItem = e.target.value.toLowerCase();
  let lists = tasks.filter(task =>
    task.textContent.toLowerCase().includes(searchItem)
  );
  ul.textContent = "";
  lists.forEach(li => ul.appendChild(li));
  if (searchItem === "") {
    render();
  }
};

form.addEventListener("submit", addTask);
search.addEventListener("input", searchTask);
