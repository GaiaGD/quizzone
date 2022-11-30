import React from "react";

export default function Questions(props){

    return (
            <div className='question-container'>
            <div className="title">
                <h3>{props.title}</h3>
            </div>
            <div className='answers'>
                <div
                    className='option'
                    style={props.selected1 ? {backgroundColor: "#6e2bff"} : {backgroundColor: "#ffffff"}}
                    onClick={() => props.toggleSelected(props.id)}>
                    {props.copy1}
                </div>
                <div
                    className='option'
                    style={props.selected2 ? {backgroundColor: "#6e2bff"} : {backgroundColor: "#ffffff"}}
                    onClick={() => props.toggleSelected(props.id)}>
                    {props.copy2}
                </div>
                <div
                    className='option'
                    style={props.selected3 ? {backgroundColor: "#6e2bff"} : {backgroundColor: "#ffffff"}}
                    onClick={() => props.toggleSelected(props.id)}>
                    {props.copy3}
                </div>
                <div
                    className='option'
                    style={props.selected3 ? {backgroundColor: "#6e2bff"} : {backgroundColor: "#ffffff"}}
                    onClick={() => props.toggleSelected(props.id)}>
                    {props.copy4}
                </div>
            </div>
        </div>
    )
}