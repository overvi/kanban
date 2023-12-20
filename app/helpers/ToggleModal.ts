export const toggleModal = () => {
  const modals = document.querySelectorAll(".modal-toggle");
  modals.forEach((modal) => ((modal as HTMLInputElement).checked = false));
};
