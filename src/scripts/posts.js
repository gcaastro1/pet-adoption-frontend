import { dateFormat } from "./home.js"
import { createPost, editAPost, deleteAPost } from "./requests.js"
import { renderPost } from "./home.js"

// Visualizar post

const postModal = (post) => {
  const postContent = document.createElement("div")
  postContent.classList = "flex-column gap-26"

  const postHeader = document.createElement("div")
  postHeader.classList = "flex-row align-center gap-12"

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

  const postTitle = document.createElement("h2")
  postTitle.classList = "font-2 weight-600"
  postTitle.innerText = post.title

  const postDescription = document.createElement("p")
  postDescription.classList = "font-4 weight-400"
  postDescription.innerText = `${post.content}`

  postHeader.append(avatar, username, postDate)
  postContent.append(postHeader, postTitle, postDescription)

  return postContent
}

// Criar novo post

const createNewPost = () => {
  const modalBody = document.createElement("div")
  modalBody.classList = "flex-column gap-40"

  const modalTitle = document.createElement("h3")
  modalTitle.classList = "font-3 weight-500"
  modalTitle.innerText = "Criando novo post"

  const form = document.createElement("form")
  form.classList = "flex-column gap-20"

  const titleBox = document.createElement("div")
  titleBox.classList = "flex-column gap-12"

  const titleLabel = document.createElement("label")
  titleLabel.classList = "font-4 weight-500"
  titleLabel.htmlFor = "title"
  titleLabel.innerText = "Titulo do Post"

  const titleInput = document.createElement("input")
  titleInput.name = "title"
  titleInput.placeholder = "Digite o título aqui..."

  const descriptionBox = document.createElement("div")
  descriptionBox.classList = "flex-column gap-12"

  const descriptionLabel = document.createElement("label")
  descriptionLabel.classList = "font-4 weight-500"
  descriptionLabel.htmlFor = "content"
  descriptionLabel.innerText = "Conteúdo do Post"

  const descriptionInput = document.createElement("textarea")
  descriptionInput.rows = 10
  descriptionInput.name = "content"
  descriptionInput.placeholder = "Desenvolva o conteúdo do post aqui..."

  const buttons = document.createElement("div")
  buttons.classList = "flex-row justify-end gap-12"

  const cancel = document.createElement("button")
  cancel.classList = "btn font-4 weight-500  txt-grey-1 btn-grey btn-md"
  cancel.innerText = "Cancelar"

  cancel.addEventListener("click", (e) => {
    const modal = document.querySelector(".modal-bg")
    const modalContainer = document.querySelector(".modal-container")
    modalContainer.classList.toggle("modal-disappear")
    setTimeout(() => {
      modal.remove()
    }, 900)
  })

  const publish = document.createElement("button")
  publish.classList = "btn font-4 weight-500  txt-grey-9 btn-primary btn-md"
  publish.innerText = "Publicar"

  publish.addEventListener("click", async (e) => {
    e.preventDefault()
    const form = document.querySelector("form")
    const elements = [...form.elements]

    const body = {}
    elements.forEach((input) => {
      if (input.tagName == "INPUT" && input.value !== "") {
        body[input.name] = input.value
      } else if (input.tagName == "TEXTAREA" && input.value !== "") {
        body[input.name] = input.value
      }
    })

    await createPost(body)
    await renderPost()
    //console.log(body)
  })

  titleBox.append(titleLabel, titleInput)
  descriptionBox.append(descriptionLabel, descriptionInput)
  form.append(titleBox, descriptionBox)
  buttons.append(cancel, publish)
  modalBody.append(modalTitle, form, buttons)

  return modalBody
}

// Excluir post

const deletePost = (post) => {
  const modalBody = document.createElement("div")
  modalBody.classList = "flex-column gap-40"

  const titleHeader = document.createElement("h3")
  titleHeader.classList = "font-3 weight-500"
  titleHeader.innerText = "Confirmação de Exclusão"

  const textBox = document.createElement("div")
  textBox.classList = "flex-column gap-12"

  const titleContent = document.createElement("h2")
  titleContent.classList = "font-2 weight-500"
  titleContent.innerText = "Tem certeza que deseja excluir este post?"

  const description = document.createElement("p")
  titleContent.classList = "font-4 weight-400 txt-grey-3"
  titleContent.innerText =
    "Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir"

  const buttons = document.createElement("div")
  buttons.classList = "flex-row gap-12"

  const cancel = document.createElement("button")
  cancel.classList = "btn font-4 weight-500  txt-grey-1 btn-grey btn-md"
  cancel.innerText = "Cancelar"

  cancel.addEventListener("click", (e) => {
    const modal = document.querySelector(".modal-bg")
    const modalContainer = document.querySelector(".modal-container")
    modalContainer.classList.toggle("modal-disappear")
    setTimeout(() => {
      modal.remove()
    }, 900)
  })

  const confirm = document.createElement("button")
  confirm.classList = "btn font-4 weight-500  txt-grey-9 btn-alert btn-md"
  confirm.innerText = "Sim, excluir este post"

  confirm.addEventListener("click", async (e) => {
    await deleteAPost(post.id)
    await renderPost()
  })

  textBox.append(titleContent, description)
  buttons.append(cancel, confirm)
  modalBody.append(titleHeader, textBox, buttons)

  return modalBody
}

const editPost = (post) => {
  const modalBody = document.createElement("div")
  modalBody.classList = "flex-column gap-40"

  const modalTitle = document.createElement("h3")
  modalTitle.classList = "font-3 weight-500"
  modalTitle.innerText = "Edição"

  const form = document.createElement("form")
  form.classList = "flex-column gap-20"

  const titleBox = document.createElement("div")
  titleBox.classList = "flex-column gap-12"

  const titleLabel = document.createElement("label")
  titleLabel.classList = "font-4 weight-500"
  titleLabel.htmlFor = "title"
  titleLabel.innerText = "Titulo do Post"

  const titleInput = document.createElement("input")
  titleInput.name = "title"
  titleInput.placeholder = "Digite o título aqui..."
  titleInput.value = post.title

  const descriptionBox = document.createElement("div")
  descriptionBox.classList = "flex-column gap-12"

  const descriptionLabel = document.createElement("label")
  descriptionLabel.classList = "font-4 weight-500"
  descriptionLabel.htmlFor = "content"
  descriptionLabel.innerText = "Conteúdo do Post"

  const descriptionInput = document.createElement("textarea")
  descriptionInput.rows = 10
  descriptionInput.name = "content"
  descriptionInput.placeholder = "Desenvolva o conteúdo do post aqui..."
  descriptionInput.value = post.content

  const buttons = document.createElement("div")
  buttons.classList = "flex-row justify-end gap-12"

  const cancel = document.createElement("button")
  cancel.classList = "btn font-4 weight-500  txt-grey-1 btn-grey btn-md"
  cancel.innerText = "Cancelar"

  cancel.addEventListener("click", (e) => {
    const modal = document.querySelector(".modal-bg")
    const modalContainer = document.querySelector(".modal-container")
    modalContainer.classList.toggle("modal-disappear")
    setTimeout(() => {
      modal.remove()
    }, 900)
  })

  const publish = document.createElement("button")
  publish.classList = "btn font-4 weight-500  txt-grey-9 btn-primary btn-md"
  publish.innerText = "Salvar Alterações"

  publish.addEventListener("click", async (e) => {
    const form = document.querySelector("form")
    const elements = [...form.elements]

    const body = {}
    elements.forEach((input) => {
      if (input.tagName == "INPUT" && input.value !== "") {
        body[input.name] = input.value
      } else if (input.tagName == "TEXTAREA" && input.value !== "") {
        body[input.name] = input.value
      }
    })

    /* console.log(body) */
    await editAPost(body, post.id)
    await renderPost()
  })

  titleBox.append(titleLabel, titleInput)
  descriptionBox.append(descriptionLabel, descriptionInput)
  form.append(titleBox, descriptionBox)
  buttons.append(cancel, publish)
  modalBody.append(modalTitle, form, buttons)

  return modalBody
}

export { postModal, createNewPost, deletePost, editPost }
