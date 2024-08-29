import { useState } from 'react';
import './Support.css';

function Support(){
    
    const [userData, setUserData] = useState({
        title : '',
        content : '',
        name : '',
        email : '',
        tel : '',
        agree : false
    });

    const onChangeInput = (e) => {
        // console.log('{[e.target.name] : e.target.value} : ', {[e.target.name] : e.target.value});
        setUserData((userData) => {
            return {...userData, [e.target.name] : e.target.value} ;
        }); 
    };
    const onChangeCheck = (e) => {
        setUserData((userData) => {
            return {...userData, [e.target.name] : e.target.value} ;
        }); 
    };

    return(
        <div className="wrapper">
            <h3 className="page-title">비회원 문의</h3> 

            <div className="form-wrap layout">
                <ul className="req-wrap">
                    <li>
                        <p>제목</p>
                        <div className="con">
                            <input type="text" name="title" defaultValue={userData.title} onChange={onChangeInput} maxLength="80"/> 
                        </div>
                    </li>

                    <li>
                        <p>문의 내용</p>
                        <div className="con">
                            <textarea id="content" name="content" rows="5" cols="33" defaultValue={userData.content} onChange={onChangeInput}>
                        </textarea>
                        </div>
                    </li>

                    <li>
                        <p>이름</p>
                        <div className="con">
                            <input type="text" id="name" name="name" required
                            minLength="2" maxLength="8" defaultValue={userData.name} onChange={onChangeInput}/> 
                        </div>
                    </li>

                    <li>
                        <p>이메일</p>
                        <div className="con">
                            <input type="text" id="email" name="email" defaultValue={userData.email} onChange={onChangeInput}/> 
                        </div>
                    </li>

                    <li>
                        <p>연락처 (선택)</p>
                        <div className="con">
                            <input type="text" id="tel" name="tel" defaultValue={userData.tel} onChange={onChangeInput}/> 
                        </div>
                    </li>

                    <li>
                        <p>개인정보 수집동의</p>
                        <div className="con">
                            <p className='agree-area'>
                                회사가 운영하는 웹사이트를 이용하는 귀하의 개인정보를 아래와 같이 수집·이용합니다. <br />
                                상세 내용은 “개인정보 처리방침”에서 확인하실 수 있습니다.<br /><br />
                                1.    수집하는 개인정보 항목<br />
                                가.  웹사이트 이용을 위해 필요한 정보 : 연락처, 이름<br />
                            </p>
                            <div className='agree-input'>
                                <input type="checkbox" id="checkbox" name="agree" required onChange={onChangeCheck}/>
                                <label>위 내용을 읽고 동의합니다.</label>
                            </div>
                        </div>
                    </li>
                </ul>
                <button className="req-btn" onClick={event => {
                    console.log('> userData : ', userData);

                    let reqMsg = '을 입력해주세요';
                    let alertMessage = [
                        {name : 'title', msg : '제목'+reqMsg},
                        {name : 'content', msg : '문의 내용'+reqMsg},
                        {name : 'name', msg : '이름'+reqMsg},
                        {name : 'email', msg : '이메일'+reqMsg},
                        {name : 'agree', msg : '개인정보 수집에 동의해주세요.'},
                    ];

                    let i = 0;
                    let hasError = 0;
                    while(alertMessage[i]){
                        let x = alertMessage[i];
                        console.log('userData[x.name] : ', userData[x.name]);
                        if(x.name !== 'agree'){
                            if(!userData[x.name]){ alert(x.msg); hasError++; return }
                        }else if(x.name === 'agree'){
                            if(userData[x.name] === false){ alert(x.msg); hasError++;  return }
                        }
                        i++;
                    };
                    console.log('hasError : ', hasError);
                    if(hasError === 0){
                        alert('작성완료!'); 
                    }

                }}>제출</button>
            </div>
        </div>
    )
}
export default Support;