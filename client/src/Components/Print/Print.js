import { doc, getDoc } from 'firebase/firestore';
import styles from './Print.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';

export const Print = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getDoc(doc(db, 'orders', id))
            .then((res) => {
                let data = res.data();
                console.log(data);
                const filterdData = {data, _id: id};
                console.log(filterdData);
                setOrder(filterdData);
                currentNum(filterdData);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [id]);

    const currentNum = () => {
        console.log(id);
        let appProd= [];
        // const index = order.array.findIndex(object => {
        //     return object.id === id;
        // });
        // console.log('array index ->', index);
        if(order === null){
            console.log('exit');
            return
        }
        order.data.orderedProd.map(async (c) =>{
            const ref = doc(db, 'utils', c._id)
            let product = await getDoc(ref);
            let data = product.data();
            appProd.push(data);
            
        })
        console.log(appProd);
        setProducts(appProd);
    }

    useEffect(() => {
        if(order){
            currentNum()
        }
    }, [order])
        
    
    return (
        <section id={styles.print}>
            <div className={styles.page} size="A4">
        <h2>ПРИЕМО-ПРЕДАВАТЕЛЕН ПРОТОКОЛ</h2>
        <p className={styles.paragraph}>Днес  {order && order.data.timestamp.toDate().getDate()}/{ order? order.data.timestamp.toDate().getMonth() + 1 : ""}/{order? order.data.timestamp.toDate().getFullYear() : ""}г.
         в гр. София, долуподписаният представител на „...” – 
            офис {order && order.data.city} получи от представител на „...” 
            – Генерална Дирекция - следните заявления за застраховане и документи към тях:</p>
        
        <table>
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
                    <td data-label="До">{ o.data.startNumber >= 0 ? Number(o.data.startNumber) + (Number(o.quantity) - 1) : " - "}</td>
                    <td data-label="брой">{ o.quantity }</td>
                    {/* <td data-label="брой"><Link to={`/order/${o._id}`}>Info</Link></td> */}
                </tr>
                ))
                :
                ''
                }
            </tbody>
        </table>

            <div className={styles.sign}>
                <div className={styles.left}>
                    <p>
                        ПРЕДАЛ за ГРАВЕ - Централа:	
                    </p>
                    <p>
                        /.............................................../
                    </p>
                </div>
                <div className={styles.right}>
                    <p>
                        ПРИЕЛ за офис {order && order.data.city}:	
                    </p>
                    <p>
                        /............................................./
                    </p>
                </div>
            </div>
            </div>
        </section>
    )
}