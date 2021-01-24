import React from "react";
import { useTranslation } from 'react-i18next'


const About = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2>Who am I ?</h2>
      <p>
        {t('who_am_i')}
      </p>
    </div>
  )
};

export default About
