export class Show {
  constructor() {
    this.app = document.getElementById("app");

    this.searchBox = this.createElement("div", "search-box");
    this.searchInput = this.createElement("input", "search-input");
    this.searchList = this.createElement("ul", "search-list");
    this.recordList = this.createElement("ul", "record-list");

    this.searchBox.appendChild(this.searchInput);
    this.searchBox.appendChild(this.searchList);

    this.app.appendChild(this.searchBox);
    this.app.appendChild(this.recordList);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  createRepo(data) {
    const searchItem = this.createElement("li", "search-item");
    searchItem.textContent = data.name;
    this.searchList.appendChild(searchItem);
    searchItem.addEventListener("click", () => this.addRepo(data));
  }

  clearRepos() {
    this.searchList.textContent = "";
  }

  debounce(fn, debounceTime) {
    let timer;
    function wrapper() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, debounceTime);
    }
    return wrapper;
  }

  addRepo(repo) {
    const recordItem = this.createElement("li", "record-item");
    recordItem.insertAdjacentHTML(
      "afterbegin",
      `<div class='recordBox'>
        <p>Name: ${repo.name}</p>
        <p>Owner: ${repo.owner.login}</p>
        <p>Stars: ${repo.stargazers_count}</p>
       </div>
       <button type='button' class='closeBtn'></button>`
    );
    this.recordList.appendChild(recordItem);
    this.searchInput.value = "";
    this.clearRepos();
  }

  removeRepo(e) {
    if (e.target.classList.contains("closeBtn")) {
      e.target.parentElement.remove();
    }
  }
}
