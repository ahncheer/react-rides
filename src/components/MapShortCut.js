import { useState } from 'react';
import './MapShortCut.css';

/* ---- PersonSelect ---- */
function PersonSelect(props) {
    const lis = [];
    for(let i = 0; i < props.list.length; i++){
        let t = props.list[i];
        lis.push(<label key={t.value}>
            <input
                type="radio"
                value={t.value}
                checked={props.num === t.value}
                onChange={event=>{
                    props.onChangeMode(event.target.value);
                }}
            />{t.label}
        </label>);
    }
    return  <div className='person-select' key={props}>{lis}</div>
}

function PersonHeight(props) {
    console.log('---- props.hValue : ', props.hValue);
    const userHeight = {
        one: props.hValue.one,
        two: props.hValue.twoMin,
        three: props.hValue.twoMax
    };
    
    const onChangeInput = (e) => {
            userHeight[e.target.name] = e.target.value;
            
            let x = {
                one: Number(userHeight.one),
                twoMin: Number(userHeight.two),
                twoMax: Number(userHeight.three),
            };
            console.log('x : ', x);
            props.onChangeMode(x);
    }
    
    let content = [];
    if(props.num === 'one'){
        content = (
            <div className='person-height' key={props.num}>
                <p>탑승자의 키 : <input name="one" value={userHeight.one} onChange={onChangeInput}/></p>
            </div>
        )
    }else{
        content= ( <div className='person-height' key={props.num}>
            <p>탑승자의 최소키 : <input name="two" value={userHeight.two} onChange={onChangeInput}/></p>
            <p>탑승자의 최대키 : <input name="three" value={userHeight.three} onChange={onChangeInput}/></p>
        </div>);
    }
    return content
}


function MapShortCut(){
    
    const [totalType, setTotalType] = useState("one");
    const [totalTypeList, setTotalTypeList] = useState([
        {value : 'one', label : '1인'},
        {value : 'other', label : '2인 이상'}
    ]);

    const amuseRides = [
        {name : '회전목마', minHeight: 100, maxHeight : 250},
        {name : '어린이 범퍼카', minHeight: 110, maxHeight : 140},
        {name : '풍선 비행', minHeight: 110, maxHeight : 120},
        {name : '파라오의 분노', minHeight: 110, maxHeight : 195},
        {name : '자이로스핀', minHeight: 130, maxHeight : 250},
        {name : '자이로스윙', minHeight: 130, maxHeight : 190},
        {name : '번지드롭', minHeight: 130, maxHeight : 200},
        {name : '범퍼카', minHeight: 140, maxHeight : 250},
        {name : '아틀란티스', minHeight: 135, maxHeight : 190}
    ];
    
    const [userRides, setUserRides] = useState([]);
    const userRideList = (value) => {
        let newList = [];
        if(totalType === 'one'){
            newList = amuseRides.filter(el => (el.minHeight <= value.one && value.one <= el.maxHeight) );
        }else{
            const lessNum  = value.twoMax < value.twoMin ? value.twoMax : value.twoMin;
            const moreNum  = value.twoMax < value.twoMin ? value.twoMin : value.twoMax;
            console.log('lessNum : ', lessNum, ', moreNum : ', moreNum);
            newList = amuseRides.filter(el => (el.minHeight <= lessNum && moreNum <= el.maxHeight) );
        }
        console.log('▶ newList : ', newList);
        setUserRides(newList);
    }
    
    let [heightValue, setHeightValue] = useState({
        one : 0,
        twoMin : 0,
        twoMax : 0
    });

    const rideContent = [];
    if(userRides.length === 0){
        rideContent.push(<div className='no-res'><p>키를 입력해주세요.</p></div>);
    }else{
        userRides.map((item, idx) => {
            rideContent.push(
                <div className='ride-wrap'>
                    <p>{item.minHeight} - {item.maxHeight}</p>
                    <p>{item.name}</p>
                </div>);
        });
    }
    
    return(
        <div className="wrapper">
            <h3 className="page-title">탑승가능 놀이기구</h3> 

            <div className="form-wrap layout">
                <div className='filter-wrap'>
                    <dl>
                        <dt>인원수</dt>
                        <dd><PersonSelect list={totalTypeList} num={totalType} onChangeMode={(value)=>{
                            console.log('onChangeMode > value : ', value);
                            setTotalType(value);
                            setHeightValue({ one : 0, twoMin : 0, twoMax : 0 });
                        }}></PersonSelect></dd>
                    </dl>
                    <dl>
                        <dt>키</dt>
                        <dd>
                            <PersonHeight num={totalType} hValue={heightValue} onChangeMode={(value)=>{
                                console.log('PersonHeight > value : ', value);
                                setHeightValue(value);
                            }}></PersonHeight>
                        </dd>
                    </dl>
                    <dl className='search-area'>
                        <dd>
                        <button onClick={ e =>{ 
                                userRideList(heightValue);
                            }}>검색</button>
                        </dd>
                    </dl>
                </div>

                <div className='ride-result-wrap'>
                    {userRides.length > 0 ? <p className='total-num'>총 {userRides.length}개</p> : ''} 
                <div className='ride-result'>{rideContent}</div>
                </div>
            </div>
        </div>

    )
}
export default MapShortCut;