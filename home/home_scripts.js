console.log("Home script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const loginModal = document.getElementById("login-modal");
  const signupModal = document.getElementById("signup-modal");
  const switchToSignup = document.getElementById("switch-to-signup");
  const switchToLogin = document.getElementById("switch-to-login");

  // Open login modal
  loginBtn.addEventListener("click", () => {
    loginModal.classList.add("show");
    loginModal.setAttribute("aria-hidden", "false");
  });

  // Close modals
  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    });
  });

  // Click outside content closes modal
  [loginModal, signupModal].forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });

  // Switch between modals
  switchToSignup.addEventListener("click", () => {
    loginModal.classList.remove("show");
    signupModal.classList.add("show");
  });

  switchToLogin.addEventListener("click", () => {
    signupModal.classList.remove("show");
    loginModal.classList.add("show");
  });

  // Prevent actual form submission for now
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    loginModal.classList.remove("show");
    alert("Simulated Log In");
  });

  document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    signupModal.classList.remove("show");
    alert("Simulated Sign Up");
  });
});

// Sign up form
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Stop form from refreshing the page

  // Get input values
  const username = document.getElementById("signup-user").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-pass").value;

  // Create a user object
  const newUser = { username, email, password };

  // Save user to localStorage (key = email)
  localStorage.setItem(email, JSON.stringify(newUser));

  alert("Signup successful! You can now log in.");

  // Clear form inputs (optional)
  e.target.reset();

  // Close signup modal and open login modal (if you want)
  document.getElementById("signup-modal").classList.remove("show");
  document.getElementById("login-modal").classList.add("show");
});

// Log in form
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload

  // Get input values
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-pass").value;

  // Retrieve saved user from localStorage
  const savedUserJSON = localStorage.getItem(email);

  if (!savedUserJSON) {
    alert("No user found with that email.");
    return;
  }

  const savedUser = JSON.parse(savedUserJSON);

  // Check if password matches
  if (savedUser.password === password) {
    alert(`Welcome back, ${savedUser.username}!`);

    // Save logged-in user email in localStorage for session
    localStorage.setItem("loggedInUser", email);

    // Hide login modal, show profile link etc (you handle UI)
    document.getElementById("login-modal").classList.remove("show");
    updateUIForLoggedInUser(savedUser.username);
  } else {
    alert("Incorrect password, please try again.");
  }
});

// check if user is logged in
function updateUIForLoggedInUser(username) {
  document.getElementById("profile-link").style.display = "inline-block";
  document.getElementById("login-btn").style.display = "none";
  document.getElementById("logout-btn").style.display = "inline-block";
  // Optionally, show username somewhere on the page
  // Example: document.getElementById('username-display').textContent = username;
}
function updateUIForLoggedOutUser() {
  document.getElementById("profile-link").style.display = "none";
  document.getElementById("login-btn").style.display = "inline-block";
  document.getElementById("logout-btn").style.display = "none";
}

// Check localStorage on page load
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

document.getElementById("logout-btn").style.display = "none";
