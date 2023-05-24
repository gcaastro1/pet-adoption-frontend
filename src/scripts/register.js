import { register } from "./requests.js"

const eventRegister = () => {
  const form = document.querySelector("form")
  const elements = [...form.elements]

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const body = {}

    elements.forEach((input) => {
      if (input.tagName == "INPUT" && input.value !== "") {
        body[input.name] = input.value
      }
    })

    //console.log(body)

    await register(body)
  })
}

//Travar botões
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const avatarInput = document.querySelector("#password")
const usernameInput = document.querySelector("#password")

const inputChangeLogin = () => {
  const button = document.querySelector("#button__submit")
  if (emailInput.value == "") {
    button.disabled = true
  } else if (passwordInput.value == "") {
    button.disabled = true
  } else if (avatarInput.value == "") {
    button.disabled = true
  } else if (usernameInput.value == "") {
    button.disabled = true
  } else {
    button.disabled = false
  }
}

emailInput.addEventListener("keyup", inputChangeLogin)
passwordInput.addEventListener("keyup", inputChangeLogin)
avatarInput.addEventListener("keyup", inputChangeLogin)
usernameInput.addEventListener("keyup", inputChangeLogin)

inputChangeLogin()
eventRegister()
