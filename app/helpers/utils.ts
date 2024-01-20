function toggleSidebar(show: boolean) {
  const navBar = document.querySelector(".nav");
  const showSide = document.querySelector(".showSide");
  const sideBar = document.querySelector(".side");
  const todos = document.querySelector(".todos");
  const board = document.querySelector(".board-container");

  if (show) {
    navBar?.classList.remove("hide");
    showSide?.classList.add("opacity-0");
    sideBar?.classList.add("md:block");
    todos?.classList.remove("w-screen");
    board?.classList.remove("!left-0");
  } else {
    navBar?.classList.add("hide");
    showSide?.classList.remove("opacity-0");
    todos?.classList.add("w-screen");
    sideBar?.classList.remove("md:block");
    board?.classList.add("!left-0");
  }
}

export default toggleSidebar;
