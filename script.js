var home_Page = document.getElementById("homePage");
var start_Page = document.getElementById("startDiv")
var clock = document.getElementById("clock")
var greeting = document.getElementById("greeting")
var focus_List = document.getElementById("focusList")
var focus_Set = document.getElementById("focusSet")
var cancel = document.getElementById("rmb")
var todoList = document.getElementById("todo")
var imgWeather = document.getElementById("weather")
var temp = document.getElementById("c")
var setupComplete = localStorage.getItem("setup") 
var toDo; 
var focus = localStorage.getItem("focus")
var html = localStorage.getItem("html")
cancel.className = 'hidden'

if (setupComplete == 'true') {
  homePage();
} else {
  startPage();
}

if (todoList !=null) {
  todoList.innerHTML = html
}


var xhr = new XMLHttpRequest
xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Georgetown,ca&APPID=ffe8c5cf02aa8060858eca23f69db5d4');
xhr.send(null);

xhr.onreadystatechange = function () {
    console.log("coming back!");
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        //console.log(xhr.responseText); // 'This is the returned text.'
        var response = xhr.responseText;
        var x = JSON.parse(response);
        icon = x["weather"][0]["icon"]
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        imgWeather.src = iconurl
        var calc = parseInt(x["main"]["temp"] - 273.15)
        temp.innerText = calc + "°c"

      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
}


function startPage() {
  home_Page.style.display = 'none';
  start_Page.style.display = 'block';

  document.getElementById("name").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      var setName = document.getElementById("name").value;
      localStorage.setItem("name",setName);
      localStorage.setItem("setup",'true');
      homePage();
  }

  })
}

function homePage() {
  home_Page.style.display = 'block';
  start_Page.style.display = 'none';
  clockUpdate();
  phraseUpdate();
  
  document.getElementById("focus").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      var home_focus = document.getElementById("focus").value;
      localStorage.setItem("focus", home_focus)
      focus_List.innerHTML = home_focus;
      focus_List.className = "visible"
      focus_Set.className = "hidden"
      cancel.className = 'visible'
  }
})

    if (focus != null || focus != undefined) {
    home_focus = localStorage.getItem("focus")
    focus_List.innerHTML = home_focus;
    focus_List.className = "visible"
    focus_Set.className = "hidden"
    cancel.className = 'visible'
  }

  document.getElementById("todoInput").addEventListener("keyup", function(event) {
    event.preventDefault();   
    if (event.keyCode == 13) {
      var input = document.getElementById("todoInput").value;
      toDo++;
      localStorage.setItem("toDo",toDo.toString())
      localStorage.setItem(toDo.toString(),input)
      console.log(input);
      document.getElementById("todoInput").value = ""

      var todo_check = document.createElement('input');
      var todo_item = document.createTextNode(input)
      var cancel = document.createElement("img")
      cancel.onclick = remove
      var todoBox = document.createElement("div")
      todo_check.type = "checkbox";    
      cancel.id = "delete"
      cancel.src = "delete.png"
      todoBox.id = toDo;   
      console.log(todo_check)
      console.log(todo_item)

      todoBox.appendChild(todo_check)
      todoBox.appendChild(todo_item)
      todoBox.appendChild(cancel)
      todoList.appendChild(todoBox)



      localStorage.setItem("html", todoList.innerHTML)
     }
    })
}
function clockUpdate() {
  time = new Date();
  var currentHours = time.getHours();
  var currentMin = time.getMinutes()
  var currentSeconds = time.getSeconds();
  currentMin = ( currentMin < 10 ? "0" : "" ) + currentMin;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
  var clockString = currentHours + ":" + currentMin + ":" + currentSeconds + " " + timeOfDay;
  clock.innerHTML = clockString;  
  setTimeout(clockUpdate, 1000);
}

function phraseUpdate() {
time = new Date();
if (time.getHours < 12) {
  greeting.innerHTML = "Good morning," + " " + localStorage.getItem("name") 
} else if (time.getHours < 16) {
  greeting.innerHTML = "Good afternoon," + " " + localStorage.getItem("name")  
} else {
  greeting.innerHTML = "Good evening," + " " + localStorage.getItem("name")  
}
}

function removeFocus() {
  localStorage.removeItem("focus")
  focus_List.innerHTML = ''
  focus_List.className = 'hidden' 
  focus_Set.className  = 'visible'
  cancel.className = 'hidden'
  console.log(focus)
}

function remove() {
  localStorage.removeItem(this.parentElement.id.toString())
  this.parentElement.parentElement.removeChild(this.parentElement)
  localStorage.setItem("html",todoList.innerHTML)
}