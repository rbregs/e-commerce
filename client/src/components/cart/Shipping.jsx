import React, { useEffect, useState } from "react";
import MetaData from "../pageLayout/MetaData";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";

export default function Shipping() {
  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [address, setAddress] = useState("");
  const [city, setcity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [country, setCountry] = useState("");

  const { shippingInfo  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingInfo ) {
      setAddress(shippingInfo ?.address);
      setcity(shippingInfo ?.city);
      setZipCode(shippingInfo ?.zipCode);
      setphoneNumber(shippingInfo ?.phoneNumber);
      setCountry(shippingInfo ?.country);
    }
  }, [shippingInfo ]);

  const formDataSubmit = (e) => {
                                  e.preventDefault();

                                  dispatch(saveShippingInfo({ address, city, phoneNumber, zipCode, country }));
                                  navigate('/confirm_order')
                                };

  return (
    <>
      <MetaData title={"Shipping"} />
      <CheckOutSteps Shipping />
      <div className="shipping-wrapper">
        <div className="shipping-details">
          <form
            className="shadow rounded bg-body"
            action="your_submit_url_here"
            method="post"
            onSubmit={formDataSubmit}
          >
            <h2 className="mb-4">Shipping Info</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="postal_code_field" className="form-label">
                Zip Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                name="postalCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label">
                Country
              </label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList.map((country) => (
                  <option key={country?.name} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
