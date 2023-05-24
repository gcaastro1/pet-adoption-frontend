import { login } from "./requests.js"

const eventLogin = () => {
  const form = document.querySelector("form")
  const elements = [...form.elements]

  const button = document.querySelector("#login__button")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const body = {}

    elements.forEach((input) => {
      if (input.tagName == "INPUT" && input.value !== "") {
        body[input.name] = input.value
      }
    })

    await login(body)
  })
}

// Travando botão

const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")

const inputChangeLogin = () => {
  const button = document.querySelector("#login__button")
  if (emailInput.value == "") {
    button.disabled = true
  } else if (passwordInput.value == "") {
    button.disabled = true
  } else {
    button.disabled = false
  }
}

emailInput.addEventListener("keyup", inputChangeLogin)
passwordInput.addEventListener("keyup", inputChangeLogin)

inputChangeLogin()
eventLogin()
