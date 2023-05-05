import { useEffect, useState } from 'react';
import style from './Stock.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import swal from 'sweetalert';

export const Stock = () => {

    const [utils, setUtils] = useState(null);
    const [awards, setAwards] = useState(null);


    useEffect(() => {
        let refUtil = collection(db, 'utils')
        let refAwrd = collection(db, 'awards')
        getDocs(refUtil)
            .then((res) => {
                const filterdData = res.docs.map((doc) => ({...doc.data(), _id: doc.id}));
                console.log(filterdData);
                setUtils(filterdData)
            })
            .catch((err) => {
                swal(err.message, {
                    icon: "error",
                });    
            })

        getDocs(refAwrd)
            .then((res) => {
                const filterdData = res.docs.map((doc) => ({...doc.data(), _id: doc.id}))
                console.log(filterdData);
                setAwards(filterdData)
            })
            .catch((err) => {
                swal(err.message, {
                    icon: "error",
                });    
            })
    }, [])


    return(
        <section id={style.stock}>

            <h2>Current Stock</h2>

            <h3>Utils</h3>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th scope="col">N:</th>
                            <th scope="col">Product:</th>
                            <th scope="col">Stock:</th>
                        </tr>
                        {/* eslint-disable  */}
                            {utils ? 
                            utils.map((u, i) => {
                                let stock = Number(u.stock);
                                
                                for (let i = 0; i < u.array.length; i++) {
                                    stock -= Number(u.array[i].quantity);
                                }
                                return(

                                    <tr key={u._id} scope="row">
                                        <td data-label="N">{i + 1}</td>
                                        <td data-label="Product">{u.name}</td>
                                        <td data-label="Stock">{stock}</td>
                                    </tr>
                                )
                            })
                            :
                            ''
                            }
                        </tbody>
                    </table>
                </div>


            <h3>Awards</h3>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th scope="col">N:</th>
                            <th scope="col">Product:</th>
                            <th scope="col">Stock:</th>

                        </tr>
                        {/* eslint-disable  */}
                            {awards ? 
                            awards.map((a, i) => {
                                let stock = Number(a.stock);

                                for (let i = 0; i < a.array.length; i++) {
                                    stock -= Number(a.array[i].quantity)                                  
                                }
                                return(
                                    <tr key={a._id} scope="row">
                                        <td data-label="N">{i + 1}</td>
                                        <td data-label="Product">{a.name}</td>
                                        <td data-label="Stock">{stock}</td>
                                    </tr>
                                )
                            })
                            :
                            ''
                            } 
                        </tbody>
                    </table>
                </div>

        </section>
    )    
}