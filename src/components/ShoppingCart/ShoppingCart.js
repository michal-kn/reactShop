// List of the products and cost is dynamically rendered and updated after manipulation with buttons
import React, { Component } from "react";
import { ProductList } from "../Products/ProductList";
import "./ShoppingCart.css";
import { NavLink } from "react-router-dom";
import round from "./round";

var cart = [];
var totalPrice = 0;

class ShoppingCart extends Component {
  localstorageToArray() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let amount = Number(localStorage.getItem(key));

      if (amount >= 1 && key !== "shipping") {
        cart.push({
          id: key,
          amount: amount,
        });
      }
    }
  }

  addBtnAction = (buttonId) => {
    const extractKeyNumber = Number(buttonId.target.id) - 10;
    const extractKeyString = String(extractKeyNumber);
    const valueBefore = Number(localStorage.getItem(extractKeyString));

    if (valueBefore < ProductList[extractKeyNumber].stock) {
      const valueAfter = valueBefore + 1;
      localStorage.setItem(extractKeyString, String(valueAfter));
      this.update();
    }
  };

  delBtnAction = (buttonId) => {
    const extractKeyNumber = Number(buttonId.target.id) - 20;
    const extractKeyString = String(extractKeyNumber);
    const valueBefore = Number(localStorage.getItem(extractKeyString));
    const valueAfter = valueBefore - 1;
    localStorage.setItem(extractKeyString, String(valueAfter));
    this.update();
  };

  drawCart() {
    if (cart.length < 1) {
      document.getElementById("cart").innerHTML =
        "<p>Your shopping cart is empty</p>";
      document.getElementById("cartSummary").innerHTML = "";
      return;
    }

    totalPrice = 0;

    for (var i = 0; i < cart.length; i++) {
      for (var j = 0; j < ProductList.length; j++) {
        // eslint-disable-next-line
        if (cart[i].id == ProductList[j].id) {
          const img = document.createElement("img");
          img.src = ProductList[j].src;

          const productDiv = document.createElement("div");
          productDiv.className = "product";
          const productId = "product" + j;
          productDiv.id = productId;

          const descriptionDiv = document.createElement("div");
          descriptionDiv.className = "description";
          const descriptionId = "description" + j;
          descriptionDiv.id = descriptionId;

          const title = document.createElement("h2");
          title.textContent += ProductList[j].name;

          const amount = document.createElement("p");
          amount.textContent += "Amount: " + cart[i].amount;

          const addBtn = document.createElement("button");
          addBtn.innerHTML += "+";
          var addBtnTemp = j + 10;
          addBtn.id = addBtnTemp;
          addBtn.onclick = this.addBtnAction;

          const delBtn = document.createElement("button");
          delBtn.innerHTML += "-";
          var delBtnTemp = j + 20;
          delBtn.id = delBtnTemp;
          delBtn.onclick = this.delBtnAction;

          const buttonDiv = document.createElement("div");
          buttonDiv.className = "button-container";
          const buttonId = "button-container" + j;
          buttonDiv.id = buttonId;

          var price = Number(cart[i].amount) * Number(ProductList[j].price);
          price = round(price);
          totalPrice = totalPrice + price;
          totalPrice = round(totalPrice);

          const priceH2 = document.createElement("h2");
          priceH2.textContent += "$" + price;
          priceH2.className = "priceH2";

          document.getElementById("cart").appendChild(productDiv);

          document.getElementById(productId).appendChild(img);
          document.getElementById(productId).appendChild(descriptionDiv);
          document.getElementById(descriptionId).appendChild(title);
          document.getElementById(descriptionId).appendChild(priceH2);
          document.getElementById(descriptionId).appendChild(amount);
          document.getElementById(descriptionId).appendChild(buttonDiv);
          document.getElementById(buttonId).appendChild(addBtn);
          document.getElementById(buttonId).appendChild(delBtn);
        }
      }
    }
    
    const shipping = document.getElementById("shipping");
    let shippingCost = Number(shipping.options[shipping.selectedIndex].value);
    shippingCost = round(shippingCost);
    totalPrice = totalPrice + shippingCost;
    totalPrice = round(totalPrice);

    localStorage.setItem("shipping", shippingCost);

    document.getElementById("totalCost").innerHTML = totalPrice;
  }

  componentDidMount() {
    this.update();
  }

  shippingChange = () => {
    this.update();
  };

  update() {
    const element = document.getElementById("cart");
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
    cart = [];
    this.localstorageToArray();
    this.drawCart();
  }

  render() {
    return (
      <div className="Content-Main">
        <div className="description">
          <h2>Your cart</h2>
        </div>

        <div id="cart"></div>

        <div id="cartSummary">
          <label htmlFor="shipping">Shipping method:</label>
          <div id="shippingDiv">
            <select
              id="shipping"
              name="shipping"
              onChange={this.shippingChange}
            >
              <option value="10">Courier +$10</option>
              <option value="5">Post +$5</option>
              <option value="0">Personal Collection $0</option>
            </select>
          </div>
          <h2>
            Total: $<span id="totalCost"></span>
          </h2>
          <div>
            <NavLink to="./Checkout" exact>
              <button>Check Out</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
