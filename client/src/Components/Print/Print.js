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
                data._id = id;
                setOrder(data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, [id]);

    const currentNum = async () => {
        let appProd = [];
      
        if (order === null) {
          console.log('exit');
          return;
        }
      
        try {
          const productPromises = order.orderedProd.map(async (c) => {
            const ref = doc(db, c.data.product, c._id);
            let product = await getDoc(ref);
            let data = product.data();
            data._id = c._id;
      
            return data;
          });
      
          const productData = await Promise.all(productPromises);
          appProd = productData;
      
          setProducts(appProd);
        } catch (error) {
          console.error(error);
        }
      };


    useEffect(() => {
        if(order){
            currentNum()
        }
    }, [order]) /* eslint-disable-line */

        
    
    return (
        <section id={styles.print}>
            <div className={styles.page} size="A4">
        <h2>ПРИЕМО-ПРЕДАВАТЕЛЕН ПРОТОКОЛ</h2>
        <p className={styles.paragraph}>Днес  {order && order.timestamp.toDate().getDate()}/{ order? order.timestamp.toDate().getMonth() + 1 : ""}/{order? order.timestamp.toDate().getFullYear() : ""}г.
         в гр. София, долуподписаният представител на „...” – 
            офис {order && order.city} получи от представител на „...” 
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
                {products.length > 0 ? 
                products.map((p, i) => {
                    console.log('---------map---------',p )
                    let index = '';
                    let startNumber = Number(p.startNumber);
                    let usedToNow = 0;
                    let from = 0;
                    // if(p.document){
                        index = p.array.findIndex(object => {
                            return object.id === id;
                        });
                        console.log('---------documents---------',index )
                        for (let i = 0; i <= index; i++) {
                            usedToNow += Number(p.array[i].quantity);
                            if(i === index - 1){
                                console.log(i , '<==>', index-1)
                                from = Number(usedToNow)
                            }
                            console.log(usedToNow);
                        }
                    // }
                    let currentQuantity = p.array[index].quantity;

                    return (
                        <tr key={p._id} scope="row">
                            <td data-label="N">{ i + 1 }</td>
                            <td data-label="Вид">{ p.name }</td>
                            <td data-label="Пореден номер от">{ p.document ? startNumber + from : "-" }</td>
                            <td data-label="До">{ p.document ? startNumber + usedToNow : "-" }</td>
                            <td data-label="брой">{ currentQuantity }</td>
                        </tr>
                    )})
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
                        ПРИЕЛ за офис {order && order.city}:	
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