import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Index from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";


const Home = () => {
    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating'
    });
    React.useEffect(() => {
        setIsLoading(true);
        const sortBy = sortType.sortProperty.replace('-',   '');
        // из свойства удалить минус и добавляет свойство в переменную без минуса. Свойство в объекте не меняет
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        
        fetch(`https://653bd07fd5d6790f5ec77cbc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false)
            })
            window.scrollTo(0, 0); // что бы при попадании на страницу, scroll был сверху, а не снизу
    }, [categoryId, sortType, searchValue, currentPage])
    // deps (зависимости, в данном случае categoryId) - это массив значений, которые указывают на то, от каких переменных или состояний зависит эффект.
    // Если эти значения изменятся, то эффект будет вызван заново.
    
    
    // constent
    let content = items.map((obj) => <Index key={obj.id} {...obj}/>);
    if (isLoading) {
        content = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    }
    
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory = {(i) => setCategoryId(i)}/>
                {/*в данном случае мы используем onClickCategory и в качестве второго параметра закладываем стрелочную функцию которая
                возвращает id элементов категорий в данном случае это i см categories*/}
                <Sort value={sortType} onChangeSort = {(i) => setSortType(i)}/>
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
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </div>
    )
}

export default Home;