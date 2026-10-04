const search_bar = document.querySelector(".search-bar");
const usernameInput = document.querySelector("#usernameInput");
const searchBtn = document.querySelector("#searchBtn");
const avatar = document.querySelector(".avatar");
const username_output = document.querySelector(".username");
const bio = document.querySelector(".bio");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const publicReposCount = document.querySelector(".publicReposCount");
const topRepos = document.querySelector(".topRepos");
const result_container = document.querySelector(".result-container");
// movement
window.onload = function () {
  usernameInput.focus();
};

usernameInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

//        global veriable
let USERNAME;

// API
async function CallApi(USERNAME) {
  try {
    const profileRes = await fetch(`https://api.github.com/users/${USERNAME}`);

    if (!profileRes.ok) {
      result_container.textContent = "NO RESULT FOUND";
      return;
    }

    const data = await profileRes.json();
    avatar.src = data.avatar_url;
    username_output.textContent = data.login;
    followers.textContent = data.followers;
    following.textContent = data.following;
    publicReposCount.textContent = data.public_repos;

    if (data.bio !== null) {
      bio.textContent = data.bio;
    } else {
      bio.textContent = "BIO IS EMPTY";
    }

    // ===== NAYA: Top Repos Fetch Karna =====
    const reposRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos`,
    );
    const reposData = await reposRes.json();

    const sortedRepos = reposData.sort(function (a, b) {
      return b.stargazers_count - a.stargazers_count;
    });

    const top5 = sortedRepos.slice(0, 5);

    topRepos.innerHTML = ""; // purani list clear karo (naya search karne pe)

    top5.forEach(function (repo) {
      let repoDiv = document.createElement("div");
      repoDiv.textContent = repo.name + " ⭐ " + repo.stargazers_count;
      topRepos.append(repoDiv);
    });
  } catch (error) {
    result_container.textContent = "NO RESULT FOUND";
  }
}

//     LOGIC

searchBtn.addEventListener("click", () => {
  if (usernameInput.value !== "") {
    USERNAME = usernameInput.value;
    CallApi(USERNAME);
  } else {
    usernameInput.placeholder = "Enter User-name first";
    setTimeout(() => {
      usernameInput.placeholder = "@username";
    }, 1200);
  }
});
