function calculateMoney() {
  let bills100 = parseFloat(document.getElementsByName('100bills')[0].value || 0);
  let bills50 = parseFloat(document.getElementsByName('50bills')[0].value || 0);
  let bills20 = parseFloat(document.getElementsByName('20bills')[0].value || 0);
  let bills10 = parseFloat(document.getElementsByName('10bills')[0].value || 0);
  let bills5 = parseFloat(document.getElementsByName('5bills')[0].value || 0);
  let bills1 = parseFloat(document.getElementsByName('1bills')[0].value || 0);
  let quarters = parseFloat(document.getElementsByName('quarters')[0].value || 0);
  let dimes = parseFloat(document.getElementsByName('dimes')[0].value || 0);
  let nickels = parseFloat(document.getElementsByName('nickels')[0].value || 0);
  let otherAmounts = parseFloat(document.getElementsByName('otherAmounts')[0].value || 0);

  let totalAmount = document.getElementById('totalAmount');
  let sum = (100*bills100) + (50*bills50) + (20*bills20) + (10*bills10) + (5*bills5) + bills1 + (0.25*quarters) + (.10*dimes) + (0.05*nickels) + otherAmounts;

  totalAmount.innerHTML = `Total Amount: $${sum.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}
