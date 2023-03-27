import currencies from "iso4217";

const showCurrencies = () => {

  const currencyDetails = [];
  for (const currencyNum in currencies) {
    const currency = currencies[currencyNum];
    currencyDetails.push({
      coin: currency.Currency,
      coinCode: currency.Code,
      country: currency.Location,
      symbol: currency.Symbol,
    });
  }

  console.log(currencyDetails);

  return (
    <div>
      {currencyDetails.map((item) => (
        <>
          <p>{item.coin}  {item.coinCode}  {item.symbol} </p>
        </>
      ))}
    </div>
  );
};

export default showCurrencies;
