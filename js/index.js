const searchForm = document.querySelector("#search-form"),
  searchBar = document.querySelector("#search-bar"),
  errorMessage = document.querySelector("#error-message"),
  avatar = document.querySelector("#avatar-image"),
  fullname = document.querySelector("#fullname"),
  username = document.querySelector("#username"),
  joinDate = document.querySelector("#join-date"),
  bio = document.querySelector("#bio"),
  numRepos = document.querySelector("#num-repos"),
  numFollowers = document.querySelector("#num-followers"),
  numFollowing = document.querySelector("#num-following"),
  userLocation = document.querySelector("#location"),
  website = document.querySelector("#website"),
  twitter = document.querySelector("#twitter"),
  company = document.querySelector("#company");

const searchForUser = async (usernameInput) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${usernameInput}`
    );
    console.log(response);
    avatar.src = response.data.avatar_url;
    fullname.textContent =
      response.data.name !== null ? response.data.name : response.data.login;
    username.textContent = response.data.login;
    joinDate.textContent = response.data.created_at;
    bio.textContent =
      response.data.bio !== null
        ? response.data.bio
        : "This profile has no bio";
    numRepos.textContent = response.data.public_repos;
    numFollowers.textContent = response.data.followers;
    numFollowing.textContent = response.data.following;
    userLocation.textContent =
      response.data.location !== null
        ? response.data.location
        : "Not Available";
    website.innerHTML =
      response.data.blog !== null
        ? `<a href="${response.data.blog}">${response.data.blog}</a>`
        : "Not Available";
    twitter.innerHTML =
      response.data.twitter_username !== null
        ? `<a href="https://twitter.com/${response.data.twitter_username}">@${response.data.twitter_username}</a>`
        : "Not Available";
    company.textContent =
      response.data.company !== null ? response.data.company : "Not Available";
    errorMessage.style.display = "none";
  } catch (err) {
    errorMessage.style.display = "block";
  }
};

searchForUser("octocat");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = searchBar.value;
  searchForUser(searchInput);
});
