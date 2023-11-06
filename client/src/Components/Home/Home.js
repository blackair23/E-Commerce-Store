// import { getDocs } from 'firebase/firestore';
// import { COLLECTION } from '../../config/collection';
// import { Products } from '../Products/Products';
// import style from './Home.module.css';
// import { useEffect, useState } from 'react';
// import swal from 'sweetalert';

// export const Home = () => {
//     const [products, setProducts] = useState(null);
//     useEffect(() => {
//         const getProducts = async () => {
//             try {
//                 const data = await getDocs(COLLECTION);
//                 const filterdData = data.docs.map((doc) => ({...doc.data(), _id: doc.id}))
//                 setProducts(filterdData);
//             } catch (err) {
//                 swal(err.message, {
//                     icon: "error",
//                 });               
//             }
//         }
//         getProducts();
//     }, [])

//     return (
//         <section id={style.home}>
//             <h2>All products</h2>
//             {products ? 
//             <Products products={products}></Products>
//             : "No items"}
//         </section>
//     )
// }

// import { getDocs } from 'firebase/firestore';
// import { COLLECTION } from '../../config/collection';
// import { Products } from '../Products/Products';
// import style from './Home.module.css';
// import { useEffect, useState } from 'react';
// import swal from 'sweetalert';

// export const Home = () => {
//     const [products, setProducts] = useState(null);
//     const [priceFilter, setPriceFilter] = useState(""); // Initialize the price filter

//     useEffect(() => {
//         const getProducts = async () => {
//             try {
//                 const data = await getDocs(COLLECTION);
//                 const filteredData = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));

//                 if (priceFilter) {
//                     // Filter products based on the price range
//                     const filteredProducts = filteredData.filter((product) => {
//                         return product.price >= priceFilter.min && product.price <= priceFilter.max;
//                     });
//                     setProducts(filteredProducts);
//                 } else {
//                     setProducts(filteredData);
//                 }
//             } catch (err) {
//                 swal(err.message, {
//                     icon: "error",
//                 });
//             }
//         };

//         getProducts();
//     }, [priceFilter]);

//     // Define the price range categories
//     const priceRanges = [
//         { label: "5400-10800 EUR", min: 5400, max: 10800 },
//         { label: "10800-16200 EUR", min: 10800, max: 16200 },
//         { label: "16200-21600 EUR", min: 16200, max: 21600 },
//         { label: "21600-32400 EUR", min: 21600, max: 32400 },
//         { label: "32400-43200 EUR", min: 32400, max: 43200 },
//         { label: "43200-48600 EUR", min: 43200, max: 48600 },
//         { label: "Over 48600 EUR", min: 48600, max: Infinity },
//     ];

//     const handlePriceFilter = (min, max) => {
//         setPriceFilter({ min, max });
//     };

//     return (
//         <section id={style.home}>
//             <h2>All products</h2>

//             {/* Filter buttons for price categories */}
//             <div>
//                 {priceRanges.map((range) => (
//                     <button
//                         key={range.label}
//                         onClick={() => handlePriceFilter(range.min, range.max)}
//                     >
//                         {range.label}
//                     </button>
//                 ))}
//                 <button onClick={() => setPriceFilter("")}>Clear Filter</button>
//             </div>

//             {products ? (
//                 <Products products={products}></Products>
//             ) : (
//                 "No items"
//             )}
//         </section>
//     );
// };


import { getDocs } from 'firebase/firestore';
import { COLLECTION } from '../../config/collection';
import { Products } from '../Products/Products';
import style from './Home.module.css';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export const Home = () => {
    const [products, setProducts] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(""); // Initialize the category filter
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getDocs(COLLECTION);
                const filteredData = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));

                if (categoryFilter) {
                    // Filter products based on the category field
                        const filteredProducts = filteredData.filter((product) => {
                        return categoryFilter.includes(product.category)
                    });
                    setProducts(filteredProducts);
                } else {
                    setProducts(filteredData);
                }
            } catch (err) {
                swal(err.message, {
                    icon: "error",
                });
            }
        };

        getProducts();
    }, [categoryFilter]);

    // Define the price range categories
    const categoryRanges = [
        "5400 - 10800",
        "10800 - 16200",
        "16200 - 21600",
        "21600 - 32400",
        "32400 - 43200",
        "43200 - 48600",
        "over 48600",
    ];

    const handleCategoryFilter = (category) => {
        setCategoryFilter(category);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // const closeMenu = () => {
    //     setIsMenuOpen(false);
    // };


    return (
        <section id={style.home}>
            <h2>All products</h2>

            {/* Filter buttons for price categories */}

            {/* <div className={style.filterContainer}>
                {categoryRanges.map((category) => (
                    <button
                        key={category}
                        className={style.filterButton}
                        onClick={() => handleCategoryFilter(category)}
                    >
                        {category}
                    </button>
                ))}
                <button
                className={style.clearFilterButton} 
                onClick={() => setCategoryFilter("")}>Clear Filter</button>
            </div> */}
            <div className={style.filterContainer}>
                <div className={style.filterMenu}>
                    <button className={style.menuToggle} onClick={toggleMenu}>
                        Filter
                    </button>
                    <div className={isMenuOpen ? style.menuContentOpen : style.menuContentClosed}>
                        {categoryRanges.map((category) => (
                            <button
                                key={category}
                                className={style.filterButton}
                                onClick={() => handleCategoryFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                <button className={style.clearFilterButton} onClick={() => setCategoryFilter("")}>
                    Clear Filter
                </button>
            </div>

            {products ? (
                <Products products={products}></Products>
            ) : (
                "No items"
            )}
        </section>
    );
};