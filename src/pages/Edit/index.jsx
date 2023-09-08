import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './index.scss';
import * as Validator from 'validatorjs';

const Edit = () => {
  const params = useParams();
  const [Products, setProducts] = useState({status: true});
  const [ errorName, setErrorName ] = useState('');
  const [ errorPrice, setErrorPrice ] = useState('');
  const [ errorStock, setErrorStock ] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/v4/product/'+params.id)
    .then((res) =>  res.json())
    .then(res => {
      setProducts(res);
    })
    .catch(err => {
      console.log(err.message);
    })
   

}, [params.id]);



const editProduct = async (e) => {
  
  e.preventDefault();
        const { name, price, stock } = Products;
        let data = {name, price, stock}; 
        let rules = {
          name: 'required|min:3',
          price: 'required|numeric|min:100',
          stock: 'numeric|required'
        };
        let validation = new Validator(data, rules);
        validation.passes();
        setErrorName(validation.errors.get('name').toString());
        setErrorPrice(validation.errors.get('price').toString());
        setErrorStock(validation.errors.get('stock').toString());
      await fetch(`http://localhost:3001/api/v4/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(Products),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then(() => {
        if(validation.passes()){
          alert('Data berhasil diedit');
        }
    
      })
      .catch(() => {
        console.log('error fetch data');
      })

}

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" defaultValue={Products.name} 
            onChange={(e) => { setProducts({...Products, name: e.target.value}) }} />
             <div className="errorDisplay"> {errorName}</div>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" defaultValue={Products.price}
            onChange={(e) => { setProducts({...Products, price: e.target.value}) }} />
             <div className="errorDisplay"> {errorPrice}</div>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" defaultValue={Products.stock}
            onChange={(e) => { setProducts({...Products, stock: e.target.value}) }}/>
             <div className="errorDisplay"> {errorStock}</div>
          <Input name="status" type="checkbox" label="Active" checked={Products.status} onChange={(e) => { setProducts({...Products, status: !Products.status}) }} />
          <button type="submit" onClick={editProduct} className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;