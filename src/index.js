
let addToy = false;
let url
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let url = "http://localhost:3000/toys"
  //let formContainer = document.querySelector(".add-toy-form")
  //formContainer.addEventListener("submit",  submitBtn),
   
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()
  createNewToy()
  


});


function createNewToy() {
 // console.log('JUST CHECKING')
  let formContainer = document.querySelector(".add-toy-form")
  //console.log(formContainer)
  formContainer.addEventListener("submit", (event) => {
    event.preventDefault
   let toyName= event.target.name.value
    let toyImage = event.target.image.value
    //debugger

    toyData = {
      name: toyName,
      image: toyImage,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify(toyData)
    })
      .then((resp) => {
        return resp.json()
    })
      .then((newToy) => {
        console.log(newToy)
        // need to pass the newToy into the template i  make
       renderSingleToy(newToy);
        formContainer.innerHTML += toyDiv
      })
  })

 

}



function fetchToys() {
  // When the page loads, make a 'GET' request to
  // fetch all the toy objects
  fetch("http://localhost:3000/toys")
    .then((resp) => {
      resp.json()
        .then((toys) => {
      //console.log(toys)
          toys.forEach((toy) => {
            //console.log(toy)
            renderToy(toy)
          })
    })  
  })
  
  
  
}
  


function renderToy(toy) {
  //console.log("checking")
  let toyDiv = document.getElementById("toy-collection")
  //console.log(toyDiv)
  let newDiv = document.createElement('div')
  //console.log(newDiv)
  newDiv.classList = 'card'
  //console.log(newDiv)
  let h2Tag = document.createElement("h2")
  h2Tag.innerHTML = toy.name
  //console.log(h2Tag)
  let img = document.createElement('img')
  img.src = toy.image
  //console.log(img)
  img.classList = "toy-avatar" 

  let pTag = document.createElement("p")

  pTag.innerHTML = `${toy.likes} likes`
  //console.log(pTag)

  let btnTag = document.createElement("button")
  btnTag.classList = "like-btn"
  btnTag.innerHTML = 'Like <3'
  btnTag.addEventListener("click", likeAction)
  btnTag.id= toy.id 
  console.log(btnTag.id)

  
  newDiv.append( h2Tag, img, pTag, btnTag)

  //console.log(newDiv)
  toyDiv.appendChild(newDiv)


}




function likeAction(event) {
  event.preventDefault
  let id = event.currentTarget.id
  //console.log(id)

  let currentLikes = event.currentTarget.parentElement.querySelector("p").innerText
  currentLikes = parseInt(currentLikes.split(" ")[0])
  currentLikes++
  console.log(currentLikes)

  fetch(`http://localhost:3000/toys/${id}`, {
    
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: currentLikes
    })
    
  })
    .then(resp => resp.json())
  .then(data=>console.log(data))
    
  
}























