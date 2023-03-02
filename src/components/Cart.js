import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemSecondaryAction,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData = [], productsData = []) => {
  let returned = [];
  for (let i = 0; i < cartData.length; i++) {
    let cart = cartData[i];
    let arr = productsData.filter((prod) => {
      if (prod._id === cart.productId) {
        prod.qty = cart.qty;
        return prod;
      }
    });
    Array.prototype.push.apply(returned, arr);
  }
  return;
export const generateCartItemsFrom = (cartData, productsData) => {
  if(!cartData) return;

  const nexxtCart=cartData.map((item)=>({
    ...item,
    ...productsData.find((product)=> item.productId === product._id),
  }));

  return nextCart

};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let totalCost = 0;
  if (!items.length) return 0;
  items.reduce((total, curr) => {
    total += curr.cost * curr.qty;
    totalCost = total;
    return total;
  }, 0);
  return totalCost;
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */

const ItemQuantity = ({ value, handleAdd, handleDelete }) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 *
 */
const Cart = ({ products, items = [], handleQuantity, isReadOnly }) => {
  const token = localStorage.getItem("token");

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      {isReadOnly ? (
        <>
          <Box className="cart">
            {items.map((item) => (
              <Box
                display="flex"
                alignItems="flex-start"
                padding="1rem"
                key={item._id}
              >
                <Box className="image-container">
                  <img
                    // Add product image
                    src={item.image}
                    // Add product name as alt eext
                    alt={item.image}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="6rem"
                  paddingX="1rem"
                >
                  <div>{item.name}</div>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box padding="0.5rem" fontWeight="500">
                      Qty:{item.qty}
                    </Box>
                    <Box padding="0.5rem" fontWeight="700">
                      ${item.cost}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
            <Box
              padding="1rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box color="#3C3C3C" alignSelf="center">
                Order total
              </Box>
              <Box
                color="#3C3C3C"
                fontWeight="700"
                fontSize="1.5rem"
                alignSelf="center"
                data-testid="cart-total"
              >
                ${getTotalCartValue(items)}
              </Box>
            </Box>
          </Box>
          <Box className="cart" padding="1rem">
            <Box
              justifyContent="space-between"
              alignItems="center"
              color="#3C3C3C"
              fontWeight="700"
              fontSize="1.5rem"
              paddingTop="0.5rem"
            >
              Order Details
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box paddingTop="0.5rem" color="#3C3C3C">
                Products
              </Box>
              <Box paddingTop="0.5rem">{items.length}</Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box paddingTop="0.5rem" color="#3C3C3C">
                Subtotal
              </Box>
              <Box paddingTop="0.5rem">${getTotalCartValue(items)}</Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box paddingTop="0.5rem" color="#3C3C3C">
                Shipping Charges
              </Box>
              <Box paddingTop="0.5rem">${0}</Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box paddingTop="1rem" fontWeight="700" fontSize="1.2rem">
                Total
              </Box>
              <Box paddingTop="0.5rem" fontWeight="700">
                ${getTotalCartValue(items)}
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box className="cart">
          {items.map((item) => (
            <Box
              display="flex"
              alignItems="flex-start"
              padding="1rem"
              key={item._id}
            >
              <Box className="image-container">
                <img
                  // Add product image
                  src={item.image}
                  // Add product name as alt eext
                  alt={item.image}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{item.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                    value={item.qty}
                    handleAdd={async () => {
                      await handleQuantity(
                        token,
                        items,
                        products,
                        item._id,
                        item.qty + 1
                      );
                    }}
                    handleDelete={async () => {
                      await handleQuantity(
                        token,
                        items,
                        products,
                        item._id,

                        item.qty - 1
                      );
                    }}
                    // Add required props by checking implementation
                  />
                  <Box padding="0.5rem" fontWeight="700">
                    ${item.cost}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
          <Box
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center">
              Order total
            </Box>
            <Box
              color="#3C3C3C"
              fontWeight="700"
              fontSize="1.5rem"
              alignSelf="center"
              data-testid="cart-total"
            >
              ${getTotalCartValue(items)}
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Link className="link" to="/checkout">
              {" "}
              <Button
                color="primary"
                variant="contained"
                startIcon={<ShoppingCart />}
                className="checkout-btn"
              >
                Checkout
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
