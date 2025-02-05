import React, { useEffect, useState } from 'react'
import './List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/get/product`)
    if (response) {
      setList(response.data);
    }
    else {
      toast.error("Error")
    }
  }

  const removeProduct = async (productId) => {
    debugger
    const response = await axios.delete(`${url}/api/product/remove?productId=`+productId)
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Products List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.product_image} alt="" /> 
              <p>{item.product_name}</p>
              <p>{item.product_category}</p>
              <p>{currency}{item.price}</p>
              <p className='cursor' onClick={() => removeProduct(item.id)}>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
