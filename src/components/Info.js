import { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './Info.css';

//npm install react-calendar
// https://velog.io/@blackeichi/React-React-calendar%EB%A1%9C-%EB%8B%AC%EB%A0%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

function Info(){
    const [value, onChange] = useState(new Date());
    const scheduleArr = [
        {'date' : "2023. 04. 10.", 'title' : '치과 예약'},
        {'date' : "2023. 04. 11.", 'title' : '점심 약속'},
        {'date' : "2023. 04. 20.", 'title' : '안과 예약'},
    ];
    // const dateArr = scheduleArr.map(a => a.date);

    return(
        <div className='wrapper'>
            <h3 className="page-title">schedule</h3>
            <div className="calendar-wrap layout">
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    formatDay={(locale, date) =>
                        //xx일 -> xx 으로 format 변경
                        new Date(date).toLocaleDateString("en-us", {
                            day: "2-digit",
                        })
                    }
                    tileContent = {({ date, view }) => {
                        // 각 날짜에 들어갈 content
                        const stringDate = new Date(date).toLocaleDateString("ko", {
                            year: "numeric", month: "2-digit", day: "2-digit",
                        });
                        const exist = scheduleArr.findIndex((x) => x.date === stringDate);
                        const html = exist > -1 ? <p>{scheduleArr[exist].title}</p> : <p></p>;
                        return html
                    }}
                    />
                    <div className='montly-sch'>
                        <h4>이번달 일정</h4>
                        <div className='con'>
                            {scheduleArr.map((item, idx) => {
                            return (
                                <p>{item.date} - {item.title}</p>
                                );
                            })}
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Info;