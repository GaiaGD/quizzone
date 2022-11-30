import React from "react";

export default function Categorybubble(props){

    let category = props.category
    let value = props.value

    return (
            <div className="category-ball-container wobble-vertical-on-hover">
                <div className='category-ball'
                onClick={() => props.selectCategoryAndStartQuiz(event)}
                >
                    <div
                    className={'category-ball-2 emoji-' + value }
                    data-a={value}
                    >
                    </div>

                    <div
                    className='category-ball-1'
                    data-a={value}>
                        <p data-a={value}>{category}</p>
                    </div>

                </div>
            </div>
    )
}