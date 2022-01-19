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
  locationIcon = document.querySelector(".location-icon"),
  website = document.querySelector("#website"),
  websiteIcon = document.querySelector(".website-icon"),
  twitter = document.querySelector("#twitter"),
  twitterIcon = document.querySelector(".twitter-icon"),
  company = document.querySelector("#company"),
  companyIcon = document.querySelector(".company-icon"),
  dark = document.querySelector(".dark"),
  light = document.querySelector(".light"),
  toggleButton = document.querySelector(".toggle-button"),
  body = document.querySelector("body");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const searchForUser = async (usernameInput) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${usernameInput}`
    );
    const unformattedDate = new Date(Date.parse(response.data.created_at));
    const day = unformattedDate.getDate();
    const month = months[unformattedDate.getMonth()];
    const year = unformattedDate.getFullYear();

    const url =
      response.data.blog.length <= 19
        ? response.data.blog
        : `${response.data.blog.slice(0, 16)}...`;
    avatar.src = response.data.avatar_url;
    fullname.textContent =
      response.data.name !== null ? response.data.name : response.data.login;
    username.textContent = response.data.login;
    joinDate.textContent = `${day} ${month} ${year}`;
    bio.textContent =
      response.data.bio !== null
        ? response.data.bio
        : "This profile has no bio";
    bio.style.opacity = response.data.bio !== null ? "1" : "0.75";
    numRepos.textContent = response.data.public_repos;
    numFollowers.textContent = response.data.followers;
    numFollowing.textContent = response.data.following;

    userLocation.textContent =
      response.data.location !== null
        ? response.data.location
        : "Not Available";
    userLocation.style.opacity = response.data.location !== null ? "1" : "0.75";
    locationIcon.style.opacity = response.data.location !== null ? "1" : "0.75";

    website.innerHTML =
      response.data.blog !== null && response.data.blog !== ""
        ? `<a href="${response.data.blog}">${url}</a>`
        : "Not Available";
    website.style.opacity =
      response.data.blog !== null && response.data.blog !== "" ? "1" : "0.75";
    websiteIcon.style.opacity =
      response.data.blog !== null && response.data.blog !== "" ? "1" : "0.75";

    twitter.innerHTML =
      response.data.twitter_username !== null
        ? `<a href="https://twitter.com/${response.data.twitter_username}">@${response.data.twitter_username}</a>`
        : "Not Available";
    twitter.style.opacity =
      response.data.twitter_username !== null ? "1" : "0.75";
    twitterIcon.style.opacity =
      response.data.twitter_username !== null ? "1" : "0.75";

    company.textContent =
      response.data.company !== null ? response.data.company : "Not Available";
    company.style.opacity = response.data.company !== null ? "1" : "0.75";
    companyIcon.style.opacity = response.data.company !== null ? "1" : "0.75";

    errorMessage.style.opacity = "0";
  } catch (err) {
    errorMessage.style.opacity = "1";
  }
};

searchForUser("octocat");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = searchBar.value.trim();
  searchForUser(searchInput);
});

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  light.style.display = "flex";
  dark.style.display = "none";
} else {
  light.style.display = "none";
  dark.style.display = "flex";
}

toggleButton.addEventListener("click", () => {
  if (
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    body.classList.contains("dark-mode")
  ) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    light.style.display = "none";
    dark.style.display = "flex";
  } else if (
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches) ||
    body.classList.contains("light-mode")
  ) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    light.style.display = "flex";
    dark.style.display = "none";
  }
});
