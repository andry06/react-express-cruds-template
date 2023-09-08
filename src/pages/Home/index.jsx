import { Link } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';

const Home = () => {
  // const [Products, setProducts] = useState([]);
  const [Current, setCurrent] = useState([]);
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Search, setSearch] = useState('');
  const [Refresh, setRefresh] = useState(false);

  useEffect(() => {
      fetch('http://localhost:3001/api/v4/product/')
      .then((res) =>  res.json())
      .then(res => {
        // setProducts(res);
        setCurrent(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [Refresh]);

  useEffect(() => {
    
    setLoading(true);
    setTimeout(() => {
      fetch(`http://localhost:3001/api/v4/product/?search=${Search}`)
      .then((res) =>  res.json())
      .then(res => {
        if(res.length === 0){
          setError(true);
          return
        }
        // setProducts(res);
        setCurrent(res);
      })
      .catch(err => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
    }, 200);
}, [Search, Refresh]);

const handleDelete = async (id) => {
  if (window.confirm("Apakah yakin data yang di pilih akan didelete") === true) {
    await fetch(`http://localhost:3001/api/v4/product/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        setRefresh(!Refresh);
        alert('Data berhasil didelete');
    
      })
      .catch(err => {
        console.log(err.message);
      })
  } 
}


//   useEffect(() => {
//     let tempData = Products;
//     if(Search !== ''){
        
//         const regexSearch = new RegExp(`.*${Search}.*`, 'gi');
//             // console.log(regexSearch);
//             tempData = tempData.filter(function (p) { 
//                 return p.name.match(regexSearch);
//             });
             
//         setTimeout(() => {
//             setCurrent(tempData);
//             setLoading(false);
//             setError(tempData.length === 0 ? true : false);
//         }, 200);
       
//     }else{
//       setCurrent(Products);
//       setLoading(false);
//     }
// }, [Search, Products])

  return(
   
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tamah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={e => { 
          setSearch(e.target.value);
          setLoading(true);
          }}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Stock</th>
            <th className="text-right">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {Loading ? <tr><td className='text-center' colSpan={5}>Loading ... </td></tr> : Error ? 
          <tr><td className='text-center' colSpan={5}>Data Not Found ... </td></tr> : 
                        
          Current.map((produk, i) => (
          <tr key={i}>
            <td>{produk._id}</td>
            <td>{produk.name}</td>
            <td className="text-right">{produk.price}</td>
            <td className="text-right">{produk.stock}</td>
            <td className="text-right">{produk.stock ? 'Aktive' : 'Not Aktive'}</td>
            <td className="text-center">
              <Link to={`/detail/${produk._id}`} className="btn btn-sm btn-info">Detail</Link>
              <Link to={`/edit/${produk._id}`} className="btn btn-sm btn-warning">Edit</Link>
              <button onClick={() => {handleDelete(produk._id)}} className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;