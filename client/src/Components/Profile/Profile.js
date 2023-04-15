import style from './Profile.module.css';

export const Profile = () => {
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
            <tr scope="row">
                <td data-label="Num">1</td>
                <td data-label="Date">24/05/23</td>
                <td data-label="Items">20</td>
                <td data-label="Status">Ready</td>
                <td data-label="Details">Info</td>
            </tr>
            <tr scope="row">
                <td data-label="Num">1</td>
                <td data-label="Date">24/05/23</td>
                <td data-label="Items">20</td>
                <td data-label="Status">Ready</td>
                <td data-label="Details">Info</td>
            </tr>
            <tr scope="row">
                <td data-label="Num">1</td>
                <td data-label="Date">24/05/23</td>
                <td data-label="Items">20</td>
                <td data-label="Status">Ready</td>
                <td data-label="Details">Info</td>
            </tr>
            <tr scope="row">
                <td data-label="Num">1</td>
                <td data-label="Date">24/05/23</td>
                <td data-label="Items">20</td>
                <td data-label="Status">Ready</td>
                <td data-label="Details">Info</td>
            </tr>
            <tr scope="row">
                <td data-label="Num">1</td>
                <td data-label="Date">24/05/23</td>
                <td data-label="Items">20</td>
                <td data-label="Status">Ready</td>
                <td data-label="Details">Info</td>
            </tr>

            </tbody>
            </table>
            </div>

        </section>

    )
}