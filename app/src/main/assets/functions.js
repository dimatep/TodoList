function getListView() { // load the list view from database and wait for events (edit, delete)

    var json;
    var toDoList;

    var ul = document.getElementById("todoList");    // loading todo list
    json = JSON.parse(window.getDataFromDB.getItems());     // pass all the data from database to json file.
    toDoList = json.toDoItems;
    for(let i=0; i<toDoList.length ; i++)   // pass over all the tasks from database and create li items
    {
        var li = document.createElement("li"); // list item

        date = toDoList[i].date; // deadline date
        item = toDoList[i].item; // task to do
        li.appendChild(document.createTextNode(item + " " + date));
        var deleteBtn = document.createElement("button"); // create delete button
        deleteBtn.appendChild(document.createTextNode("Delete"));
        deleteBtn.setAttribute("data-icon","delete");
        deleteBtn.id = date +"," + item;      // take data and save - for search on database

        var updateBtn = document.createElement("button"); // create update/edit button
        updateBtn.appendChild(document.createTextNode("Edit"));
        updateBtn.setAttribute("data-icon","edit");
        updateBtn.id = date +"," + item;       // take data and save - for search on database

        li.appendChild(updateBtn); // add delete button to list item
        li.appendChild(deleteBtn); // add edit button to list item

        ul.appendChild(li); // add list item to un-ordinary list

        updateBtn.addEventListener("click", function(){   // edit button listener - waiting thr user to press this button
            var splitter = this.id.split(','); // split by ,
            window.location.href = '#update';       // go to update page

            $("#updateButton").click(function() {
                var updateDate = document.getElementById("newDateValue").value;   // get date from "update" page
                var updateItem = document.getElementById("newNameValue").value;  // get new task from "update" page
                window.updateDB.updateToDo(splitter[0],splitter[1],updateDate,updateItem);  //call to update task in database function
                location.reload();      // reload todo list
            });
        });

        deleteBtn.addEventListener("click", function(){     // delete button listener - waiting thr user to press this button
            this.parentElement.parentElement.remove();      // remove immediately from list by removing "parent" - li
            var splitter = this.id.split(',');              // split by ,
            window.deleteToDoFromDb.deleteToDo(splitter[0],splitter[1]); // call to delete task from list from database function
        });
    }
}

function updateList(date,item){ //call this function after adding a new task to TODO list

    var ul= document.getElementById("todoList"); // un-ordinary list
    var li = document.createElement("li"); // list item

    li.appendChild(document.createTextNode(item + " " + date));

    var deleteBtn = document.createElement("button"); // create delete button
    deleteBtn.appendChild(document.createTextNode("Delete"));
    deleteBtn.setAttribute("data-icon","delete"); //add icon
    deleteBtn.id = date +"," + item;

    var updateBtn = document.createElement("button"); // create update/edit button
    updateBtn.appendChild(document.createTextNode("Edit"));
    updateBtn.setAttribute("data-icon","edit");
    updateBtn.id = date +"," + item;

    li.appendChild(deleteBtn); // add delete button to list item
    li.appendChild(updateBtn); // add edit button to list item

    ul.appendChild(li); // add list item to un-ordinary list

    updateBtn.addEventListener("click", function(){  // edit button listener - waiting thr user to press this button
        var splitter = this.id.split(',');
        window.location.href = '#update';               // go to update page

        $("#updateButton").click(function() {
            var updateDate = document.getElementById("newDateValue").value; // get data from "update" page
            var updateItem = document.getElementById("newNameValue").value;
            window.updateDB.updateToDo(date,item,updateDate,updateItem); // call update function
            location.reload(); //refresh the list
        });
    });

    deleteBtn.addEventListener("click", function(){     // delete button listener - waiting thr user to press this button
        this.parentElement.parentElement.remove();      // remove immediately from list by removing "parent" - li
        window.deleteToDoFromDb.deleteToDo(date,item);  // call to delete task from list from database function
    });
}

function add() { //adding new item to database and then we update the list (refresh).
    var date = document.getElementById("new_date").value;
    var item = document.getElementById("new_item").value;
    window.addToDb.addItem(date,item);
    updateList(date,item);
    location.reload();
}