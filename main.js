let myForm = document.getElementById('my-form');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let mobileInput = document.getElementById('mobile');
let mssg = document.querySelector('.msg');
let userList = document.getElementById('users');

//Listen for Form Submit
myForm.addEventListener('submit' , onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === "" || emailInput.value === "" || mobileInput.value === ""){
        //Display an error message
        mssg.classList.add('error');
        mssg.textContent = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => mssg.remove(), 3000);
    }else{
        //get user input values
         let name = e.target.name.value;
         let email = e.target.email.value;
         let mobile = e.target.mobile.value;

         let user = {
             name,
             email,
             mobile
         };
        
        // axios.post("https://crudcrud.com/api/d3a6989642744ae794674d50d725fbb4/appointmentData", user, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then((response) => {
        //     showUserOnScreen(response.data);
        //     console.log(response);
        // })
        // .catch((err) => {
        //     document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>";
        //     console.log(err);
        // });
        

        localStorage.setItem(user.name , JSON.stringify(user));
        showUserOnScreen(user);
    }
}

function showUserOnScreen(user){
        let li = document.createElement('li');
        let details = document.createTextNode(`${nameInput.value} : ${emailInput.value} : ${mobileInput.value} `);

        let deleteBtn = document.createElement('input');
        deleteBtn.type = 'button';
        deleteBtn.value = "Delete";
        deleteBtn.style.backgroundColor = 'lightPink';
        deleteBtn.onclick = () => {
            localStorage.removeItem(user.name);
            userList.removeChild(li);
        }

        let editBtn = document.createElement('input');
        editBtn.type = 'button';
        editBtn.value = 'Edit';
        editBtn.style.backgroundColor = 'skyBlue';
        editBtn.onclick = () => {
            localStorage.removeItem(user.name);
            userList.removeChild(li);
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('mobile').value = user.mobile;
        }

        li.appendChild(details);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        userList.appendChild(li);

        //Clear Fields
        nameInput.value = ' ';
        emailInput.value = ' ';
        mobileInput.value = ' ';
}