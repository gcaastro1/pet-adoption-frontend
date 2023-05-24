const toast = (title, message) => {
  const body = document.querySelector("body")

  const container = document.createElement("div")
  container.classList = "toast-container"

  const toastHeader = document.createElement("div")
  toastHeader.classList = "flex-row align-center gap-12"

  const icon = document.createElement("img")
  icon.classList = "success-toast"
  icon.src = "/src/img/icon/check.svg"

  const titleToast = document.createElement("p")
  titleToast.classList = "font-4 weight-500 txt-success"
  titleToast.innerText = title

  const messageToast = document.createElement("p")
  messageToast.classList = "font-5 weight-400 txt-grey-2"
  messageToast.innerHTML = message

  toastHeader.append(icon, titleToast)
  container.append(toastHeader, messageToast)
  body.append(container)
}

export { toast }
