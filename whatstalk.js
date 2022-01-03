const HEADER_CLASS = '_23P3O';
const EIGHT_HOURS = 28800000;
const logs = [];

function getProfileHeaderElem() {
  const elem = document.getElementsByClassName(HEADER_CLASS);
  if (elem.length) {
    return elem[0];
  } else {
    throw new Error('Class name invalid, could not retrieve element.');
  }
}

function mutationCallback(muts) {
  if (muts[0].addedNodes.length < 1) return;
  const contact = muts[0].target.innerText.trim();
  const timestamp = new Date().toLocaleString();
  const date = timestamp.split(', ')[0];
  const time = timestamp.split(', ')[1];
  const msg = `User [${contact}] went online on [${timestamp}].`
  console.log(msg);
  console.log(`Mutations,`, muts);
  const greeting = new Notification(msg);
  const data = { contact, date, time };
  logs.push(data);
}

function toCsv() {
  let csv = 'index,user,date,time\n';
  logs.forEach((log, index) => {
    csv += `${index},"${log.contact}","${log.date}","${log.time}"\n`;
  });
  console.log(csv);
  let hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'logs.csv';
  hiddenElement.click();
}

function downloadCsv() {
  setTimeout(() => {
    toCsv();
    downloadCsv();
  }, EIGHT_HOURS);
}

function main(observer) {
  console.log(`Init script.`);
  const config = { attributes: true, childList: true, subtree: true };
  observer.observe(getProfileHeaderElem(), config);
  console.log(`Observing...`);
  downloadCsv()
}

const observer = new MutationObserver(mutationCallback);
main(observer);