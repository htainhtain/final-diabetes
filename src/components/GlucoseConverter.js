import React, { useContext } from 'react'
import { AuthApi } from '../App'
import ProtectedHeaderBar from './ProtectedHeaderBar'
import GlucoseConverterPage from './GlucoseConverterPage'

function GlucoseConverter() {

    const Auth = useContext(AuthApi)

    return (
        <div>
            <ProtectedHeaderBar 
                auth={Auth.auth}
            />
            <GlucoseConverterPage />
        </div>
    )
}

export default GlucoseConverter