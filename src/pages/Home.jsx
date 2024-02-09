import React from "react";
import qs from 'qs';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/pizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import axios from "axios";

const Home = () => {
   
    const {categoryId, sort, currentPage} = useSelector((state) => state.filter)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    
    const onChangePage = number => dispatch(setCurrentPage(number))
    
    React.useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            
            // const sort = list.find(obj => obj.sortProperty === params.sortProperty)

            // dispatch(
            //     setFilters({
            //         params,
            //         sort,
            //     })
            // )
        }
    }, [])
    
    React.useEffect(() => {
        setIsLoading(true);
        const sortBy = sort.sortProperty.replace('-',   '');
        // из свойства удалить минус и добавляет свойство в переменную без минуса. Свойство в объекте не меняет
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        
        axios.get(`https://653bd07fd5d6790f5ec77cbc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        ).then((res) => {
            setItems(res.data);
            setIsLoading(false)
        })
        window.scrollTo(0, 0); // что бы при попадании на страницу, scroll был сверху, а не снизу
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);
    
    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        });
        navigate(`?${queryString}`)
        
    }, [categoryId, sort.sortProperty, searchValue, currentPage])
    
    // constent
    let content = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
    if (isLoading) {
        content = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    }
    
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory = {onChangeCategory}/>
                {/*в данном случае мы используем onClickCategory и в качестве второго параметра закладываем стрелочную функцию которая
                возвращает id элементов категорий в данном случае это i см categories*/}
                <Sort />
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
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home;