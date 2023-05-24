const formError = (id, response) => {
  const input = document.querySelector(`#${id}__input`)
  const errorMessage = document.createElement("p")

  removeError()

  errorMessage.classList = "txt-alert font-5 weight-400"
  errorMessage.innerText = `${response.message}`

  input.children[1].style.border = "1px solid var(--alert100)"

  input.appendChild(errorMessage)
}

const removeError = () => {
  const inputEmail = document.querySelector(`#email__input`)
  const inputPass = document.querySelector(`#pass__input`)

  // Trocando a borda de volta para a cor normal
  // Tentei trocar direto, mas não tava indo, então por isso usei o none pra resetar.

  inputEmail.children[1].style.border = "none"
  inputEmail.children[1].style.border = "1px solid  var(--gray600)"

  inputPass.children[1].style.border = "none"
  inputPass.children[1].style.border = "1px solid  var(--gray600)"

  // Removendo os textos embaixo do input para ficar menos
  // poluido depois que o usuario tentar novamente

  if (inputEmail.children.length == 3) {
    inputEmail.children[2].remove()
  }

  if (inputPass.children.length == 3) {
    inputPass.children[2].remove()
  }
}

export { formError, removeError }
