const currencyone = document.getElementById("currency-one");
const currencytwo = document.getElementById("currency-two");
const amountone = document.getElementById("amount-one");
const amounttwo = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

// Event listners
currencyone.addEventListener("change", calculate);
currencytwo.addEventListener("change", calculate);
amountone.addEventListener("input", calculate);
amounttwo.addEventListener("input", calculate);

// function - fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyone.value;
  const currency_two = currencytwo.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rates = data.rates[currency_two];
      rate.innerText = `1 ${currency_one} = ${rates} ${currency_two}`;
      amounttwo.value = (amountone.value * rates).toFixed(2);
    });
}

// event listner - on clicking swap button selected currencies are swapped
swap.addEventListener("click", () => {
  const temp = currencyone.value;
  currencyone.value = currencytwo.value;
  currencytwo.value = temp;
  calculate();
});

calculate();
