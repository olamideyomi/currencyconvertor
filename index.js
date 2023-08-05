const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("button");
const exIcon = document.querySelector(".fas.fa-exchange-alt");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

[fromCur, toCur].forEach((select, i) => {
  for (let curCode in Country_List) {
      const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP") ? "selected" : "";
      select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
  }
  select.addEventListener("change", () => {
      const code = select.value;
      const imgTag = select.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
  });
});

async function getExchangeRate() {
  const amountVal = amount.value || 1;
  exRateTxt.innerText = "Getting exchange rate...";
  try {
      const response = await fetch(`/api/exchangeRate?from=${fromCur.value}&to=${toCur.value}`);
      const result = await response.json();
      const totalExRate = (amountVal * result).toFixed(2);
      exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
  } catch (error) {
      exRateTxt.innerText = "Something went wrong...";
  }
}

window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
    getExchangeRate();
});
