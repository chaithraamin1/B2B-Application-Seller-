import React, { useContext, useState, useEffect } from "react";
import "./Add.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";


const Add = () => {
  const [menus, setMenuList] = useState([]);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity:""
  });

  const onSubmitHandler = async (event) => {
    debugger
    event.preventDefault();

    if (!image) {
      toast.error("Image not selected");
      return null;
    }

    const formData = new FormData();
    formData.append("product_name", data.name);
    formData.append("product_description", data.description);
    formData.append("product_category", data.category);
    formData.append("product_image", image);
    formData.append("price", Number(data.price));
    formData.append("available_quantity_count", data.quantity);
   
    const response = await axios.post(`${url}/api/add/product`, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.data.success) {
     toast.success(response.data.success);

      setData({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity:""
      });
      setImage(false);
    } else {
      toast.error(response.data.error);
    }
  };

  const onChangeHandler = (event) => {
    debugger
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/get/product/category`)
    if (response) {
        setMenuList(response.data);
    }
    else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
              e.target.value = "";
            }}
            type="file"
            accept="image/*"
            id="image"
            hidden
          />
          <label htmlFor="image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt=""
            />
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            type="text"
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
           

            <select
              class="selectpicker"
              id="selectpicker"
              // multiple="multiple"
              aria-label="Default select example"
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
               <option>select</option>
              {menus?.map((menu, index) => (
               
                <option value={menu.product_category_name} key={index}>
                  {menu.product_category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="25"
            />
          </div>
          <div className="add-price flex-col">
            <p>Product quantity</p>
            <input
              type="number"
              name="quantity"
              onChange={onChangeHandler}
              value={data.quantity}
              placeholder="0"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
