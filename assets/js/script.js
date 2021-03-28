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

    var hourRow = $("<div>").addClass("row plan-event-row");    

    for (var i = 0; i < 9; i++){
        var hoursText = dayjs().hour(9).add(i,'hour');
        var hourCol = $("<div>").addClass("col-sm-2 hour-window mt-auto ml-auto").text(hoursText.format('hh:00 a'));
        var hourInfo = $("<div>").addClass("col-sm-9 plan-description form-control").text("");
        var hourButton = $("<div>").addClass("col-sm-1 save-button btn-primary").text("Save");
        hourRow.append(hourCol,hourInfo,hourButton);
    }
    $(".container").append(hourRow);
};

var createEvent = function (planHour, planDate, planDescription)
{

}

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

var saveEvents = function () {
    

    localStorage.setItem("plansArrayStorage",JSON.stringify(plans));
}

loadPlanner();