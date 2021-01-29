import React from 'react'
import { useSelector } from 'react-redux'
import { AboutEng } from './AboutEng'
import { AboutRu } from './AboutRu'

const About = () => {

  const language = useSelector((state) => state.langR)

  return (
    <div>
      { (language === 'en' ? <AboutEng /> : <AboutRu />)}
    </div >
  )
};

export default About
