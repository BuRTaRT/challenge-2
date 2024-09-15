import React from 'react';
import s from'./PromoText.module.css'
const PromoText = () => {
    return (
        <section className={s['promo-text']}>
            <h2>Онлайн Суши Ресторная Японя Кухня</h2>
            <p>Японя Кухня - это отличный ресторан, в котором любимые суши и сашими, роллы и другие
            блюда японской национальной кухни
            </p>
            <p>Быстрая работа и качественная продукция</p>
        </section>
    );
};

export default PromoText;