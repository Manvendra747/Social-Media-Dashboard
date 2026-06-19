const darkButton = document.getElementById("dark")
const lightButton = document.getElementById("light")
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

const setDarkMode = () => {
    document.body.className = "dark"
    localStorage.setItem("colorMode", "dark")
}

const setLightMode = () => {
    document.body.className = "light"
    localStorage.setItem("colorMode", "light")
}

const colorModeFromLocalStorage = () => {
    return localStorage.getItem("colorMode")
}

const colorModeFromPreferences = () => {
    return mediaQuery.matches
        ? "dark"
        : "light"
}

const updateColor = () => {
    const color = colorModeFromLocalStorage() || colorModeFromPreferences()
    color === "dark" ? darkButton.click() : lightButton.click()
}

const radioButtons = document.querySelectorAll(".toggle__wrapper input")
radioButtons.forEach(button => {
    button.addEventListener('change', () => {
        darkButton.checked ? setDarkMode() : setLightMode()
    })
})

mediaQuery.addEventListener('change', (event) => {
    event.matches ? darkButton.click() : lightButton.click()
})

updateColor()