import React from "react";

function Categories({value, onChangeCategory }) {
    {/*сюда мы передали value={categoryId}, onClickCategory = {(i) => setCategoryId(i) в качестве пропсов*/}
    const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
    
    return (
        <div className="categories">
            <ul >{categories.map((categoryName, index) =>
                <li key={index}
                    onClick={() => onChangeCategory(index)}
                    /*При клике срабатывает функция onClickCategory(index) куда передается index и затем при вызове стрелочной
                     функции в home в качестве i будет index. В данном случае не важно что передавать. Можно например вместо index
                      написать 1 2 3 4. А в home в стрелочной функции написать (a b c d) => console.log(a, b, c, d).
                      И в конечном итоге в консоль выведется 1 2 3 4*/
                    className={value === index ? 'active': ''}>
                    {categoryName}
                </li>
            )}
            </ul>
        </div>
    )
}

export default Categories;