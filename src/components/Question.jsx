import React from "react";

export default function Question(props){

    let styleSelected = {
        backgroundColor: props.selected ? "#F9627D" : "#ffffff",
        border: props.selected ? "4px solid #F9627D" : "4px solid #C1FF9B",
        color: props.selected && "#ffffff"
    }

    let styleCheckedRight = {
        backgroundColor: "#C1FF9B",
        border: "4px solid #C1FF9B",
        color: "#ffffff",
        pointerEvents: "none"
    }

    let styleCheckedWrong = {
        backgroundColor: props.selected ? "#8E0000" : "#ffffff",
        border: props.selected ? "4px solid #8E0000" : "4px solid #C1FF9B",
        color: props.selected ? "#ffffff" : "#F9627D",
        pointerEvents: "none"
    }

    return ( !props.checked ?
        // if I didn't have the option selected yet, give the purple color to the selected
        <div
            className="option wobble-vertical-on-hover"
            style={props.checked ? styleChecked : styleSelected}            
            onClick={() => props.toggleSelected(props.id)}>
            {props.copy}
        </div>               
        :
        // once selected, show what did they got right (green) or wrong (red)
        <div
            
            className="option wobble-vertical-on-hover"
            style={props.correct ? styleCheckedRight: styleCheckedWrong}            
            onClick={() => props.toggleSelected(props.id)}>
            {props.copy}
        </div>
        )

}
