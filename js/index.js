let users = []

let user = {
    login:'',
    email:'',
    password:''
}
let login = false
let admin = false

if (localStorage.getItem('users')){
    users = JSON.parse(localStorage.getItem('users'))
}


const enter = (name, userObject)=>{
    login = true
    if (userObject.login === "admin"){
        admin = true
    }
    localStorage.setItem('user', JSON.stringify(userObject))
    localStorage.setItem('login', JSON.stringify(login))
    localStorage.setItem('admin', JSON.stringify(admin))
    document.querySelector('.header__autorisation').style.display = 'none'
    document.querySelector('.header__profile').style.display = 'flex'
    document.querySelector('.headerLogin').textContent = name
    logoutInit()
}

const checkLogin = ()=>{
    if((localStorage.getItem('login')) && JSON.parse(localStorage.getItem('login')) === true){
        enter(JSON.parse(localStorage.getItem('user')).login, JSON.parse(localStorage.getItem('user')))
    }
}

const logout = ()=>{
    login = false
    admin = false
    localStorage.setItem('admin', JSON.stringify(admin))
    localStorage.setItem('login', JSON.stringify(login))
    localStorage.removeItem('user')
}

const logoutInit = ()=>{
    document.querySelector('.exit').addEventListener('click', logout)
}   
    checkLogin()

if(window.location.href !== 'http://127.0.0.1:5500/galleryPage.html'){
    localStorage.setItem('marka', JSON.stringify('all'))
}

if (document.querySelector('.registration')){
    if(login === true){
        window.history.back();
    }
    document.querySelector('.registrationForm').addEventListener('submit', (e)=>{
       let login = e.target.querySelector('#login')
       let email = e.target.querySelector('#email')
       let password = e.target.querySelector('#password')
       let passwordC = e.target.querySelector('#password_c')

       if (password.value === passwordC.value){
        if(users.filter(user => user.email === email.value).length === 0){
            user = {
                login: login.value,
                email: email.value,
                password: password.value
            }
            users.push(user) 
            localStorage.setItem('users', JSON.stringify(users))
            enter(login.value, loggetUser)
            alert('Вы успешно зарегистрировались')
        }
       }
    })
}


if (document.querySelector('.login')){
    if(login === true){
        window.history.back();
    }
    document.querySelector('.loginForm').addEventListener('submit', (e)=>{
        let login = e.target.querySelector('#login')
        let password = e.target.querySelector('#password')
        let loggetUser = users.filter(user => {
            if(user.login === login.value && user.password === password.value){
                return user
            }
        })
        if(loggetUser.length === 1){
            enter(loggetUser[0].login, loggetUser[0])
        }
    })
}



