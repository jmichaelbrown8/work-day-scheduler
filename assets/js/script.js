const today = moment();

const workingDays = [1, 2, 3, 4, 5]; // disable inputs for non-working days
const workingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16]; // only display inputs for working hours
const awayHours = [12]; // disable input for times like lunch hours

// initialize the page based on today's date
function initialize() {
    // get today's date
    let todayString = today.format("LLLL")
    
    // display date on page
    $('#current-day').children("span").text(todayString);

    // update date/time every minute

    // make calendar icon clickable for a jqueryui calendar dialog switcher

    // check localstorage for data to display
    // var workDays = {
    //     "2021-11-30": {
    //         "8": "Meeting with the boss",
    //         "14": "Coffee break"
    //     },
    //     "2021-12-01": {}
    // }
    
    // write out data to page

}

initialize();