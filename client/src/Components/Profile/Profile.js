import { useEffect, useState } from 'react';
import style from './Profile.module.css';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        getDocs(collection(db, 'orders'))
            .then((res) => {
                // let data = res.data();
                const filterdData = res.docs.map((doc) => ({...doc.data(), _id: doc.id}))
                // const filteredData = {da}
                console.log(res);
                console.log(filterdData);
                setOrders(filterdData);
            })
            .catch((err) => {
                alert(err.message);
            })
    }, []);

    const deleteHandler = async (id) => {
        const ref = doc(db, 'orders', id);
        await deleteDoc(ref);
        alert('deleted');

    }

    return(

        <section id={style.profile}>
            <h2>Orders</h2>
            <div>
            <table>
            <tbody>
            <tr>
                <th scope="col">Num:</th>
                <th scope="col">Date:</th>
                <th scope="col">Items:</th>
                <th scope="col">Status:</th>
                <th scope="col">Details</th>
            </tr>
            {/* eslint-disable  */}
                {orders ? 
                orders.map((o, i) => (
                <>
                <tr key={o._id} scope="row">
                    <td data-label="Num">{i + 1}</td>
                    <td data-label="Date">{ o.timestamp.toDate().getDate() }/{ o.timestamp.toDate().getMonth() + 1}/{o.timestamp.toDate().getFullYear()}</td>
                    <td data-label="Items">{o.orderedProd.length}</td>
                    <td data-label="Status">{o.status}</td>
                    <td data-label="Details">
                        <Link to={`/order/${o._id}`}>Info</Link>  
                        <button className={style.tblBtn}><i className="fa-solid fa-pen"></i></button>  
                        <button onClick={() => deleteHandler(o._id)} className={style.tblBtn}><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
                </>
                ))
                :
                ''
                }
            </tbody>
            </table>
            </div>

        </section>

    )
}