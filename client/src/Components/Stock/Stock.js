import style from './Stock.module.css';

export const Stock = () => {
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
                            {/* {orders ? 
                            orders.map((o, i) => ( */}
                            {/* <tr key={o._id} scope="row"> */}
                            <tr scope="row">
                                <td data-label="N">{1}</td>
                                <td data-label="Product">Product</td>
                                <td data-label="Stock">Product</td>
                            </tr>
                            {/* )) */}
                            {/* :
                            ''
                            } */}
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
                            {/* {orders ? 
                            orders.map((o, i) => ( */}
                            {/* <tr key={o._id} scope="row"> */}
                            <tr scope="row">
                                <td data-label="N">1</td>
                                <td data-label="Product">Product</td>
                                <td data-label="Stock">Product</td>
                            </tr>
                            {/* ))
                            :
                            ''
                            } */}
                        </tbody>
                    </table>
                </div>

        </section>
    )    
}