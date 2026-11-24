import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';

const ComicsList = () => {

    const [comicList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics, getComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(newComicsList => onComicsListLoaded(newComicsList, initial))
    }

    const onComicsListLoaded = (newComicsList, initial) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicList => initial ? newComicsList : [...comicList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => initial ? newComicsList.length : offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr) {
        const items = arr.map((item) => {
            return (
                <li
                    className="comics__item"
                    key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img className="comics__item-img" src={item.thumbnail} alt={item.title} />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
        // <div className="comics__list">
        //     <ul className="comics__grid">
        //         <li className="comics__item">
        //             <a href="#">
        //                 <img src={uw} alt="ultimate war" className="comics__item-img"/>
        //                 <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
        //                 <div className="comics__item-price">9.99$</div>
        //             </a>
        //         </li>
        //         <li className="comics__item">
        //             <a href="#">
        //                 <img src={xMen} alt="x-men" className="comics__item-img"/>
        //                 <div className="comics__item-name">X-Men: Days of Future Past</div>
        //                 <div className="comics__item-price">NOT AVAILABLE</div>
        //             </a>
        //         </li>
        //         <li className="comics__item">
        //             <a href="#">
        //                 <img src={uw} alt="ultimate war" className="comics__item-img"/>
        //                 <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
        //                 <div className="comics__item-price">9.99$</div>
        //             </a>
        //         </li>
        //         <li className="comics__item">
        //             <a href="#">
        //                 <img src={xMen} alt="x-men" className="comics__item-img"/>
        //                 <div className="comics__item-name">X-Men: Days of Future Past</div>
        //                 <div className="comics__item-price">NOT AVAILABLE</div>
        //             </a>
        //         </li>
        //         <li className="comics__item">
        //             <a href="#">
        //                 <img src={uw} alt="ultimate war" className="comics__item-img"/>
        //                 <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
        //                 <div className="comics__item-price">9.99$</div>
        //             </a>
        //         </li>
        //         <li className="comics__item">
        //             <a href="#">
        //                 <img src={xMen} alt="x-men" className="comics__item-img"/>
        //                 <div className="comics__item-name">X-Men: Days of Future Past</div>
        //                 <div className="comics__item-price">NOT AVAILABLE</div>
        //             </a>
        //         </li>
        //         <li className="comics__item">
        //             <a href="#">
        //                 <img src={uw} alt="ultimate war" className="comics__item-img"/>
        //                 <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
        //                 <div className="comics__item-price">9.99$</div>
        //             </a>
        //         </li>
        //         <li className="comics__item">
        //             <a href="#">
        //                 <img src={xMen} alt="x-men" className="comics__item-img"/>
        //                 <div className="comics__item-name">X-Men: Days of Future Past</div>
        //                 <div className="comics__item-price">NOT AVAILABLE</div>
        //             </a>
        //         </li>
        //     </ul>
        //     <button className="button button__main button__long">
        //         <div className="inner">load more</div>
        //     </button>
        // </div>
    )
}

export default ComicsList;