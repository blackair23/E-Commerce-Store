import { useParams } from 'react-router-dom';
import style from './OrderEdit.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { OEdit } from '../OEdit/OEdit';

export const OrderEdit = () => {

    const { id } = useParams();
    const [order, setOrder] = useState();


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

    // const onSubmit = () => {
    //     console.log('submit')
    // };
    const handleDelete = (id) => {
        setOrder(prevOrder => {
            const newProd = prevOrder.orderedProd.filter((i) => i._id !== id);
            return { ...prevOrder, orderedProd: newProd };
        })
    };
    // const handleEdit = () => {

    //     console.log('edit')
    // };

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
            {openModal.modal === "edit" && <OEdit onClose={onClose}></OEdit> }
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
                {order ? 
                order.orderedProd.map((o, i) => (
                <tr key={o._id} scope="row">
                    <td data-label="N">{ i + 1 }</td>
                    <td data-label="Вид">{ o.data.name }</td>
                    <td data-label="Пореден номер от">{ o.data.startNumber >= 0  ? o.data.startNumber : " - "}</td>
                    <td data-label="До">{ o.data.startNumber >= 0 ? Number(o.data.startNumber) + (Number(o.quantity) - 1) : " - "}</td>
                    <td data-label="брой">{ o.quantity }</td>
                    <td data-label="Edit" ><i onClick={() => onBtnClick("edit")} className="fa-solid fa-pen"></i> <div></div><i onClick={() => handleDelete(o._id)} className="fa-solid fa-trash"></i></td>
                </tr>
                ))
                :
                ''
                }
            </tbody>
        </table>
        </section>
    )
}