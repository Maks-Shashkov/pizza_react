import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "../components/CartItem";
import {clearProduct, removeProduct} from "../redux/slices/cartSlice";
import CartEmpty from "../components/CartEmpty";