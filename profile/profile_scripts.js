console.log("Profile script loaded");
// This script is loaded on the profile page
document.getElementById("logout-btn").style.display = "inline-block";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    updateUIForLoggedOutUser();
    alert("You have logged out.");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loggedInEmail = localStorage.getItem("loggedInUser");
  if (loggedInEmail) {
    const user = JSON.parse(localStorage.getItem(loggedInEmail));
    if (user) {
      updateUIForLoggedInUser(user.username);
      return;
    }
  }
  updateUIForLoggedOutUser();
});
