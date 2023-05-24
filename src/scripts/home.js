import { getLocalStorage } from "./localStorage.js"
import { getUser, getPosts } from "./requests.js"
import { createNewPost, postModal, deletePost, editPost } from "./posts.js"
import { openModal } from "./modal.js"

// Verificar permissão no localStorage

const verifyPermission = () => {
  const token = getLocalStorage()
  //console.log(token)
  if (token == "") {
    window.location.href = ""
  }
}

verifyPermission()

// Criar parte dinamica do header

const renderHeader = async () => {
  const headerButtons = document.querySelector(".header-buttons")
  const user = await getUser()

  const modalButton = document.createElement("button")
  modalButton.classList = "btn btn-primary btn-md"
  modalButton.innerText = "Criar publicação"
  modalButton.addEventListener("click", (e) => {
    const content = createNewPost()
    openModal(content)
  })

  const userBox = document.createElement("div")
  userBox.classList = "user-box"

  const userAvatar = document.createElement("img")
  userAvatar.classList = "user-icon icon-border"
  userAvatar.src = `${user.avatar}`

  const dropdown = document.createElement("ul")
  dropdown.classList = "user-dropdown"

  const username = document.createElement("li")
  username.classList = "font-4 weight-600"
  username.innerText = `@${user.username}`

  const exit = document.createElement("li")
  exit.classList = "flex-row gap-18"

  exit.addEventListener("click", (e) => {
    localStorage.removeItem("token")
    window.location.href = "/index.html"
  })

  const exitIcon = document.createElement("div")
  exitIcon.classList = "exit-icon"

  const exitText = document.createElement("p")
  exitText.classList = "font-4 weight-500"
  exitText.innerText = "Sair da conta"

  exit.append(exitIcon, exitText)
  dropdown.append(username, exit)
  userBox.append(userAvatar, dropdown)
  headerButtons.append(modalButton, userBox)

  return headerButtons
}

renderHeader()

//Criar posts

const createPost = (post, user) => {
  const postCard = document.createElement("li")
  postCard.classList = "flex-column gap-12"

  const postHeader = document.createElement("div")
  postHeader.classList = "flex-row-btw"

  const userInfo = document.createElement("div")
  userInfo.classList = "flex-row align-center gap-12"

  const avatar = document.createElement("img")
  avatar.classList = "user-icon-post icon-border"
  avatar.src = `${post.user.avatar}`
  avatar.alt = "Avatar do Usuário"

  const username = document.createElement("p")
  username.classList = "font-4 weight-500"
  username.innerText = post.user.username

  const postDate = document.createElement("p")
  postDate.classList = "font-4 weight-500 txt-grey-4"
  const date = new Date(post.createdAt)
  const createdAt = dateFormat(date)
  //console.log(createdAt)
  postDate.innerText = createdAt

  const buttons = document.createElement("div")
  buttons.classList = "flex-row align-center gap-12"

  const editButton = document.createElement("button")
  editButton.innerText = "Editar"
  if (user.id == post.user.id) {
    editButton.classList = "btn font-5 txt-grey-1 btn-outline"
    editButton.addEventListener("click", (e) => {
      const content = editPost(post)
      openModal(content)
    })
  } else {
    editButton.classList = "btn font-5 txt-grey-1 btn-grey"
    editButton.disabled = true
  }

  const deleteButton = document.createElement("button")
  deleteButton.innerText = "Excluir"
  if (user.id == post.user.id) {
    deleteButton.classList = "btn font-5 txt-grey-9 btn-alert"
    deleteButton.addEventListener("click", (e) => {
      const content = deletePost(post)
      openModal(content)
    })
  } else {
    deleteButton.classList = "btn font-5 txt-grey-1 btn-grey"
    deleteButton.disabled = true
  }

  const title = document.createElement("h2")
  title.classList = "font-2 weight-600"
  title.innerText = post.title

  const description = document.createElement("p")
  description.classList = "font-4 weight-400"
  description.innerText = `${post.content.substring(0, 180)}...`

  const readPost = document.createElement("button")
  readPost.classList = "btn font-4 weight-500 txt-primary btn-link"
  readPost.innerText = "Acessar publicação"

  readPost.addEventListener("click", (e) => {
    const content = postModal(post)
    openModal(content)
  })

  userInfo.append(avatar, username, postDate)
  buttons.append(editButton, deleteButton)
  postHeader.append(userInfo, buttons)
  postCard.append(postHeader, title, description, readPost)

  return postCard
}

const renderPost = async () => {
  const feedList = document.querySelector(".posts")
  const user = await getUser()
  const posts = await getPosts()

  feedList.innerHTML = ""

  posts.forEach((post) => {
    const card = createPost(post, user)
    feedList.append(card)
  })
}

// Função para formatar a data

const dateFormat = (post) => {
  const options = { month: "long" }
  const date1 = new Date(post),
    year = date1.getFullYear(),
    // Convertendo o valor do mês para string em pt-br
    month = new Intl.DateTimeFormat("pt-BR", options).format(date1)

  let finalMonth = month[0].toUpperCase() + month.substring(1)

  return `${finalMonth} de ${year}`
}

renderPost()

export { dateFormat, renderPost }
