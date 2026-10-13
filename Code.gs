function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ result: 'ok', message: 'RSVP link is working...' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};
  const spreadsheet = getSpreadsheet();
  const sheet = ensureSheet(spreadsheet, 'RSVP');
  const summary = ensureSummarySheet(spreadsheet);

  const inviteName = safeString(params.guest || '');
  const typedName = safeString(params.name || '');
  const coming = safeString(params.coming || '');
  const peopleCount = safeString(params.count || '0');
  const functions = safeString(params.events || '');
  const message = safeString(params.message || '');

  const updatedAt = new Date();
  const rowLookup = findRowByInvite(sheet, inviteName, typedName);
  const firstReplyValue = rowLookup ? safeCell(sheet.getRange(rowLookup, 8).getValue()) : updatedAt;
  const timesReplied = rowLookup ? Number(sheet.getRange(rowLookup, 9).getValue() || 0) + 1 : 1;

  const values = [
    updatedAt,
    inviteName,
    typedName,
    coming,
    peopleCount,
    functions,
    message,
    firstReplyValue,
    timesReplied
  ];

  if (rowLookup) {
    sheet.getRange(rowLookup, 1, 1, 9).setValues([values.map(escapeFormula)]);
  } else {
    sheet.appendRow(values.map(escapeFormula));
  }

  refreshSummarySheet(spreadsheet, summary, sheet);

  return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeString(value) {
  return String(value || '').trim().slice(0, 500);
}

function escapeFormula(value) {
  const text = String(value ?? '');
  const starts = ['=', '+', '-', '@'];
  return starts.some((prefix) => text.startsWith(prefix)) ? "'" + text : text;
}

function safeCell(value) {
  return value instanceof Date ? value : (value || '');
}

function getSpreadsheet() {
  if (typeof SpreadsheetApp !== 'undefined') {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (id) {
    return SpreadsheetApp.openById(id);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function ensureSheet(spreadsheet, name) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 9).setValues([['Last updated', 'Invite name', 'Name typed', 'Coming', 'People', 'Functions', 'Message', 'First reply', 'Times replied']]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
  }
  return sheet;
}

function ensureSummarySheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName('Summary');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Summary');
  }
  return sheet;
}

function findRowByInvite(sheet, inviteName, typedName) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    const rowInvite = String(values[i][1] || '').trim();
    const rowTyped = String(values[i][2] || '').trim();
    if (inviteName && rowInvite === inviteName) return i + 1;
    if (!inviteName && rowTyped === typedName) return i + 1;
  }
  return null;
}

function refreshSummarySheet(spreadsheet, summary, sheet) {
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1);
  const totalPeople = rows.reduce((sum, row) => sum + (Number(row[4]) || 0), 0);
  const familiesComing = rows.filter((row) => String(row[3]).toLowerCase() === 'yes').length;
  const familiesNotComing = rows.filter((row) => String(row[3]).toLowerCase() === 'no').length;
  const totalReplies = rows.length;
  summary.clear();
  summary.getRange(1, 1, 1, 2).setValues([['Metric', 'Value']]);
  summary.getRange(2, 1, 1, 2).setValues([['Total people coming', totalPeople]]);
  summary.getRange(3, 1, 1, 2).setValues([['Families coming', familiesComing]]);
  summary.getRange(4, 1, 1, 2).setValues([['Families not coming', familiesNotComing]]);
  summary.getRange(5, 1, 1, 2).setValues([['Total replies', totalReplies]]);

  const functionNames = ['Haldi', 'Mehendi', 'Sangeet', 'Baraat', 'Vivah', 'Reception'];
  functionNames.forEach((name, index) => {
    const sum = rows.reduce((total, row) => {
      const functions = String(row[5] || '');
      if (functions.toLowerCase().includes(name.toLowerCase())) {
        return total + (Number(row[4]) || 0);
      }
      return total;
    }, 0);
    summary.getRange(7 + index, 1, 1, 2).setValues([[name, sum]]);
  });
}
