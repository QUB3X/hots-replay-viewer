const navbarBtn = document.querySelector("#navbar-burger")
const navbar = document.querySelector(".navbar-menu")
navbarBtn.addEventListener('click', () => {
  navbarBtn.classList.toggle("is-active")
  navbar.classList.toggle("is-active")
})