import React, { useState } from 'react'
import "./Main.css";
import { TextField } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';

function GlucoseConverterPage() {
    const [bloodsugarMgdl, setBloodsugarMgdl] = useState(0)
    const [bloodsugarMmoll, setBloodsugarMmoll] = useState(0)

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
                        <div className="text-title">Convert Glucose (mg/dl) to Glucose(mmol/L)</div>
                        <form>
                                <TextField
                                    label= 'Glucose (mg/dl)' //sugar level ใส่ระดับน้ำตาลในเลือดของคุณ
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
                                    label= 'Glucose (mmol/L)' //sugar level ใส่ระดับน้ำตาลในเลือดของคุณ
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