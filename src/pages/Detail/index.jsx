import { Link } from "react-router-dom";
import './index.scss';
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect, useState } from "react";

const Detail = () => {
  const params = useParams();
  const [Products, setProducts] = useState([]);

  // const [Error, setError] = useState(false);
  // const [Loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/v4/product/'+params.id)
    .then((res) =>  res.json())
    .then(res => {
      setProducts(res);
    })
    .catch(() => {
      console.log('error fetch data');
    })


}, [params.id]);


  return (
    <div className="main">


      <center>
      <img src={Products.image_url} alt="Something" height="200px" />
      </center>
      <br />
      <Link to="/" className="btn btn-primary">Kembali</Link>
      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: { Products._id }</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {Products.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {Products.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {Products.stock}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>: {Products.status ? 'Active' : 'Not Active'}</td>
          </tr>
      
        </tbody>
      </table>
      <br />
      

    </div>
  )
}

export default Detail;