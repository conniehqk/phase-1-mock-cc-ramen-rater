// write your code here
const ramenURL = 'http://localhost:3000/ramens'
const menuContainer = document.querySelector('#ramen-menu')
const ramenForm = document.querySelector('#new-ramen')
const ramenEditForm = document.querySelector('#edit-ramen')

function renderRamen(ramen) {
    let img = document.createElement('img')
    img.src = ramen.image
    img.alt = ramen.name
    img.id = ramen.id
    img.addEventListener('click', function(event) {
        const id = event.target.id
        const itemURL = ramenURL+'/' + id
        fetch(itemURL).then(resp=>resp.json()).then(json=>renderDetail(json))
    })
    menuContainer.append(img)
}

function renderDetail(ramen) {
    const img = document.querySelector('.detail-image')
    img.src = ramen.image
    img.alt = ramen.name
    img.id = ramen.id
    const name = document.querySelector('.name')
    name.textContent = ramen.name
    const rest = document.querySelector('.restaurant')
    rest.textContent = ramen.restaurant
    const rating = document.querySelector('#rating-display')
    rating.textContent = ramen.rating
    const comment = document.querySelector('#comment-display')
    comment.textContent = ramen.comment
}


function getRamen() {
    fetch(ramenURL).then(resp=>resp.json()).then(ramen=>ramen.forEach(element => {
        renderRamen(element)
    }))
}

function firstDetailRamen() {
    const firstURL = ramenURL+'/1'
    fetch(firstURL).then(resp=>resp.json()).then(ramen=>renderDetail(ramen))
}

function newRamen(e) {
    e.preventDefault()
    const new_name = document.querySelector('#new-name').value
    const new_rest = document.querySelector('#new-restaurant').value
    const new_img = document.querySelector('#new-image').value
    const new_rating = document.querySelector('#new-rating').value
    const new_comment = document.querySelector('#new-comment').value
    fetch(ramenURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: new_name,
            restaurant: new_rest,
            image: new_img,
            rating: new_rating,
            comment: new_comment
        })
    }).then(resp=>resp.json()).then(ramen=>renderRamen(ramen))
}

function editRamen(e) {
    e.preventDefault()
    const id = document.querySelector('.detail-image').id
    const editURL = ramenURL + "/" + id
    const new_rating = document.querySelector('#new-rating').value
    const new_comment = document.querySelector('#new-comment').value
    fetch(editURL, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rating: new_rating,
            comment: new_comment
        })
    }).then(resp=>resp.json()).then(ramen=>renderRamen(ramen))
}

document.addEventListener('DOMContentLoaded',getRamen)
document.addEventListener('DOMContentLoaded',firstDetailRamen)
ramenForm.addEventListener('submit', (e)=>newRamen(e))
ramenEditForm.addEventListener('submit', (e)=>editRamen(e))


