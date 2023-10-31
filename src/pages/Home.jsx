import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Index from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
    
    const [items, setItems] = React.useState([])
    const [isLouding, setIsLouding] = React.useState(true)
    
    React.useEffect(() => {
        fetch('https://653bd07fd5d6790f5ec77cbc.mockapi.io/items')
            .then(res => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLouding(false)
            })
            window.scrollTo(0, 0) // что бы при попадании на страницу, scroll был сверху, а не снизу
    }, [])
    
    // const
    let content = items.map((obj) => <Index key={obj.id} {...obj}/>);
    if (isLouding) {
        content = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    }
    
    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    content
                    
                    // items.map((obj) => isLouding ? <Skeleton/> : (<Index key={obj.id}{...obj}/>)
                    // Если одинаковое название параметров и json элементов можно сократить
                    // title={obj.title}
                    // price={obj.price}
                    // imageUrl={obj.imageUrl}
                    // sizes={obj.sizes}
                    // types={obj.types}
                    // )
                }
            
            
            </div>
        </div>
    )
}

export default Home;