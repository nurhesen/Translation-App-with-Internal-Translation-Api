import React, { Component, useEffect, useState } from "react";

const TranslateAz = (word) => {
    const url = window.location.protocol+'//'+window.location.host;
    return(fetch(url+`/api/translation_az/${word}/`, {
      method: 'GET',
    }).then((response) => {
      if(response.status===204){
        return false
      }else if(response.ok){
        return response.json()
      }else{
        return false
      }
        }))
}

const TranslateTr = (word) => {
    const url = window.location.protocol+'//'+window.location.host;
    return(fetch(url+`/api/translation_tr/${word}/`, {
      method: 'GET',
    }).then((response) => {
        if(response.status===204){
          return false
        }else if(response.ok){
          return response.json()
        }else{
          return false
        }
        }))
}
export {
    TranslateAz,
    TranslateTr
}