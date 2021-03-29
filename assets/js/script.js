var hourlyPlanArray = [] //variable stores page load values

var loadHourPlanArray = function ()
{
    //Creates page hour and description empty values
    for (var i = 0; i < 9; i++){
        var hour = dayjs().hour(9).add(i,'hour').format('hh:00 a');
        var plan = "";
        hourlyPlanArray.push({hour,plan});
    }

}
loadHourPlanArray(); //Loads page time blocks array

var loadEvents = function () {  
    var planArray = JSON.parse(localStorage.getItem("plansArrayStorage"));

    //Update to store blank plan description, hour, date and id if the local storage array value is null
    if (!planArray) {
        loadPlanner();
    }
    else
    {
        //Creates a plan object and properties when the event planner is opened
        for (var i = 0; i < 9; i++) {
            hourlyPlanArray[i].hour = planArray[i].hour;
            hourlyPlanArray[i].plan = planArray[i].plan;
        }
    }
}
loadEvents(); //loads saved plans from local storage

var loadPlanner = function ()
{
    $("#currentDay").text(dayjs().format('dddd, MMMM D, YYYY')); // shows current date and time on the header block
    $(".container").addClass("time-block"); // add css time-block rules to the container grid

    var hourRow = $("<div>").addClass("row plan-event-row row g-5"); 

    for (var i = 0; i < 9; i++){
        var hoursText = dayjs().hour(9).add(i,'hour'); 

        //creates the hour label element
        var hourCol = $("<div>").addClass("col-sm-2 ml-auto d-flex justify-content-around hour-label"+i+" hour").text(hoursText.format('hh:00 a'));
        hourCol.attr("id","plan"+i); 

        //creates the plan description input element
        var hourInfo = $("<input>").addClass("col-sm-9 description plan-description"+i+" form-control time-block").val(hourlyPlanArray[i].plan);
        hourInfo.attr("id","plan"+i);

        //checks the css color for the input of the plan description form element
        if (dayjs().hour() > parseInt(dayjs().hour(9).add(i,'hour').format('h')))
        {
            hourInfo.addClass("past");
        }
        else if(dayjs().hour() < parseInt(dayjs().hour(9).add(i,'hour').format('h')))
        { 
            hourInfo.addClass("future"); 
        }
        else
        { 
            hourInfo.addClass("present"); 
        }

        //creates the save button and button icon element; including the css save button rule
        var hourButton = $("<div>").addClass("col-sm-1 btn-primary save-button"+i+" saveBtn");
        var hourButtonIcon = $("<span>").addClass("material-icons d-flex justify-content-evenly").text("save");
        hourButton.append(hourButtonIcon);
        hourButton.attr("id","plan"+i);

        hourRow.append(hourCol,hourInfo,hourButton); //appends element to the row on the container grid
    }
    $(".container").append(hourRow);
};
loadPlanner(); //Create page elements for the time block container

var saveEvents = function (id) {

    var planArray = JSON.parse(localStorage.getItem("plansArrayStorage"));
    planArray[id] = hourlyPlanArray[id];
    localStorage.setItem("plansArrayStorage",JSON.stringify(planArray));
}//saves current element for the description associated with the column button to local storage

$(".saveBtn").on("click",(function(){
    for (var i = 0; i < 9; i++) {
        if ($(this).attr("id") === ("plan"+i)){
        hourlyPlanArray[i].plan = $(".plan-description"+i).val();
        saveEvents(i);
        }
    }    
})); //save button event listener

$(".description").on("click",(function(){
    $(this).trigger("focus");
})); //plan description focus event listener