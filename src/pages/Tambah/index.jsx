import { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';
import * as Validator from 'validatorjs';

const Tambah = () => {

  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ stock, setStock ] = useState(0);
  const [ errorName, setErrorName ] = useState('');
  const [ errorPrice, setErrorPrice ] = useState('');
  const [ errorStock, setErrorStock ] = useState('');
  const status = true;
  
  
const addProduct = async (e) => {
  
  e.preventDefault();
  if (name && price && stock && status) {

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
    await fetch("http://localhost:3001/api/v4/product", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        stock,
        status
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then(data => {
        if(validation.passes()){
          setName('');
          setPrice(0);
          setStock(0);
          alert(`${name} berhasil ditambahkan`);
        }

      })
      .catch(err => {
        console.log(err.message);
      })

  }
  
}

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={addProduct}>
          <Input name="name" type="text" value={name} placeholder="Nama Produk..." label="Nama"
           onChange={(e) => setName(e.target.value)} required />
           <div className="errorDisplay"> {errorName}</div>
          <Input name="price" value={price} type="number" placeholder="Harga Produk..." label="Harga"
           onChange={(e) => setPrice(e.target.value)} required/>
          <div className="errorDisplay"> {errorPrice}</div>
          <Input name="Stock" value={stock} type="number" placeholder="Stock Produk..." label="Stock"
           onChange={(e) => setStock(e.target.value)} required/>
          <div className="errorDisplay"> {errorStock}</div>
          {/* <Input name="image" type="file" label="Image" /> */}
          <Input name="status" type="checkbox" label="Active" readOnly  checked/>
          <button className="btn btn-primary" >Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;