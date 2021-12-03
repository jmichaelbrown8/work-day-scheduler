const dayFormat = "YYYY-MM-DD";

var today = moment();
var now = today;

var secondTimerId = setInterval(function() {
    now = moment();

    // if a new minute, update the time on page

    // if a new hour, ask the user if they want to update the page

}, 1000);

const workingDays = [1, 2, 3, 4, 5]; // disable inputs for non-working days
const workingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16]; // only display inputs for working hours
const awayHours = [12]; // disable input for times like lunch hours

// initialize the page based on today's date (default) or path date
function initialize() {

    // get the path for a user-specified date

    // if doesn't exist, get today's date
    let todayString = today.format("LLLL")
    
    // display date on page
    $('#current-day').children("span").text(todayString);

    // update date/time every minute

    // make calendar icon clickable for a jqueryui calendar dialog switcher

    // check localstorage for data to display
    // localStorage = {
    //     "2021-11-30": {
    //         "8": "Meeting with the boss",
    //         "14": "Coffee break"
    //     },
    //     "2021-12-01": {}
    // }
    
    // write out data to page
    renderPage(now);

}

/**
 * Renders the hours to the page given a day to render and the data to display.
 * @param {moment} mmt - The current day to view 
 * @param {object} data - the data to initialize on the page
 */
function renderPage(mmt, data) {
    // render a disabled page and a message if it's a non-working day

    var main = $('main');

    // render a normal working day if not
    // loop through the hours
    for (var i = 0; i < workingHours.length; i++) {
        let style = "";
        let time = moment(workingHours[i], "H").format("h:mm A");
        let disabled = "";
        let text = "";
        
        // if it's earlier than now (by day, or hour on same day), render red
        if (workingHours[i] < mmt.hour()) {
            style = "danger";
            disabled = "disabled";
        }
        
        // if it's the current hour, render yellow
        if (workingHours[i] === mmt.hour()) {
            style = "warning";
        }

        // if it's later than now, render green
        if (workingHours[i] > mmt.hour()) {
            style = "success";
        }

        // if it's a non-work hour, always render gray and disabled
        if (awayHours.includes(workingHours[i])) {
            style = "dark";
            disabled = "disabled";
            text = "away";
        }

        main.append(`
        <div class="alert-${style} d-flex flex-row justify-content-between align-items-center py-1">
            <span class="px-1 time-label">${time}</span>
            <div class="input-group">
                <input type="text" class="flex-grow-1" placeholder="+" ${disabled} value="${text}" />
                <button type="button" class="btn" aria-label="Save" ${disabled} >
                    <i class="fa fa-save"></i>
                </button>
            </div>
        </div>
        `);

    }
}

// button click function to save line into the localstorage object
function handleClick(event) {

}

// function to get data out of localstorage for the given date

// function to save data into localstorage for the given date

// function to change the date on the page

initialize();