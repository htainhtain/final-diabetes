import "./frontpage.css";
import "./Main.css"
import React, { useState, useEffect } from "react";
import BackgroundSlider from 'react-background-slider'
// import { LanguageApi } from '../App.js';
import { useTranslation } from 'react-i18next';

const images = [
  '/frontpageimage/health_home.jpg',
  '/frontpageimage/diabetes.jpg',
  '/frontpageimage/food.jpg',
  '/frontpageimage/gym.jpg',
  '/frontpageimage/meditate.jpg',
  '/frontpageimage/smoothie.jpg',
  '/frontpageimage/smoothies.jpg',
  '/frontpageimage/sugar.jpg',
]

function FrontPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayTime = 3000;
  // const Lang = React.useContext(LanguageApi)
  const { t } = useTranslation();

  function nextSlide(slideIndex = currentSlide + 1) {
    const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;

    setCurrentSlide(newSlideIndex);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, autoPlayTime);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <>
      <div className='hero-container'>
        <BackgroundSlider
            images={[images[0], images[1], images[2], images[3], images[4], images[5], images[6], images[7]]}
            duration={10} transition={2}
          />
        <h1 className='centered'>Diabetes management platform, Continuous glucose monitoring, Exercise strategy and planning for glycemic control</h1>
        <h1 className='centered2'>แพลตฟอร์มการจัดการโรคเบาหวาน การตรวจระดับน้ำตาลอย่างต่อเนื่อง กลยุทธและแผนการออกกำลังกายเพื่อควบคุมระดับน้ำตาล</h1>
      </div>
    <div className='background'>
      <br />
        <h2 style={{ textAlign: "center" }}>{t('objectives.1')}</h2>
        <br />
        <div className="para">
          <p >&emsp; โรคเบาหวานเป็นโรคไม่ติดต่อเรื้อรังที่เป็นปัญหาสำคัญทางด้านสาธารณสุขของโลกรวมทั้งประเทศไทย และแนวโน้มผู้ป่วยเพิ่มขึ้นมาโดยตลอด จากการสำรวจสภาวะสุขภาพคนไทยพบว่าทั่วประเทศคนไทยกว่า 3 ล้านคนกำลังเผชิญกับโรคเบาหวาน โดยพบว่าผู้ที่เป็นเบาหวานร้อยละ 56.6 ยังไม่รู้ตัวว่าตนเองเป็นโรคดังกล่าว และยังไม่เคยรับการตรวจรักษาเลย จนบางท่านกว่าจะทราบได้ ก็อาจเกิดภาวะโรคแทรกซ้อนขึ้นมาแล้ว  องค์การอนามัยโรคคาดการณ์ว่าจะมีผู้ป่วยเสียชีวิตจากโรคดังกล่าวเพิ่มมากขึ้นกว่าร้อยละ 20 ในอีก 10 ปีข้างหน้า หากขาดการวางแผนควบคุมโรคที่เหมาะสม</p>
          <p >&emsp;   โครงการวิจัยนี้ เป็นการศึกษาและพัฒนารูปแบบการรักษาผู้ป่วยด้วยเทคโนโลยีการตรวจวัดระดับน้ำตาลในเลือดแบบ Continuous Glucose Monitoring เป็นหลัก พัฒนาระบบการเก็บข้อมูลผู้ป่วยเพื่อดูแนวโน้มและประสิทธิภาพการรักษาของแพทย์ พัฒนาระบบการส่งผ่านข้อมูลแบบ Real Time ทาง Mobile Application และพัฒนาระบบการให้คำปรึกษาและวางกลยุทธและแผนการออกกำลังกายเพื่อควบคุมระดับน้ำตาลของผู้ป่วยเบาหวาน</p>
          <p >&emsp; ทางทีมผู้วิจัยคาดหวังว่าผลการวิจัยนี้จะช่วยผู้ป่วยเบาหวานได้รับการดูแลรักษาอย่างมีประสิทธิผลและทั่วถึง ลดการเกิดภาวะโรคแทรกซ้อนของผู้ป่วย ช่วยให้แพทย์สามารถเข้าถึงข้อมูลได้ครบถ้วน เพิ่มคุณภาพชีวิตของชุมชนได้โดยการใช้เทคโนโลยีเข้ามาผสมผสานกับหน่วยแพทย์ และ/หรือสถานพยาบาล</p>
        </div>
    </div>
    </>
  )}

export default FrontPage;