import { useEffect, useState } from "react"

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  console.log("authenticateduser", authenticatedUser)

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    console.log("user from local storage", userFromLocalStorage)
    setAuthenticatedUser(userFromLocalStorage)
  }, [])

  const handleSubmit = event => {
    event.preventDefault()

    const fetchOptions = {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({ ...user })
    }

    fetch("http://localhost:3030/signup", fetchOptions)
      .then(res => res.json())
      .then(data => {
        const user = data.data
        setAuthenticatedUser(user)
        localStorage.setItem("user", JSON.stringify(user))
      })
  }

  const handleSignIn = event => {
    event.preventDefault()

    const fetchOptions = {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({ ...user })
    }

    fetch("http://localhost:3030/login", fetchOptions)
      .then(res => res.json())
      .then(data => {
        const user = data.data

        console.log("inside sign in fetch", user)
        if (user) {
          setAuthenticatedUser(user)
          localStorage.setItem("user", JSON.stringify(user))
        }
      })
  }


  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    console.log("name", name)
    console.log("value", value)

    setUser({ ...user, [name]: value })
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={handleChange}></input>
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={handleSignIn}>
        <h2>Log In</h2>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={handleChange}></input>
        <button type="submit">Log in</button>
      </form>
      {authenticatedUser && <div>secrets</div>}
    </main>
  )
}

export default App
