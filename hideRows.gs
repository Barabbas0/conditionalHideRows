function onOpen(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template");
  var sheetRows = sheet.getMaxRows();
  var rowsToHide = new Array(sheetRows); // creates an array the length of the number of rows.
  for (var i = 1; i < sheetRows + 1; ++i) {
    var rowValue = sheet.getRange(i, 1, 1, 1).getValue();
    if (isValidDate(rowValue)) {
      targetDate = new Date();
      if (targetDate.getDate() < 4) {
        if (targetDate.getMonth() == 0) {
          targetDate.setYear(targetDate.getYear() - 1);
          targetDate.setMonth(11);
        }
        else
          targetDate.setMonth(targetDate.getMonth() - 1);
      }
      targetDate.setDate(1);
      if (targetDate.valueOf() > rowValue.valueOf())
        rowsToHide[i-1] = true;
      else
        rowsToHide[i-1] = false;
    }
    else
      rowsToHide[i-1] = false;
  }
  for (var i = 1; i < sheetRows + 1; ++i) {
    if (rowsToHide[i-1]) {
      Logger.log("Hiding row: " + i);
      sheet.hideRow(sheet.getRange(i, 1, 1));
    }
    else
      Logger.log("Showing row: " + i);
  }
}

//below function will return true if the arg is valid date and false if not.
function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}