
import React from "react";
import Currency from "./currency"



function Order() {
  const [data, setData] = React.useState(null);
  const [rates, setRates] = React.useState({});
  const [currency, setCurrency] = React.useState("EUR")
  //fetch order items
  React.useEffect(() => {
    fetch("/apiOrderItems")
      .then((res) => res.json())
      .then((data) => setData(data));

  }, []);

  //fetch the rates
  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "y9KJRhtwrTLJpilT4QzcuwvDv9NH5ZeE");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch("https://api.apilayer.com/fixer/latest?symbols=GBP,JPY,USD,CAD,CNY,INR,EUR&base=EUR", requestOptions)
      // fetch("/exchange")
      .then(response => response.json())
      .then(rates => {
        setRates(rates)
        console.log(rates.rates)

      })


  }, []);

  function handleclick(e) {
    e.preventDefault();
    console.log(e.target.value)
    setCurrency(e.target.value)
  };

  return (
    <div class="box-2" >
      <h2 class='text-center'>Orders</h2>
      <Currency handleChange={handleclick} />
      {data?.map(function (item, index) {
        //return a table for each of the order items /and delete on form submit
        return <form method="post" action="/apiDelete"> <table class="table table-sm ">
          <caption>order #{index}</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Food</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          {item.items?.map((foodItem, index) => {
            return <tbody><tr>
              <th scope="row">{index}</th>
              <td>{foodItem.name}</td>
              {/* multiply by the rate for the exchange */}
              <td>{foodItem.price * rates?.rates[currency]}</td>
              <td>Amount</td>
            </tr></tbody>
          })}
          <tfoot>
            <tr ><td ><button class="btn btn-dark ">Accept order</button></td>
              <td ><button class="btn btn-danger " name='id' value={item._id}>Delete</button></td></tr>
          </tfoot>
        </table>
        </form>
      })}

    </div>)




}



export default Order;