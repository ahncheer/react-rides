import './App.css';

import { useState, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//import Modal from 'react-modal';
import AgreementModal from './components/AgreementModal';

import Main from './components/Main';
import Info from './components/Info';
import MapShortCut from './components/MapShortCut';
import Support from './components/Support';


/* ---- Header ---- */
function Header(props) {
  const lis = [];
  for(let i = 0; i < props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li id={t.value} key={t.value} onClick={event=>{
      event.preventDefault();
      props.onChangeMode(event.target.id);
    }}>{t.label}</li>);
  }
  return <header>
    <ul>{lis}</ul>
  </header>
}

/* ---- Footer ---- */
//npm install react-modal
//https://velog.io/@seungsang00/React-React-Modal
function Footer() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);

  const modalContent = [
    {title : '[개인정보처리방침]', content : '이용자가 회사의 서비스를 이용함과 동시에 온라인상에서 회사에 제공한 개인정보가 보호 받을 수 있도록 최선을 다하고 있습니다.'},
    {title : '[이용약관]', content : '인터넷 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 웹사이트와 이용자의 권리·의무 및 책임사항, 서비스 이용 조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.'},
    {title : '[공지사항]', content : '이용하는 귀하의 개인정보를 아래와 같이 수집·이용합니다. 상세 내용은 “개인정보 처리방침”에서 확인하실 수 있습니다.'},
  ];
  const childModalClose = e =>{
    setModalIsOpen(false);
  };
  return <footer className='footer-wrap'>
      <div className='f-top'>
        <p onClick={ e =>{ setModalIsOpen(true); setModalIdx(0); }}>개인정보처리방침</p>
        <p onClick={ e =>{ setModalIsOpen(true); setModalIdx(1); }}>이용약관</p>
        <p onClick={ e =>{ setModalIsOpen(true); setModalIdx(2); }}>공지사항</p>
      </div>
      <div className='f-con'>
        <p>Address. Gangnam-gu, Seoul</p>
        <p>Tel. 02-0000-1111 (2222)</p><p>Fax. 02-0000-0000</p>
        <p>COPYRIGHT (C) 2023 AHNCHEER ALL RIGHTS RESERVED.</p>
      </div>

      <AgreementModal 
          isOpen={modalIsOpen} 
          data={modalContent[modalIdx]}  
          closeModal={childModalClose}></AgreementModal>
  </footer>
}


/* ==== App ==== */
function App() {
  //gnbList
  const gnbList = [
    {label : 'Main', value : '/react-rides'}, 
    {label : 'Info', value : '/react-rides/info'}, 
    {label : 'MapShortcut', value : '/react-rides/map'},
    {label : 'Support', value : '/react-rides/support'}
  ];
  const movePage = useNavigate();

  return (
    <div className="AppWrapper">
      <Header topics={gnbList} onChangeMode={(value)=>{
        movePage(value);
      }}></Header>

      <div className='MainContent'>
        <Routes>
          <Route path='/react-rides' element={<Main />} />
          <Route path='/react-rides/info' element={<Info />} />
          <Route path='/react-rides/map' element={<MapShortCut />} />
          <Route path='/react-rides/support' element={<Support />} />
        </Routes>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
