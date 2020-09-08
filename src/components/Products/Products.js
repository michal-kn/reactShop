// Mapping all of the products from ProductList and displaying them
import React, { Component } from "react";
import { ProductList } from "./ProductList";
import "./Products.css";

class Products extends Component {
  buttonClick = (id) => {
    if (!localStorage.getItem(id)) {
      let one = 1;
      localStorage.setItem(id, one.toString());
    } else {
      let value = Number(localStorage.getItem(id));

      if (value < ProductList[id].stock) {
        value = value + 1;
        localStorage.setItem(id, value.toString());

        document.getElementById(id).innerHTML = "Added to cart";
      }
    }

    window.setTimeout(function () {
      var idHandle = document.getElementById(id);

      if (idHandle) {
        idHandle.innerHTML = "";
      }
    }, 1000);
  };

  render() {
    return (
      <div className="Content-Main">
        <div className="description">
          <h2>Product list</h2>
        </div>

        <div className="product-grid">
          {ProductList.map((item) => {
            return (
              <div key={item.id} className="item">
                <img src={item.src} alt="obrazek" />
                <h3>{item.name}</h3>
                <p>Color: {item.color}</p>
                <p>Left in stock: {item.stock}</p>
                <p>
                  Price: <span className="itemPrice">${item.price}</span>
                </p>
                <button onClick={this.buttonClick.bind(this, item.id)}>
                  Add to cart
                </button>
                <div id={item.id} className="addedToCart"></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Products;
