'use client'
import Textlist from './textlist';
import Numberlist from './numberlist';
import Radiolist from './radiolist';
import { useState } from 'react';

export default function Setting() {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [monitorCycle, setMonitorCycle] = useState('');
    const [alrtCycle, setAlrtCycle] = useState('');
    const [reportCycle, setReportCycle] = useState('');
    const [contaStatus, setContaStatus] = useState('no');
    const [contaRate, setContaRate] = useState('no');
    const [report, setReport] = useState('no');

    const handleSave = () => {
        console.log('저장된 사용자명:', username);
        console.log('저장된 아이디:', userId);
        console.log('저장된 이메일:', email);
        console.log('저장된 전화번호:', phone);
        
        console.log('저장된 모니터링 주기:', monitorCycle);
        console.log('저장된 알림 주기:', alrtCycle);
        console.log('저장된 보고 주기:', reportCycle);
        
        console.log('저장된 오염여부 알림:', contaStatus);
        console.log('저장된 오염률 알림:', contaRate);
        console.log('저장된 보고 알림:', report);
        alert(`저장되었습니다`);
    };


    return (
        <div>
            <div className="pt-32"></div>
            <div className="pr-[15vw] pl-[15vw]">

                {/* 사용자 설정 */}
                <div className="p-8 rounded-lg">
                    <div className="ml-3 pb-2 font-bold text-2xl border-b-2">
                        <div className="inline-block ml-3 w-[120px] text-center">사용자 설정</div>
                        <div className="text-xs inline ml-4 text-gray-400 font-medium">계정 관리에 필요한 기본적인 사용자 정보를 입력해주세요.</div>
                    </div>
                    
                    <Textlist titleS='사용자명' valueS={username} placeholderS='사용자명을 입력하세요' onChange={setUsername}></Textlist>
                    <Textlist titleS='아이디' valueS={userId} placeholderS='아이디를 입력하세요' onChange={setUserId}></Textlist>
                    <Textlist titleS='이메일' valueS={email} placeholderS='이메일을 입력하세요' onChange={setEmail}></Textlist>
                    <Textlist titleS='전화번호' valueS={phone} placeholderS='전화번호를 입력하세요' onChange={setPhone}></Textlist>
                </div>

                {/* 기능 설정 */}
                <div className="p-8 rounded-lg">
                    <div className="ml-3 pb-2 font-bold text-2xl border-b-2">
                        <div className="inline-block ml-3 w-[120px] text-center">기능 설정</div>
                        <div className="text-xs inline ml-4 text-gray-400 font-medium">시스템 운용에 필요한 기능 관련 정보를 입력해주세요.</div>
                    </div>
                    
                    <Numberlist titleS='모니터링 주기' valueS={monitorCycle} onChange={setMonitorCycle}></Numberlist>
                    <Numberlist titleS='알림 주기' valueS={alrtCycle} onChange={setAlrtCycle}></Numberlist>
                    <Numberlist titleS='보고 주기' valueS={reportCycle} onChange={setReportCycle}></Numberlist>
                </div>

                {/* 알림 설정 */}
                <div className="p-8 rounded-lg">
                    <div className="ml-3 pb-2 font-bold text-2xl border-b-2">
                        <div className="inline-block ml-3 w-[120px] text-center">알림 설정</div>
                        <div className="text-xs inline ml-4 text-gray-400 font-medium">알림 발송에 필요한 알림 관련 정보를 설정해주세요.</div>
                    </div>
                    
                    <Radiolist titleS='오염여부 알림' valueS={contaStatus} onChange={setContaStatus}></Radiolist>
                    <Radiolist titleS='오염률 알림' valueS={contaRate} onChange={setContaRate}></Radiolist>
                    <Radiolist titleS='보고 알림' valueS={report}  onChange={setReport}></Radiolist>
                </div>
                <div className="flex justify-center mt-8">
                    <button 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 right p-2 pl-4 pr-4 text-white text-lg font-bold rounded-md"
                    onClick={handleSave}>저장</button>
                </div>
                
            </div>
        </div>
        
    )
}