import { useState, useRef } from 'react';
import React from 'react' ;
import { Route, Routes, useNavigate } from 'react-router-dom';

import './Main.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation,  Autoplay} from 'swiper';

import { ReactComponent as LeftArrow } from '../icon/leftArrow.svg';
import { ReactComponent as RightArrow } from '../icon/rightArrow.svg';

const MainBanner = () =>{
    const [fruitList, setFruitList] = useState([
        {value : 'one', title : '1. What is Lorem Ipsum?', content : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {value : 'two', title : '2. Why do we use it?', content : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
        {value : 'three', title : '3. Where does it come from?', content : 'Contrary to popular belief, Lorem Ipsum is not simply random text'}
    ]);

    //npm install swiper@latest
    const [swiper, setSwiper] = useState(null);
    const navPrev = useRef(null);
    const navNext = useRef(null);

    SwiperCore.use([Navigation, Autoplay]);
    const param = {
        navigation: {
            prevEl: navPrev.current,
            nextEl: navNext.current,
        },
        onSwiper : setSwiper,
    }
    // autoplay : {delay: 5000},

    return <div className="BannerWrapper">
                <Swiper {...param} ref={setSwiper}>
                    {fruitList.map((item, idx) => {
                        return (
                            <SwiperSlide>
                                <div class="c-slide">
                                    <p>{item.title}</p>
                                    <p>{item.content}</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div ref={navPrev} className="btn prev">prev</div>
                <div ref={navNext} className="btn next">next</div>
        </div>

}

function MainPrd() {
    const mainPrdList= [
        {value : '1', label : '제품001'},
        {value : '2', label : '제품002'},
        {value : '3', label : '제품003'},
        {value : '4', label : '제품004'},
        {value : '5', label : '제품005'},
        {value : '6', label : '제품006'},
        {value : '7', label : '제품007'},
        {value : '8', label : '제품008'}
    ];

    const [swiper, setSwiper] = useState(null);
    SwiperCore.use([Navigation]);
    const navPrev = useRef(null);
    const navNext = useRef(null);
    const strokeColor = "#454789";

    const param = {
        onSwiper : setSwiper,
        slidesPerView : 4, //한 페이지에 몇 개 보여줄 것인지
        slidesPerGroup : 4, //한번에 몇개씩 넘길지
        spaceBetween : 50, //contents 사이 간격
        navigation: {
            prevEl: navPrev.current,
            nextEl: navNext.current,
        },
    }

    return<div className="MainPrdWrapper">
        <Swiper {...param} ref={setSwiper}>
            {mainPrdList.map((item, idx) => {
                return (
                    <SwiperSlide>
                        <div className='con'>
                            <p>{item.label}</p>
                        </div>
                    </SwiperSlide>
                );
            })}
            </Swiper>
            <div ref={navPrev} className="btn prev"><LeftArrow stroke={strokeColor} /></div>
            <div ref={navNext} className="btn next"><RightArrow stroke={strokeColor} /></div>
        </div>
        
}

function MapShortCut() {
    const movePage = useNavigate();

    return (
        <div className='short-cut'>
            <div className='con layout'>
                <p>이미지 영역</p>
                <button onClick={event=>{
                    event.preventDefault();
                    movePage('/react-rides/map');
                }}>바로가기 →</button>
            </div>
        </div>
    )
}

// ==== Main ====
function Main(){
    return    <div className='wrapper'>
        <MainBanner></MainBanner>
        <MainPrd></MainPrd>
        <MapShortCut></MapShortCut>
    </div>
}
export default Main;
