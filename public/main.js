//this is where you put the code that passes stuff up to server
//info can move back and forth using   fetches.  This file is front-End
//next section makes the update button in index.ejs work with the app.put in server.js
document.getElementById('updateButton').addEventListener('click', updateEntry)

document.getElementById('deleteButton').addEventListener('click', deleteEntry)  //for the delete method

document.getElementById('currentButton').addEventListener('click', apiRequest) //this is attempt at displaying an entry

async function updateEntry() {
    try{
        const response = await fetch('updateEntry', {          //server hears path updateEntry and triggers put. /updateEntry isn't needed here
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({             //these have to match the index.ejs and the database labels
                petName: document.getElementsByName('petName')[0].value,    //this is the syntax neede for getElementsByName (returns whole array)
                image:  document.getElementsByName('image')[0].value,
                type:  document.getElementsByName('type')[0].value,
                gender:  document.getElementsByName('gender')[0].value,
                favoriteActivities:  document.getElementsByName('favoriteActivities')[0].value
            })  //converts keys and properities to strings
            })
        const data = await response.json()
        console.log(data)
        location.reload() //reloads and clears fields
        } catch(err) {
            console.log(err)
        }
}

async function deleteEntry() {             //this is tied to index.ejs and server.js
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers:{'Content-Type': 'application/json'},
            body:  JSON.stringify({
                petName: input.value
            })
        })
        const data = await response.json()  //this is needed 
        location.reload()  //reloads page to clear out the form
    }  catch(err) {
        console.log(err)
    }
}


//from here down is attempt to get selected dog shown
async function apiRequest(){
    const petName = document.querySelector('input').value
    try{
        const response = await fetch(`https://spoiled-puppy-database.herokuapp.com/api/${petName}`)
        const data = await response.json()
        console.log(data)
        //document.getElementById('petName').innerText = data.petName
        document.getElementById('gender').innerText = data.gender
        document.getElementById('type').innerText = data.type
        document.getElementById('favoriteActivities').innerText = data.favoriteActivities
        document.getElementById('image').src = data.image
    } catch(err) {
        console.log(err)
    }
}
