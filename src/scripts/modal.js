const openModal = (children) => {
  const body = document.querySelector("body")

  const modalBg = document.createElement("section")
  modalBg.classList = "modal-bg"

  const modalContainer = document.createElement("section")
  modalContainer.classList = "modal-container"

  const closeModal = document.createElement("button")
  closeModal.classList = "modal-close btn btn-grey"
  closeModal.innerText = "X"

  modalBg.addEventListener("click", (e) => {
    const { className } = e.target
    if (className === "modal-bg" || className === "modal-close btn btn-grey") {
      modalContainer.classList.toggle("modal-disappear")
      setTimeout(() => {
        modalBg.remove()
      }, 900)
    }
  })

  modalContainer.append(closeModal, children)
  modalBg.appendChild(modalContainer)
  body.appendChild(modalBg)
}

export { openModal }
