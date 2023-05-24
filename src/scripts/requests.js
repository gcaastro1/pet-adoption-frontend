import { getLocalStorage } from "./localStorage.js"
import { formError, removeError } from "./error.js"
import { spinnerLoading, spinnerStop } from "./spinner.js"
import { toast } from "./toast.js"

const baseUrl = "http://localhost:3333/"

const login = async (body) => {
  spinnerLoading()
  try {
    const request = await fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (request.ok) {
      removeError()
      const response = await request.json()
      localStorage.setItem("token", JSON.stringify(response))

      setTimeout(() => {
        spinnerStop()
        window.location.href = "/src/pages/home/index.html"
      }, 3000)
    } else {
      const response = await request.json()
      //console.log(response)
      if (response.message == "A senha está incorreta") {
        formError("pass", response)
      } else if (response.message == "O email está incorreto") {
        formError("email", response)
      }

      spinnerStop()
    }
  } catch (err) {
    //console.log(request.json())
    spinnerStop()
  }
}

const register = async (body) => {
  try {
    const request = await fetch(baseUrl + "users/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (request.ok) {
      toast(
        "Sua conta foi criada com sucesso!",
        "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href='/pages/login/index.html' class='btn font-5 weight-400 txt-primary btn-link' >Acessar página de login</a>"
      )
      setTimeout(() => {
        window.location.href = "/index.html"
      }, 4000)
    } else {
      console.log("Deu erro no if")
    }
  } catch (err) {
    console.log(err)
  }
}

const getUser = async () => {
  const localStorage = getLocalStorage()

  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })

    const response = await request.json()
    //console.log()
    return response
  } catch (err) {
    console.log(err)
  }
}

const getPosts = async () => {
  const localStorage = getLocalStorage()

  try {
    const request = await fetch(baseUrl + "posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })

    const response = await request.json()
    //console.log()
    return response
  } catch (err) {
    console.log(err)
  }
}

const createPost = async (body) => {
  const localStorage = getLocalStorage()

  try {
    const request = await fetch(baseUrl + "posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    })

    if (request.ok) {
      setTimeout(() => {
        const modal = document.querySelector(".modal-bg")
        modal.remove()
      }, 1000)
    } else {
      console.log("Erro")
    }
  } catch (err) {
    console.log(err)
  }
}

const editAPost = async (body, id) => {
  const localStorage = getLocalStorage()

  try {
    const request = await fetch(baseUrl + "posts/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    })

    if (request.ok) {
      setTimeout(() => {
        const modal = document.querySelector(".modal-bg")
        modal.remove()
      }, 1000)
    } else {
      console.log("Deu erro no if")
    }
  } catch (err) {
    console.log(err)
  }
}

const deleteAPost = async (id) => {
  const localStorage = getLocalStorage()

  try {
    const request = await fetch(baseUrl + "posts/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
    if (request.ok) {
      const modal = document.querySelector(".modal-bg")
      const modalContainer = document.querySelector(".modal-container")
      modalContainer.classList.toggle("modal-disappear")
      setTimeout(() => {
        modal.remove()
      }, 900)
      toast(
        "Post deletado com sucesso!",
        "O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed."
      )
    } else {
      console.log("Deu erro no if")
    }
  } catch (err) {
    console.log(err)
  }
}

export {
  login,
  register,
  getUser,
  getPosts,
  createPost,
  editAPost,
  deleteAPost,
}
