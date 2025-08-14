console.log("Profile script loaded");
// This script is loaded on the profile page
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  // Make sure button exists
  if (logoutBtn) logoutBtn.style.display = "inline-block";

  logoutBtn.addEventListener("click", () => {
    // Remove login state
    localStorage.removeItem("loggedInUser");

    // Redirect to home page
    window.location.href = "/home/home_index.html";
  });

  // Check if user is logged in
  const loggedInEmail = localStorage.getItem("loggedInUser");
  if (loggedInEmail) {
    const user = JSON.parse(localStorage.getItem(loggedInEmail));
    if (user) {
      updateUIForLoggedInUser(user.username);
    } else {
      updateUIForLoggedOutUser();
    }
  } else {
    updateUIForLoggedOutUser();
  }
});
