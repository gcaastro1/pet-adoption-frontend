const spinnerLoading = () => {
  const spinner = document.querySelector("#login__button")
  spinner.innerHTML = `<img id="loading__spinner" src="../../src/img/icon/spinner.svg" alt="spinner-icon">`
}

const spinnerStop = () => {
  const spinner = document.querySelector("#login__button")
  spinner.innerHTML = "Acessar"
}

export { spinnerLoading, spinnerStop }
