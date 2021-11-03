import React from 'react'
import MyExerciseItem from './MyExerciseItem'

function MyExerciseView(props) {
    return (
        <div>
            {props.exerciseList.map(myexercise => <MyExerciseItem myexercise={myexercise} />)}
        </div>
    )
}

export default MyExerciseView
