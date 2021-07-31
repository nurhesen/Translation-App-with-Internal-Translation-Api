import React, { Component, useEffect, useState } from "react";
import { TranslateAz, TranslateTr } from "./Functions";


export default function MainPage(props) {
  const [text, setText] = useState('')
  const [textArr, setTextArr] = useState([])
  const [mact, setMact] = useState({ 'display': 'none' })
  const [wordTr, setWordTr] = useState({ 'word': null, 'translation': null })
const [lang, setLang]=useState('tr')

const [directTr, setDirectTr]=useState('')
const [directTrRes, setDirectTrRes]=useState('')

const DetermLang=(e)=>{
  if(lang==='tr'){
    return TranslateTr(e)
  }else if(lang==='az'){
    return TranslateAz(e)
  }
}

  const TranslateTrCore = (e) => {
    setMact({ 'display': 'block' })
    
    DetermLang(e.target.textContent.toLowerCase().replace(/[#_,.@#!$%^&*)(]/g,'')).then((response) => {
      if (response) {
        setWordTr(response)
      } else {


        setWordTr({ 'word': e.target.textContent, 'translation': 'Nəticə tapılmadı' })
      
      
      }
    })

  }
  useEffect(() => {

  }, [])
  const textChange = (x) => {
    setText(x.target.value)

  }

  const MouseUp = () => {
    setMact({ 'display': 'none' })
    setWordTr({ 'word': null, 'translation': null })
  }
  useEffect(() => {

    setTextArr(text.replaceAll('\n', ' <br/> ').split(' '))


  }, [text,])
  const submitHandle=(e)=>{
    e.preventDefault()

    console.log(directTr)
    DetermLang(directTr).then((res)=>{
      setDirectTrRes(res.translation)
    })
  }
  const langChange=(e)=>{
    console.log(e.target.value)
    setLang(e.target.value)
  }
  const trChange=(e)=>{
    setDirectTr(e.target.value)
  }
  return (
    <div onMouseUp={MouseUp}>
      <div className="flex">
        <select onChange={langChange} value={lang}>
        <option value="az">Azərbaycanca</option>
        <option value="tr">Türkcə</option>

        </select>
        </div>


      <textarea value={text} onChange={textChange} />
      <div className="b-w">
        {textArr.map((w, ind) => {
          if (w === '<br/>') {
            return <br key={ind} />
          }
          return <span key={ind} className="c-p ml5" onMouseDown={TranslateTrCore} >{w}</span>
        })}
      </div>
        <form className="mt10 mb10" onSubmit={submitHandle}>
        <input onChange={trChange} value={directTr}/>
        <button className="c-p">translate</button>
        </form>

        <div>{directTrRes}</div>
      <div id="myModal" className="modal" style={mact}>

        <div className="modal-content">
          <span className="close">&times;</span>
          <p>{wordTr.word + ': ' + wordTr.translation}</p>
        </div>

      </div>


    </div>
  );



}