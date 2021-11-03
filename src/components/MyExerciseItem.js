import React from 'react'

function MyExerciseItem(props) {
    return (
        <div>
            <span style={{fontWeight:'bold, underline'}}>
                    {props.myexercise.exercise} 
                </span> {props.myexercise.date}
        </div>
    )
}

export default MyExerciseItem
