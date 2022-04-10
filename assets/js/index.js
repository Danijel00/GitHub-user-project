"use strict";

// API
const APIURL = "https://api.github.com/users/";

// SELECTORS
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// USER
getUser("Danijel00");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  createUserCard(respData);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
        <div>
            <img
                src="${user.avatar_url}"
                alt="${user.name}"
                class="card-img"
            />
            </div>
            <div class="user">
                <h2 class="user-heading">${user.name}</h2>
                <p class="user-about">${user.bio}</p>
                <ul class="user-info">
                    <li class="user-info__list">
                        <i class="fas fa-user-friends"></i>${user.followers}<strong>Followers</strong>
                    </li>
                    <li class="user-info__list">${user.following}<strong>Following</strong></li>
                    <li class="user-info__list">
                        <i class="fas fa-book"></i>${user.public_repos}<strong>Repos</strong>
                    </li>
                </ul>
            <h4>Repos <i class="fa-solid fa-turn-down"></i></h4>
            <div class="user-repos" id="repos"></div>
        </div>
    </div>
    `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposElement = document.getElementById("repos");

  repos
    // stargazers_count - Function used to determine the order of the elements
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoElement = document.createElement("a");
      repoElement.classList.add("user-repo");

      repoElement.href = repo.html_url;
      repoElement.target = "_blank";
      repoElement.innerText = repo.name;

      reposElement.appendChild(repoElement);
    });
}

// FUNCTIONALITY
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
