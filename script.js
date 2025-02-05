console.log("Hello Back to School");

// Declare variables for use in the script
const viz = document.getElementById("tableau-viz1");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

let companyId;
let companyIdExpand;
let channelGroup;
let channelDrill;

const organicdirectfilter = document.getElementById("organic-and-direct");
const clearfilter = document.getElementById("clear");
const undofilter = document.getElementById("undo");
const minValue = document.getElementById("min_value");
const maxValue = document.getElementById("max_value");
const applybutton = document.getElementById("apply_button");

function logworkbookinformation() {
  workbook = viz.workbook;
  console.log(`The name of the workbook is " ${workbook.name}"`);
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    console.log(`The sheet with index ${element.index} is ${element.name}`);
  });

  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is ${vizActiveSheet.name}`);

  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    console.log(`The worksheet with index ${element.index} is ${element.name}`);
  });

  companyId = listSheets.find((ws) => ws.name == "Identified companies");
  companyIdExpand = listSheets.find((ws) => ws.name == "Companies / Visits");
  channelGroup = listSheets.find((ws) => ws.name == "Channel Group");
  channelDrill = listSheets.find((ws) => ws.name == "Channel Drill");
}

function organicDirectFunction() {
  console.log(`Organic Direct Button Press ${organicdirectfilter.value}`);
  //   listSheets.forEach((element) => {
  //     element.applyFilterAsync(
  //       "Channel Group",
  //       ["Direct", "Organic Search"],
  //       "replace"
  //     );
  //   });
  companyId.applyFilterAsync(
    "Channel Group",
    ["Direct", "Organic Search"],
    "replace"
  );
  companyIdExpand.applyFilterAsync(
    "Channel Group",
    ["Direct", "Organic Search"],
    "replace"
  );
  channelGroup.applyFilterAsync(
    "Channel Group",
    ["Direct", "Organic Search"],
    "replace"
  );
  channelDrill.applyFilterAsync(
    "Channel Group",
    ["Direct", "Organic Search"],
    "replace"
  );
}

function clearFilterFunction() {
  console.log(`Clear Press ${clearfilter.value}`);
  companyId.clearFilterAsync("Channel Group");
  companyIdExpand.clearFilterAsync("Channel Group");
  channelGroup.clearFilterAsync("Channel Group");
  channelDrill.clearFilterAsync("Channel Group");
}

function unDo() {
  console.log("Undoing last action...");
  viz.undoAsync();
}

function filterRangeFunction() {
  console.log(`Min Value to Filter: ${minValue.value}`);
  console.log(`Max value to Filter: ${maxValue.value}`);

  channelGroup.applyRangeFilterAsync("SUM(Total Visits (Current Period))", {
    min: parseFloat(minValue.value),
    max: parseFloat(maxValue.value),
  });
}

viz.addEventListener(`firstinteractive`, logworkbookinformation);
organicdirectfilter.addEventListener("click", organicDirectFunction);
clearfilter.addEventListener("click", clearFilterFunction);
undofilter.addEventListener("click", unDo);
applybutton.addEventListener("click", filterRangeFunction);
