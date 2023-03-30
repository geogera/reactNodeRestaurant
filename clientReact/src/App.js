
import React from "react";
import { Accordion } from 'react-bootstrap'
import axios from "axios"
import Currency from "./currency"
function App() {

  //data of the menu
  const [data, setData] = React.useState(null);
  //rates based on eur
  const [rates, setRates] = React.useState({});
  //basket items
  const [basket, setBasket] = React.useState([]);
  //currency
  const [currency, setCurrency] = React.useState("EUR")

  //fetch the menu items
  React.useEffect(() => {
    fetch("/api")
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

  //function to add items to basket
  function addItem(event) {
    const { name, value } = event.target;
    const newValue = { name: name, price: value }
    setBasket((prevItems) => {
      return [...prevItems, newValue];
    });
    event.preventDefault();
  }

  //submit order 
  function handleSubmit(e) {
    e.preventDefault();
    console.log(basket[0].name)
    //post items to the api order items to save them to the db
    axios
      .post('/apiOrderItems', { data: basket })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
    //second method
    // const options = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    //   body: JSON.stringify({"data":basket}),
    // };
    // fetch('/orderItems',options).catch((e)=>console.log(e))

  };

  //delete items from basket
  function deleteItem(event) {
    const id = event.target.value
    setBasket((prevItems) => {
      return prevItems.filter((item, index) => {
        return index != id;
      });
      event.preventDefault();
    });

  }
  //handle change of currency
  function handleclick(e) {
    e.preventDefault();
    console.log(e.target.value)
    setCurrency(e.target.value)
  };

  return (
    <div>
      <div class="box-2" id="heading">
        <h1> Restaurant</h1>
        <Currency handleChange={handleclick} />
        
      </div>

      {/* map the items in the data */}
      <div class="box position-absolute top-50 start-0 translate-middle-y">
        {data?.map(function (item, index) {
          return <Accordion flush key={index}>
            <Accordion.Item eventKey="0" >
              <Accordion.Header>{item.name}</Accordion.Header>
              <Accordion.Body>
                {item.items?.map((foodItem, index) => {
                  return <div class=" accordion-body row" key={index} >
                    <p class=" col-4" >{foodItem.name}</p>
                    {/* mul by rate of currency */}
                    <p class="col-4 text-right" >{(foodItem.price * rates.rates?.currency).toFixed(2)}</p>
                    <button class="col-4" name={foodItem.name} value={foodItem.price} onClick={addItem} >Add Item</button>
                  </div>
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        })}
      </div>
      {/* basket */}
      <div class="box-3 position-absolute top-50 end-0 translate-middle-y">
        <div class="card">
          <div class="card-header text-center">
            <h2>Order</h2>
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0 text-center">
              <form class="item" >
                {basket?.map((item, index) => {
                  return <div class="row" key={index}>
                    <p class="col-a">{item.name}</p>
                    <p class="col-a">{(item.price * rates.rates?.currency).toFixed(2)}</p>
                    <button class="col-a" name="checkbox" value={index} onClick={deleteItem} >delete</button>
                  </div>
                })}
                <footer class="text-center mt-4"><button type="submit" name="order" onClick={handleSubmit} value={basket}>Place order</button></footer>
              </form>
            </blockquote>
          </div>
        </div>
      </div>
      <a class="btn btn-dark " href="/orderItems">See orders</a>
    </div>


  );
}

export default App;



