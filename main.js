//add event listener to start button
document.getElementById("start").addEventListener("click", start);

//function executed when the start button is clicked
function start() {
  //start button disappears
  document.getElementById("start").style.display = "none";
  //app list layout appears
  document.getElementById("goalPage").hidden = false;
}

//add event listener to add task button
document.getElementById("addTask").addEventListener("click", addTask);

//function executed when the add task is clicked
function addTask() {
  //set an error field
  document.getElementById("error").style.visibility = "hidden";

  //checking if the goal is long enough
  if (document.getElementById("goal").value.length >= 3) {
    //Create a new row and then add 4 cells into it
    let row = document.getElementById("tasks").insertRow();

    //task name from the input field into first cell
    let task = row.insertCell(0);
    task.innerHTML = document.getElementById("goal").value;
    row.style.color = "blueviolet";

    //a complete button into the second cell
    let completeButton = row.insertCell(1);
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-success completeGoal";
    btn.textContent = "Complete";
    completeButton.appendChild(btn);

    //a delete button into the third cell
    let deleteButton = row.insertCell(2);
    let btn2 = document.createElement("button");
    btn2.type = "button";
    btn2.className = "btn btn-danger deleteGoal";
    btn2.textContent = "Delete";
    deleteButton.appendChild(btn2);

    //a remove button into the fourth cell - this button is hidden in the tasks list
    let removeButton = row.insertCell(3);
    let btn3 = document.createElement("button");
    btn3.type = "button";
    btn3.className = "btn btn-danger removeGoal";
    btn3.textContent = "Remove";
    btn3.style.display = "none";
    removeButton.appendChild(btn3);
    document.getElementById("addTask").style.backgroundColor = "#5cb85c";

    // changing the color of button on click for 400 milliseconds
    setTimeout(function () {
      document.getElementById("addTask").style.backgroundColor = "khaki";
    }, 400);

    //setting the input field back to empty
    document.getElementById("goal").value = "";
  } else {
    //displaying an error
    document.getElementById("error").style.visibility = "visible";
    document.getElementById("error").textContent =
      "Goal to short or empty!!!Please enter a valid Goal.";
    //setting the input field back to empty
    document.getElementById("goal").value = "";
  }
}

// call the update function every two seconds - setAttribute can not update my node list. I know it is automatically updated by the browser, but I wanted to make it faster so I used setInterval
setInterval(update, 2000);

// create a node list for complete, delete and remove buttons and add event listeners to all of them
function update() {
  let buttonNodesComplete = document.getElementsByClassName("completeGoal");
  console.log(buttonNodesComplete);
  let buttonNodesDelete = document.getElementsByClassName("deleteGoal");
  console.log(buttonNodesDelete);
  let buttonNodesRemove = document.getElementsByClassName("removeGoal");
  console.log(buttonNodesRemove);
  for (let i = 0; i < buttonNodesComplete.length; i++) {
    buttonNodesComplete[i].addEventListener("click", function () {
      completeTask(this); //this will return the button being clicked on and can be used to traverse the DOM
    });
  }
  for (let i = 0; i < buttonNodesDelete.length; i++) {
    buttonNodesDelete[i].addEventListener("click", function () {
      deleteTask(this);
    });
  }
  for (let i = 0; i < buttonNodesRemove.length; i++) {
    buttonNodesRemove[i].addEventListener("click", function () {
      removeTask(this);
    });
  }
}

//function executed when the complete button is clicked
//parameter value gets the button being clicked on and the function moves forward from there
function completeTask(value) {
  let target = value.parentNode.parentNode;
  //set the complete list css
  target.style.textDecoration = "line-through";
  target.style.color = "limegreen";
  //remove the complete button
  value.style.display = "none";
  //add the task to tasks deleted list
  document.getElementById("tasksCompleted").appendChild(target);
  //bonus1: play a sound
  document.getElementById("soundCompleted").play();
}

//function executed when the delete button is clicked
function deleteTask(value) {
  let target = value.parentNode.parentNode;
  //set the delete list css
  target.style.color = "red";
  target.style.textDecoration = "none";
  //remove the delete button
  value.style.display = "none";
  //remove the complete button
  target.children[1].children[0].style.display = "none";
  //show the remove button
  target.children[3].children[0].style.display = "inline-block";
  //add the task to tasks deleted list
  document.getElementById("tasksDeleted").appendChild(target);
  //bonus1: play a sound
  document.getElementById("soundDeleted").play();
}

//function executed when the remove button is clicked
function removeTask(value) {
  //remove the task row
  value.parentNode.parentNode.remove();
  //bonus1: play a sound
  document.getElementById("soundRemoved").play();
}

// add event listener to search button
document.getElementById("searchBtn").addEventListener("click", searchYT);
// function gets the value of input and stores it in WEB STORAGE BROWSER API
function searchYT(){
  let searchTerm = document.getElementById("searchTerm").value;
  //to clear local storage key if already set
  localStorage.removeItem("search");
  //set up the search term in local storage
  localStorage.setItem("search", searchTerm);
  //redirect to a new page
  window.location.assign("searchResults.html");
}
