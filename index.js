// import ical
const ical = require('node-ical');
const fs = require('fs');
const moment = require("moment");


// console.log(Object.values(events).length);
// loop through events and log them
const events = ical.sync.parseFile('./src/basic.ics');

const {start, end, summary} = Object.values(events)[0];

const schedueleString = moment.tz(start, "Europe/Stockholm").toString();
const convertedScheduele = schedueleString.split(" ");
console.log(convertedScheduele.toString());





function convertStartToReadable(start){
    const schedueleString = moment.tz(start, "Europe/Stockholm").toString();
    const convertedScheduele = schedueleString.split(" ");
    return {}
}

function convertDay(dayArg){
    let day;
    switch(day){
        case "Mon":
            day = "Måndag";
            break;
        case "TUE":
            day = "Tisdag"
            break;
        case "WED":
            day = "Onsdag";
            break;

            case "THU":
                day = "TOR"
                break; 
    }
    
}

convertStartToReadable(start);


// Skapa scheduele, pusha varje objekt till den, och konvertera arrayen till en sträng
// const scheduele = []
// scheduele.push({start, end, summary});
// const schedueleAsJson = JSON.stringify(scheduele);

// Skriv till 
// fs.writeFile("schedule.json", schedueleAsJson, "utf8", (err) => {
//     if (err) throw err;
//     console.log("File has been saved");
// });



// for (const event of Object.values(events)) {
//     obj.table.push({})
//     console.log(
//         'Lektion: ' + event.summary +
//         '\nStart Date: ' + event.start.toISOString() +
//         '\n'
//     );
// };
 