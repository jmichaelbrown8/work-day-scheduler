const dateFormat = "YYYY-MM-DD";
const mainEl = $('main');
const currentDayEl = $('#current-day').children("span");

var today = moment();
var now = today;

const workingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16]; // only display inputs for working hours
const awayHours = [12]; // disable input for times like lunch hours

/** Initializes the page based on today's date */
function initialize() {

    // check localstorage for data to display
    // stored in objects with a date in YYYY-MM-DD format for the key
    var data = getLocalStorage();
    
    // write out data to page
    renderPage(today, data); // live moment
    // renderPage(moment("5", "H"), data); // testing moment

    mainEl.on('click', 'button', handleClick);

    mainEl.on('input', 'input', handleInput);
}

/**
 * Renders the hours to the page given a day to render and the data to display.
 * @param {moment} mmt - The current day to view 
 * @param {object} data - the data to initialize on the page
 */
function renderPage(mmt, data) {
    if (!mmt) {
        mmt = today;
    }

    if (!data) {
        data = {};
    }

    updateDay(mmt);

    // loop through the hours
    for (var i = 0; i < workingHours.length; i++) {
        let style = "";
        let time = moment(workingHours[i], "H").format("h:mm A");
        let disabled = "";
        let text = data[workingHours[i]] || "";
        
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
            text = "Away";
        }

        mainEl.append(`
        <div class="alert-${style} d-flex flex-row justify-content-between align-items-center py-1">
            <span class="px-1 time-label">${time}</span>
            <div class="input-group">
                <input id="${workingHours[i]}" type="text" class="flex-grow-1" placeholder="+" ${disabled} value="${text}" />
                <button type="button" class="btn fa fa-save" aria-label="Save" ${disabled} ></button>
            </div>
        </div>
        `);

    }
}

/**
 * Displays the moment on the page.
 * @param {moment} mmt 
 */
function updateDay(mmt, format) {

    // get the user's local string representation of the given date
    let todayString = mmt.format(format || "LLLL")
    
    // display date on page
    currentDayEl.text(todayString);
}

/** Handles the save button clicks to save the input on the same line to localStorage */
function handleClick(event) {
    // save the closest input to the localStorage in the given key
    let date = today.format(dateFormat);
    let buttonEl = $(event.target);
    let inputEl = $(event.target).siblings("input");

    let id = inputEl.attr('id');
    let data = inputEl.val();
    let currentStorage = getLocalStorage(date) || {};
    currentStorage[id] = data;
    storeLocalStorage(date, currentStorage);

    // remove unsaved class from buttonEl
    buttonEl.removeClass("unsaved");
}

/** Handles to text change event to trigger validation that the input has changed */
function handleInput(event) {
    let buttonEl = $(event.target).siblings("button");

    buttonEl.addClass("unsaved");
}

/** Gets the object from localStorage for a given date (default: today) */
function getLocalStorage(date) {
    if (!date) {
        date = now.format(dateFormat);
    }

    return JSON.parse(localStorage.getItem(date));
}

/** Saves the fully formed data object into localStorage for a given date */
function storeLocalStorage(date, dataObject) {
    if (!date || !dataObject) {
        return "fail";
    }

    localStorage.setItem(date, JSON.stringify(dataObject));

    return "success";
}

initialize();