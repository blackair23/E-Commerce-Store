import { useParams } from 'react-router-dom';
import style from './OrderEdit.module.css';
import { useEffect, useState } from 'react';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { OEdit } from '../OEdit/OEdit';

export const OrderEdit = () => {

    const { id } = useParams();
    const [order, setOrder] = useState();
    const [products, setProducts] = useState([]);
    const [prodId, setProdId] = useState('');



    useEffect(() => {
        let ref = doc(db, 'orders', id)
        getDoc(ref)
            .then((res) => {
                let data = res.data();
                console.log('data ->', data);
                setOrder(data);
            })
            .catch((err) => {
                alert(err.message)
            })
    },  [id])

    const currentNum = () => {
        let appProd= [];

        if(order === null){
            console.log('exit');
            return
        }
        order.orderedProd.map(async (c) =>{
            const ref = doc(db, 'utils', c._id)
            let product = await getDoc(ref);
            let data = product.data();
            console.log('important ------------>',data);
            data._id = c._id;

            appProd.push(data);
            // console.log('pushed ------------>',appProd);
            setProducts(appProd);
        })
        // console.log('What? ------------>',appProd);

    }

    useEffect(() => {
        if(order){
            currentNum()
        }
    }, [order]) /* eslint-disable-line */

    // const onSubmit = () => {
    //     console.log('submit')
    // };
    const handleDelete = async (prodId) => {
        console.log(prodId)

        let currentProd = products.filter((p) => p._id === prodId);
        let deleted = currentProd[0].array.filter((o) => o.id !== id);
        console.log(deleted);
        // let index = currentProd[0].array.findIndex((obj) => obj.id === id);
        // console.log(index);
        // console.log(currentProd[0].array[index]);
        // console.log('before->', currentProd[0].array[index]);
        // currentProd[0].array[index].quantity = Number(quantity);
        // console.log('after->', currentProd[0].array[index]);
        // console.log(currentProd[0]);
        // let change = currentProd[0].array;

        try {
            const ref = doc(db, 'utils', prodId);
            await updateDoc(ref, {array: deleted});
            setProducts(prevOrder => {
                const newProd = prevOrder.orderedProd.filter((i) => i._id !== prodId);
                return { ...prevOrder, orderedProd: newProd };
            })
            alert('delete succesful');
        } catch (err) {
            alert(err.message)
        }

    };


    const handleEdit = (prodId) => {
        setProdId(prodId);
        onBtnClick("edit");
        console.log('edit', prodId);
    };

    const [openModal, setModal] = useState({modal: null, state: false});
    const onBtnClick = (modal) => {
        setModal({modal, state: true});
    }
    const onClose = () => {
        setModal({modal: null, state: false});
    }


    return (
        <section id={style.orderEdit}>
            <h2>Edit order</h2>
            <p>Office: {order?.city}</p>
            <p>Email: {order?.email}</p>
            <p>Status: {order?.status}</p>
            {openModal.modal === "edit" && <OEdit prodId={prodId} orderId={id} products={products} onClose={onClose}></OEdit> }
            {order?.orderedProd.length}

        <table>
            <tbody>
            <tr>
                <th scope="col">N:</th>
                <th scope="col">Вид:</th>
                <th scope="col">Пореден номер от:</th>
                <th scope="col">До:</th>
                <th scope="col">брой:</th>
                <th scope="col">Edit:</th>
            </tr>
            {/* eslint-disable  */}
            {products.length > 0 ? 
                products.map((p, i) => {
                    let index = '';
                    let startNumber = Number(p.startNumber);
                    let usedToNow = 0;
                    let from = 0;
                    if(p.document){
                        index = p.array.findIndex(object => {
                            return object.id === id;
                        });
                        for (let i = 0; i <= index; i++) {
                            usedToNow += Number(p.array[i].quantity);
                            if(i === index - 1){
                                from = Number(usedToNow)
                            }
                        }
                    }
                    let currentQuantity = p.array[index].quantity;

                    return (
                        <tr key={p._id} scope="row">
                                <td data-label="N">{ i + 1 }</td>
                                <td data-label="Вид">{p.name  }</td>
                                <td data-label="Пореден номер от">{ startNumber + from }</td>
                                <td data-label="До">{ startNumber + usedToNow}</td>
                                <td data-label="брой">{ currentQuantity }</td>
                                <td data-label="Edit" ><i onClick={() => handleEdit(p._id)} className="fa-solid fa-pen"></i> <div></div><i onClick={() => handleDelete(p._id)} className="fa-solid fa-trash"></i></td>
                        </tr>
                    )})
                :
                ''
                }
            </tbody>
        </table>
        </section>
    )
}