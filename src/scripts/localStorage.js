export const getLocalStorage = () => {
  const token = JSON.parse(localStorage.getItem("token")) || ""

  return token
}
