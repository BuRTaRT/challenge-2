import React, {useEffect, useState} from 'react';
import s from './MealList.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import '../CssUi/loading.css'

// const DUMMY_MEALS = [
//     {
//         id: "m1",
//         name: 'Ролл "Наоми"',
//         description:
//             "Сыр Филадельфия, куриное филе, масаго, помидор, огурец, кунжут",
//         price: 11.99,
//     },
//     {
//         id: "m2",
//         name: "Спайс в лососе",
//         description: "Рис, лосось, соус спайс",
//         price: 3.99,
//     },
//     {
//         id: "m3",
//         name: "Суши с угрем",
//         description: "Угорь копченый, соус унаги, кунжут",
//         price: 4.99,
//     },
//     {
//         id: "m4",
//         name: 'Салат "Поке с лососем"',
//         description:
//             "Рис, лосось, огурец, чука, нори, стружка тунца, соус ореховый",
//         price: 7.99,
//     },
// ];

const MealList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState()

    useEffect(() => {
        setIsLoading(false)
        const getProducts = async () => {
            const response = await fetch('https://udemy-react-f6ba3-default-rtdb.europe-west1.firebasedatabase.app/products.json')
            if (!response.ok) {
                throw new Error('Что-то пошло не так')
            }
            const products = await response.json();

            const loadedProducts = []
            for (const [key, value] of Object.entries(products)) {
                loadedProducts.push({id: key, ...value})
            }
            setProducts(loadedProducts)
            setIsLoading(false)
        }
        getProducts().catch(e => {
            setIsLoading(false)
            setFetchError(e.message)
        })
    }, [])


    const mealList = products.map((meal) => {
        return <MealItem price={meal.price} description={meal.description} name={meal.name} key={meal.id} id={meal.id}/>
    })
    let content = mealList;
    if (fetchError) {
        content = fetchError
    }
    if (isLoading) {
        content = <div className="loader"></div>
    }

    return (
        <section className={s.meals}>
            <Card>
                {content}
            </Card>
        </section>
    );
};

export default MealList;