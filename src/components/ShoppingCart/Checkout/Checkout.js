// Shipping form after validation doesn't submit, instead it updates the state and clears localstorage
import React, { Component } from "react";
import { ProductList } from "../../Products/ProductList";
import { Redirect } from "react-router";
import "./Checkout.css";
import round from "../round";

class Checkout extends Component {
  state = {
    payment: "card",
    cardNumber: null,
    cardExpirationDate: null,
    cvvCode: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    phoneNumber: null,
    streetAddress: null,
    city: null,
    zipCode: null,
  };

  paymentChange = (event) => {
    var value = event.target.value;
    this.setState({
      payment: value,
    });
  };

  clearLocalStorage() {
    const length = ProductList.length;
    for (var i = 0; i <= length; i++) {
      if (Number(localStorage.getItem(String(i))) < 1) {
        localStorage.removeItem(String(i));
      }
    }
  }

  isCartEmpty() {
    this.clearLocalStorage();
    const length = localStorage.length;
    if (length < 2) {
      return true;
    } else return false;
  }

  drawSummary() {
    document.getElementById("cart").innerHTML = "";
    var totalCost = 0;
    for (var i = 0; i < localStorage.length; i++) {
      for (var j = 0; j < ProductList.length; j++) {
        // eslint-disable-next-line
        if (Number(localStorage.key(i)) == ProductList[j].id) {
          totalCost += round(
            ProductList[j].price * Number(localStorage.getItem(String(j)))
          );
          document.getElementById("cart").innerHTML +=
            "<p>" +
            ProductList[j].name +
            "  &times;  " +
            localStorage.getItem(String(j)) +
            "</p>";
        }
      }
    }

    totalCost += Number(localStorage.getItem("shipping"));

    switch (localStorage.getItem("shipping")) {
      case "10":
        document.getElementById("cart").innerHTML +=
          "<p>Shipping method: Courier</p>";
        break;
      case "5":
        document.getElementById("cart").innerHTML +=
          "<p>Shipping method: Post</p>";
        break;
      case "0":
        document.getElementById("cart").innerHTML +=
          "<p>Shipping method: Personal Collect</p>";
        break;
      default:
        document.getElementById("cart").innerHTML += "Error";
    }

    document.getElementById("cart").innerHTML +=
      "<h3>Total: $" + round(totalCost) + "</h3>";
  }

  submitOrder = (event) => {
    event.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value;
    const cvvCode = document.getElementById("cvvCode").value;
    const expirationDate = document.getElementById("expirationDate").value;

    const cardNumberPattern1 = /[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/;
    const cardNumberPattern2 = /[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}/;
    const cvvPattern = /[0-9]{3}/;
    const expirationDatePattern = /[0-9]{2}[/][0-9]{2}/;

    if (
      (cardNumber.match(cardNumberPattern1) ||
        cardNumber.match(cardNumberPattern2)) &&
      cvvCode.match(cvvPattern) &&
      expirationDate.match(expirationDatePattern) &&
      this.state.payment === "card"
    ) {
      this.finishScreen();
      return;
    } else if (this.state.payment === "card") {
      document.getElementById("paymentInfoWarning").innerHTML =
        "Please fill out correct Credit Card information";
      return;
    }

    this.finishScreen();
  };

  finishScreen = () => {
    this.setState({
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      emailAddress: document.getElementById("emailAddress").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      streetAddress: document.getElementById("streetAddress").value,
      city: document.getElementById("city").value,
      zipCode: document.getElementById("zipCode").value,
    });

    if (this.state.payment === "card") {
      this.setState({
        cardNumber: document.getElementById("cardNumber").value,
        expirationDate: document.getElementById("expirationDate").value,
        cvvCode: document.getElementById("cvvCode").value,
      });
    }

    this.orderNumberMessage();
  };

  orderNumberMessage() {
    const orderNumber = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;

    document.getElementById("order").innerHTML =
      "<h1>Thank You <span id='colorInfo' >" +
      document.getElementById("firstName").value +
      "</span>,<br>Your order  (number <span id='colorInfo' >#" +
      orderNumber +
      "</span>) was placed.</h1>";

    setInterval(function () {
      localStorage.clear();
    }, 1000);
  }

  componentDidMount() {
    this.drawSummary();
  }

  cardCompany(event) {
    const firstLetter = event.target.value.charAt(0);
    const handleSpan = document.getElementById("cardCompany");
    switch (firstLetter) {
      case "4":
        handleSpan.innerHTML = "<p>You are paying with VISA</p>";
        break;
      case "5":
        handleSpan.innerHTML = "<p>You are paying with MASTERCARD</p>";
        break;
      default:
        handleSpan.innerHTML = "";
    }
  }

  render() {
    const cartState = this.isCartEmpty();
    return (
      <div className="Content-Main" id="order">
        {cartState ? <Redirect to="/ShoppingCart" /> : null}

        <div id="summary">
          <div className="description">
            <h2>Summary</h2>
          </div>

          <div id="cart"></div>
        </div>

        <div className="description">
          <h2>Your Details</h2>
        </div>

        <div className="clientDetails">
          <div className="shippingForm">
            <form onSubmit={this.submitOrder} id="mainForm">
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                pattern="[a-zA-Z]{2,}"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                pattern="[a-zA-Z]{2,}"
                required
              />
              <input
                type="email"
                placeholder="Email  Address"
                id="emailAddress"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
              />
              <input
                type="text"
                placeholder="Phone Number  [ +XX XXX XXX XXX ]"
                id="phoneNumber"
                pattern="[+][0-9]{2}\s*[0-9]{9}"
                required
              />
              <input
                type="text"
                placeholder="Street Address"
                id="streetAddress"
                pattern="[A-Za-z0-9\s*\/]{5,}"
                required
              />
              <input
                type="text"
                placeholder="City"
                id="city"
                pattern="[A-Za-z]{2,}"
                required
              />
              <input
                type="text"
                placeholder="Zip Code [ XX-XXX ]"
                id="zipCode"
                pattern="[0-9]{2}[-][0-9]{3}"
                required
              />
              <button type="submit">Place an Order</button>
            </form>
          </div>
          <div className="paymentMethod">
            <label htmlFor="choosePayment">
              <p>Payment Method</p>
            </label>
            <select
              id="choosePayment"
              name="choosePayment"
              defaultValue="card"
              onChange={this.paymentChange.bind(this)}
            >
              <option value="card">Card</option>
              <option value="onDel">Cash on Delievery</option>
            </select>

            <div id="paymentMethodForm" className={this.state.payment}>
              <form id="creditCardForm">
                <input
                  type="text"
                  placeholder="Card Number [ XXXX XXXX XXXX XXXX ]"
                  id="cardNumber"
                  onChange={this.cardCompany}
                />
                <input type="text" placeholder="CVV [ XXX ]" id="cvvCode" />
                <input
                  type="text"
                  placeholder="Expiration Date [ MM/YY ]"
                  id="expirationDate"
                />
              </form>
              <span id="paymentInfoWarning"></span>
              <span id="cardCompany"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
