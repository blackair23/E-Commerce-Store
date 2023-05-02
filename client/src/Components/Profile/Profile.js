import { useEffect, useState } from 'react';
import style from './Profile.module.css';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

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
                swal(err.message, {
                    icon: "error",
                });    
            })
    }, []);

    const deleteHandler = async (id) => {
        console.log('deleted')
        try {
            const ref = doc(db, 'orders', id);
            let deletedProd = await getDoc(ref);
            console.log('1 ->', deletedProd)
            console.log('2 ->',deletedProd.data());

            await deleteDoc(ref);

            // deletedProd.data().orderedProd.map(async (c) => {
            //     try {
            //         const ref = doc(db, 'awards', c._id)
            //         let currentProd = await getDoc(ref);
            //         console.log(currentProd.data());
            //         let cp = currentProd.data();
            //         console.log(cp);
            //         await updateDoc(ref, { 
            //             // startNumber: Number(c.data.startNumber) + Number(c.quantity - 1),
            //             stock: Number(cp.stock) + Number(c.quantity),
            //         })   
            //     } catch (err) {
            //         alert(err.message);
            //     }
            // })

            swal('Delete Successful', {
                icon: "success",
            });    
        } catch (err) {
            swal(err.message, {
                icon: "error",
            });    
        }
    }

    return(

        <section id={style.profile}>
            <h2>Orders</h2>
            <div>
            <table>
            <tbody>
            <tr>
                <th scope="col">Office:</th>
                <th scope="col">Date:</th>
                <th scope="col">Items:</th>
                <th scope="col">Status:</th>
                <th scope="col">Details</th>
            </tr>
            {/* eslint-disable  */}
                {orders ? 
                orders.map((o, i) => (
                <tr key={o._id} scope="row">
                    <td data-label="Office">{o.city}</td>
                    <td data-label="Date">{ o.timestamp.toDate().getDate() }/{ o.timestamp.toDate().getMonth() + 1}/{o.timestamp.toDate().getFullYear()}</td>
                    <td data-label="Items">{o.orderedProd.length}</td>
                    <td data-label="Status">{o.status}</td>
                    <td data-label="Details">
                        <Link to={`/order/${o._id}`}>Info</Link>  
                        <Link className={style.tblBtn} to={`/order/edit/${o._id}`}><i className="fa-solid fa-pen"></i></Link>
                        {/* <button className={style.tblBtn}><i className="fa-solid fa-pen"></i></button>   */}
                        <button disabled onClick={() => deleteHandler(o._id)} className={style.tblBtn}><i className="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
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