import gsap from 'gsap';
import pageTitleNav from '../components/page-title-nav.js';
import { useState } from '../modules/helpers/useState.js';
import getNews from '../modules/news/getNews.js';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const [ state, setState, useStateEffect ] = useState({
    pending: false,
    data: [],

});

useStateEffect((state) => {
    if (state.pending) {
        document.querySelector('[data-more-news]').classList.add('pending');
        document.querySelector('[data-news-list]').classList.add('pending');
        return;
    }
    document.querySelector('[data-more-news]').classList.remove('pending');
    document.querySelector('[data-news-list]').classList.remove('pending');
    
    document.querySelector('[data-news-list]').innerHTML = state.data.reduce((acc, item) => {
        return acc + `
            <a href="${item.href}" class="news-card">
                <div class="news-card__date">${item.date}</div>
                <div class="news-card__img">
                    <img src="${item.image}" alt="">
                </div>
                <div class="news-card__text">
                    <div class="news-card__title">
                        ${item.text}
                    </div>
                    <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 65L64 5M64 5H4M64 5V65" stroke="#93C7E8" stroke-width="10"/>
                    </svg>
                </div>
            </a>
        `;
    }, '');
})


document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-more-news]');
    if (!target) return;
    getNews(filter)
        .then(res => {
            console.log(res.data);
            setState({
                pending: false,
                data: res.data,
            })
        })
});


const [ filter, setFilter, useFilterEffect ] = useState(null);

document.querySelectorAll('[data-news-filter]').forEach((el) => {
    if (el.classList.contains('active')) {
        setFilter(el.dataset.newsFilter);
    }
});
document.body.addEventListener('click', (evt) => {
    const target = evt.target.closest('[data-news-filter]');
    if (!target) return;
    document.querySelector('[data-news-filter].active').classList.remove('active'); 
    target.classList.add('active');
    setFilter(target.dataset.newsFilter);
});

useFilterEffect((filter) => {
    setState({
        pending: true,
    })
    getNews(filter)
        .then(res => {
            console.log(res.data);
            setState({
                pending: false,
                data: res.data,
            })
        })
})


pageTitleNav(gsap);