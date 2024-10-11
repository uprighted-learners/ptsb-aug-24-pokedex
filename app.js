const name = document.getElementById("name")
const weight = document.getElementById("weight")
const img = document.getElementById("img")
const stats = document.getElementById("stats")
const card = document.getElementsByClassName("card")[0]

document.addEventListener("DOMContentLoaded", e => {
    sanitizeDOM()
})

document
.getElementById("submit-btn")
.addEventListener("click", async e => {
    e.preventDefault()
    let pokemon = sanitizeInput(e.target.form[0].value)
    let data = await getData(pokemon)
    render(data)
})

async function getData(pokeName) {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        const res = await fetch(url)
        return await res.json()
    } catch (err) {
        errorHandling(err)
    }
}

function render(data) {
    console.log(data)
    name.textContent = `Name: ${data.name}`
    weight.textContent = `Weight: ${data.weight}`
    img.src = data.sprites.front_shiny
    
    // while(stats.childElementCount) {
    //     stats.removeChild(stats.firstElementChild)
    // }

    if (stats.childElementCount) stats.replaceChildren()

    data.stats.forEach(i => {
        let p = document.createElement("p")
        p.textContent = `${i.stat.name}: ${i.base_stat}`
        stats.appendChild(p)
    })

    sanitizeDOM()
}

function sanitizeDOM() {
    img.src === window.location.href || !img.src
        ? img.style.display = "none"
        : img.style.display = "block"
    
    card.lastChild.tagName === "H2" ? card.removeChild(card.lastChild) : null
}

function errorHandling(err) {
    console.log(err)
    const h2 = document.createElement("h2")
    h2.textContent = "Pokemon not found"
    card.appendChild(h2)
}

function sanitizeInput(input) {
    let result = input.replace(/[^a-zA-Z]+/g, "").toLowerCase()
    return result
}