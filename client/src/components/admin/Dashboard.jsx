import React, { useEffect, useState } from "react";
import AdminLayout from "../pageLayout/AdminLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesChart from "../charts/SalesChart";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { Loader } from "../pageLayout/Loader";

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales,{error, isLoading, data}] = useLazyGetDashboardSalesQuery()


  useEffect(() => {
    if (error) {
      toast.error(error?.data.message);
    }

    if (startDate && endDate && !data){
      getDashboardSales({
        startDate:new Date(startDate).toISOString(),
        endDate:endDate.toISOString()
      })
    }
  }, [error]);

  if (isLoading) return <Loader />


  const submitHandler =() => {
    // console.log('=============')
    // console.log(new Date(startDate).toISOString())
    // console.log(endDate.toISOString())
    // console.log('=============')

    getDashboardSales({
      startDate:new Date(startDate).toISOString(),
      endDate:endDate.toISOString()
    })

  }

  console.log(data)

  return (
    <>
      <AdminLayout>
        <div className="d-flex justify-content-start align-items-center">
          <div className="mb-3 me-4">
            <label className="form-label d-block">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-block">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
               className="form-control"
            />
          </div>
          <button className="db-btn" onClick={submitHandler}>Fetch</button>
        </div>

        <div className="db-row">
          <div className="db-sales">
            <div className="bd-card">
              <div className="db-text">
                Sales
                <br />
                ${data?.totalsales}
              </div>
            </div>
          </div>

          <div className="db-orders">
            <div className="bd-card">
              <div className="db-text">
                Orders
                <br />
                {data?.totalNumOrders}
              </div>
            </div>
          </div>
        </div>

       <SalesChart salesData ={data?.sales} />

        <div className="mb-5"></div>
      </AdminLayout>
    </>
  );
}
