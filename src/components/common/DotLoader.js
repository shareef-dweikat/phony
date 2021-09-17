import React, {useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";

const DotLoader = ({ }) => {
  const [dots, setDots]= useState([])
  const ref = useRef({
    counter: 0
  });
  const loaderDots = [
    <div style={{height:10, width: 10, borderRadius: 100, backgroundColor: '#3a7cf6'}}></div>,
    <div style={{height:10, width: 10, borderRadius: 100, backgroundColor: '#de4a42'}}></div>,
    <div style={{height:10, width: 10, borderRadius: 100, backgroundColor: '#fed64a'}}></div>,
    <div style={{height:10, width: 10, borderRadius: 100, backgroundColor: '#21ac64'}}></div>
  ]
  useEffect(()=> {
    const timer = setInterval(()=>{
  
      if(ref.current.counter < 4)
        ref.current.counter = ref.current.counter + 1
      else {
        ref.current.counter = 0
        setDots([])
      }
       setDots(loaderDots.slice(0, ref.current.counter))
    },1000)
    return timer
  }, [])
  console.log(dots, "ooppp")
  return (
    <div className="d-flex flex-row-reverse">
      {dots?.map((dot)=><>{dot}</>)}
    </div>
  );
};

DotLoader.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default DotLoader;
