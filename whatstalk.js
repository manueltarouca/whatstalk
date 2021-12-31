const HEADER_CLASS = '_23P3O';
const logs = [];

function getProfileHeaderElem() {
  const elem = document.getElementsByClassName(HEADER_CLASS);
  if (elem.length) {
    return elem[0];
  } else {
    throw new Error('Class name invalid, could not retrieve element.');
  }
}

function mutationCallback() {
  const timestamp = new Date().toLocaleString();
  console.log(`User went online on [${timestamp}]`);
  logs.push(timestamp);
}


function main() {
  console.log(`Init script.`);
  const observer = new MutationObserver(mutationCallback);
  const config = { attributes: true, childList: true, subtree: true };
  observer.observe(getProfileHeaderElem(), config);
  console.log(`Observing...`);
}

function toCsv() {
  let csv = 'index,timestamp\n';
  logs.forEach((log, index) => {
    csv += `${index},${log}\n`;
  });
  console.log(csv);
  let hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'logs.csv';
  hiddenElement.click();
}

main();