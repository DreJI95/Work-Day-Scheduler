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
loadHourPlanArray();

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
loadEvents();

var loadPlanner = function ()
{
    $("#currentDay").text(dayjs().format('dddd, MMMM D, YYYY'));
    $(".container").addClass("time-block");

    var hourRow = $("<div>").addClass("row plan-event-row row g-5");    

    for (var i = 0; i < 9; i++){
        var hoursText = dayjs().hour(9).add(i,'hour');

        var hourCol = $("<div>").addClass("col-sm-2 ml-auto d-flex justify-content-around hour-label"+i+" hour").text(hoursText.format('hh:00 a'));
        hourCol.attr("id","plan"+i);

        var hourInfo = $("<input>").addClass("col-sm-9 description plan-description"+i+" form-control time-block").val(hourlyPlanArray[i].plan);
        hourInfo.attr("id","plan"+i);

        var hourButton = $("<div>").addClass("col-sm-1 btn-primary save-button"+i+" saveBtn");
        var hourButtonIcon = $("<span>").addClass("material-icons d-flex justify-content-evenly").text("save");
        hourButton.append(hourButtonIcon);
        hourButton.attr("id","plan"+i);

        hourRow.append(hourCol,hourInfo,hourButton);
    }
    $(".container").append(hourRow);
};
loadPlanner();

var saveEvents = function () {
    localStorage.setItem("plansArrayStorage",JSON.stringify(hourlyPlanArray));
}

$(".saveBtn").on("click",(function(){
    for (var i = 0; i < 9; i++) {
        if ($(this).attr("id") === ("plan"+i)){
        hourlyPlanArray[i].plan = $(".plan-description"+i).val();
        }
    }

    saveEvents();
}));

$(".description").on("click",(function(){
    $(this).trigger("focus");
}));