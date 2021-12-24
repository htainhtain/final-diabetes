import React from 'react'
import "././Main.css";
import { useTranslation } from 'react-i18next';

function AboutPage() {
    const { t } = useTranslation();

    return (
        <div className="background">
            <div className="container home-block">
                <div className="home-card">
                    <div className="text-title">{t('Who.1')}</div>
                    <br/>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <img
                                src="/rapin.jpg"
                                style={{ width: "100%", maxWidth: "200px", maxHeight: '200px' }}
                                alt="home page"
                            />
                            <p style={{margin: '10px', paddingLeft: '50px'}}>Aj. Rapin</p>
                        </div>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <img
                                src="/lunchakorn.jpg"
                                style={{ width: "100%", maxWidth: "200px", maxHeight: '180px' }}
                                alt="home page"
                            />
                            <p style={{margin: '10px', paddingLeft: '30px'}}>Aj. Lunchakorn</p>
                        </div>
                    </div>
                    <br/>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <img
                                src="/chairat.jpg"
                                style={{ width: "100%", maxWidth: "200px", maxHeight: '200px', paddingLeft: '15px'}}
                                alt="home page"
                            />
                            <p style={{margin: '10px', paddingLeft: '60px'}}>Aj. Chairat</p>
                        </div>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <img
                                src="/most.jpg"
                                style={{ width: "100%", maxWidth: "180px", maxHeight: '200px', paddingLeft: '14px' }}
                                alt="home page"
                            />
                            <p style={{margin: '10px', paddingLeft: '28px'}}>Dr. Manus pengnoo</p>
                        </div>
                    </div>
                    <br/>
                    <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <img
                                src="/htain.jpg"
                                style={{ width: "100%", maxWidth: "190px", maxHeight: '200px', paddingLeft: '24px'}}
                                alt="home page"
                            />
                            <p style={{margin: '10px', paddingLeft: '33px'}}>Htain Lynn Aung</p>
                        </div>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <img
                                src="/pruk.jpg"
                                style={{ width: "100%", maxWidth: "200px", maxHeight: '200px',paddingRight: '50px' }}
                                alt="home page"
                            />
                            <p style={{margin: '10px', paddingLeft: '20px'}}>Pruk Sasithong</p>
                        </div>
                    </div>
                    <br />
                    <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <img
                                src="/bryan.jpg"
                                style={{ width: "100%", maxWidth: "190px", maxHeight: '200px', paddingLeft: '35px'}}
                                alt="home page"
                            />
                            <p style={{margin: '10px', paddingLeft: '80px'}}>Bryan</p>
                        </div>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <img
                                src="/noneh.jpg"
                                style={{ width: "100%", maxWidth: "200px", maxHeight: '200px',paddingRight: '10px' }}
                                alt="home page"
                            />
                            <p style={{margin: '10px', paddingLeft: '50px'}}>Noneh</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

  export default AboutPage