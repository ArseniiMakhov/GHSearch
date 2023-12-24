export class Search {
  constructor(show) {
    this.show = show;

    this.show.searchInput.addEventListener(
      "keyup",
      this.show.debounce(this.searchUsers.bind(this), 500)
    );

    this.show.recordList.addEventListener("click", this.show.removeRepo);
  }

  async searchUsers() {
    if (this.show.searchInput.value.trim()) {
      return await fetch(
        `https://api.github.com/search/repositories?q=${this.show.searchInput.value}&per_page=5`
      ).then((res) => {
        if (res.ok) {
          this.show.clearRepos();
          res.json().then((res) => {
            res.items.forEach((repo) => {
              this.show.createRepo(repo);
            });
          });
        }
      });
    } else {
      this.show.clearRepos();
    }
  }
}
