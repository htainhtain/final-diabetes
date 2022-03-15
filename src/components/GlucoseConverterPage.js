import React, { useState } from 'react'
import "./Main.css";
import { TextField } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function GlucoseConverterPage() {
    const [bloodsugarMgdl, setBloodsugarMgdl] = useState(0)
    const [bloodsugarMmoll, setBloodsugarMmoll] = useState(0)
    const { t } = useTranslation();

    const covertMgdlToMmoll = (bloodsugarMgdl) => {
        setBloodsugarMmoll((bloodsugarMgdl * 0.0555).toFixed(1))
    }

    const covertMmollToMgdl = (Mmoll) => {
        setBloodsugarMgdl((Mmoll * (1/0.0555)).toFixed(3))
    }

    return (
        <>
            <div className='background'>
                <div className='container home-block'>
                    <div className="home-card">
                        <div className="text-title">{t('convert.1')}</div>
                        <form>
                                <TextField
                                    label= {t('mgdl.1')} //sugar level ใส่ระดับน้ำตาลในเลือดของคุณ
                                    type="number" 
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">mg/dL</InputAdornment>
                                        ),
                                    }}
                                    className="textfield"
                                    value={bloodsugarMgdl}
                                    onChange={(e) => {
                                        setBloodsugarMgdl(e.target.value)
                                        covertMgdlToMmoll(e.target.value)
                                }}
                                />
                                <TextField
                                    label= {t('mmoll.1')} //sugar level ใส่ระดับน้ำตาลในเลือดของคุณ
                                    type="number" 
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">mmol/L</InputAdornment>
                                        ),
                                    }}
                                    className="textfield"
                                    value={bloodsugarMmoll}
                                onChange={(e) => {
                                    setBloodsugarMmoll(e.target.value)
                                    covertMmollToMgdl(e.target.value)
                                }}
                                />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GlucoseConverterPage