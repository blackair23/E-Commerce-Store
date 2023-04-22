import { doc, getDoc } from 'firebase/firestore';
import styles from './Print.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';

export const Print = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        getDoc(doc(db, 'orders', id))
            .then((res) => {
                let data = res.data();
                console.log(data);
                const filterdData = {data, _id: id};
                console.log(filterdData);
                setOrder(filterdData);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [id]);
    
    return (
        <section id={styles.print}>
            <div className={styles.page} size="A4">
        <h2>ПРИЕМО-ПРЕДАВАТЕЛЕН ПРОТОКОЛ</h2>
        <p className={styles.paragraph}>Днес  {order && order.data.timestamp.toDate().getDate()}/{ order? order.data.timestamp.toDate().getMonth() + 1 : ""}/{order? order.data.timestamp.toDate().getFullYear() : ""}г.
         в гр. София, долуподписаният представител на „...” – 
            офис {order && order.data.city} получи от представител на „...” 
            – Генерална Дирекция - следните заявления за застраховане и документи към тях:</p>
        
        <table c>
            <tbody>
            <tr>
                <th scope="col">N:</th>
                <th scope="col">Вид:</th>
                <th scope="col">Пореден номер от:</th>
                <th scope="col">До:</th>
                <th scope="col">брой:</th>
            </tr>
            {/* eslint-disable  */}
                {order ? 
                order.data.orderedProd.map((o, i) => (
                <tr key={o._id} scope="row">
                    <td data-label="N">{ i + 1 }</td>
                    <td data-label="Вид">{ o.data.name }</td>
                    <td data-label="Пореден номер от">{ o.data.startNumber >= 0  ? o.data.startNumber : " - "}</td>
                    <td data-label="До">{ o.data.startNumber >= 0 ? Number(o.data.startNumber) + (Number(o.quantity)) : " - "}</td>
                    <td data-label="брой">{ o.quantity }</td>
                    {/* <td data-label="брой"><Link to={`/order/${o._id}`}>Info</Link></td> */}
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