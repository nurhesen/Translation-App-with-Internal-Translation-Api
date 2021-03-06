import React, { Component, useEffect, useState } from "react";
import { TranslateAz, TranslateTr } from "./Functions";


export default function MainPage(props) {
  const [text, setText] = useState('')
  const [textArr, setTextArr] = useState([])
  const [mact, setMact] = useState({ 'display': 'none' })
  const [wordTr, setWordTr] = useState({ 'word': '', 'translation': '' })
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
    let a =e.target.textContent.replace(/[#_,.@#!$%^&*)(]/g,'');
    

    setWordTr({ 'word': a[0].toUpperCase()+a.substr(1, a.length), 'translation': '' })
    setMact({ 'display': 'block' })
    
    DetermLang(a.toLowerCase()).then((response) => {
      if (response) {
        response.word=response.word[0].toUpperCase()+response.word.substr(1, response.word.length)
        setWordTr(response)
      } else {


        setWordTr({ 'word': a[0].toUpperCase()+a.substr(1, a.length), 'translation': 'Nəticə tapılmadı' })
      
      
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
      window.scrollTo(0,document.body.scrollHeight);

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
      
      <div className="flex mv2p-mh5p">
        <select onChange={langChange} value={lang}>
        <option value="az">Azərbaycanca</option>
        <option value="tr">Türkcə</option>

        </select>
        </div>


      <textarea value={text} onChange={textChange}className="mv1p-mh5p" />
      <div className="b-w mv2p-mh5p">
        {textArr.map((w, ind) => {
          if (w === '<br/>') {
            return <br key={ind} />
          }
          return <span key={ind} className="c-p ml5 spt" onMouseDown={TranslateTrCore} >{w}</span>
        })}
      </div>
        <form className="mt10 mb10 mv2p-mh5p" onSubmit={submitHandle}>
        <input onChange={trChange} value={directTr}/>
        <button className="c-p">Tərcümə et</button>
        </form>

        <div className="mv2p-mh5p">{directTrRes}</div>
      <div id="myModal" className="modal" style={mact}>

        <div className="modal-content">
          <span className="close">&times;</span>
          <p>{wordTr.word + ': ' + wordTr.translation}</p>
        </div>

      </div>


    </div>
  );



}