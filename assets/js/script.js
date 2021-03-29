var plansArrayStorage = []; // stores array that is sent to localStorage
var plans = { 
    planDescription: "Lorem",
    planDate: dayjs().format('{YYYY} MM-DD'),
    planHour: dayjs().format('HH')
}; //variable stores events for the day

// var i = 0;

// //For every plan stored int he localStorage, create an object on the page
// $.each(planArray, function() {
//     //if (plans.planDate === dayjs().format('{YYYY} MM-DD'))
//     { 
//         planArray.push(plans);
//     }}
//     );

// console.log(planArray);

var loadPlanner = function ()
{
    $("#currentDay").text(dayjs().format('dddd, MMMM D, YYYY'));
    $(".container").addClass("time-block");

    var hourRow = $("<div>").addClass("row plan-event-row row g-5");    

    for (var i = 0; i < 9; i++){
        var hoursText = dayjs().hour(9).add(i,'hour');

        var hourCol = $("<div>").addClass("col-sm-2 ml-auto d-flex justify-content-around hour-label"+i+" hour").text(hoursText.format('hh:00 a'));
        hourCol.attr("id","plan"+i);

        var hourInfo = $("<input>").addClass("col-sm-9 description plan-description"+i+" form-control time-block").text("");
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

var loadEvents = function () {  
    planArray = JSON.parse(localStorage,getItem("plansArrayStorage"));

    //Update to store blank plan description, hour, date and id if the local storage array value is null
    if (!plans) {
        plans = {
            planDescription: [],
            planDate: [],
            planHour: [],
        };
    }

    //Creates a plan object and properties when the event planner is opened
    $.each(plans, function(list, arr) {
        arr.forEach(function(plans) {
            createEvent(plans.planHour,planDate,planDescription)
        });
    });
}

var createEvent = function (planHour, planDate, planDescription)
{

}

var saveEvents = function () {
    
    localStorage.setItem("plansArrayStorage",JSON.stringify(plans));
}

$(".saveBtn").on("click",(function(){
    for (var i = 0; i < 9; i++) {
        if ($(this).attr("id") === ("plan"+i)){
        return ($(".plan-description"+i).val());
        }
    }
}));

$(".description").on("click",(function(){
    $(this).trigger("focus");
}));