import React from "react";
import './index.scss';


interface JumpTopPropsType {
    isShow: boolean;
}

export default function JumpTop (props:JumpTopPropsType) {
    const { isShow } = props;

    const handleClick = () => {
        scrollTo({  
            top: 0,  
            behavior: 'auto' 
        }); 
    }

    return (
        <div className={"go-top " + (isShow ? '' : 'hide')} onClick={handleClick}>
            <div className="top-line"></div>
            <div className="middle-line"></div>
            <span className="go-top-text">顶部</span>
        </div>
    )
}