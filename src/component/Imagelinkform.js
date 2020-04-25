import React from 'react';
import'./Imagelinkform.css'; 

const Imagelinkform = ({ onInputChange,onbuttonsubmit }) => {
    return (
        <div>
            <p className='f3'>
                This Magic Brain Will detect faces in your pictures.Give it a try. 
            </p>
            <div className='center'>
                <div className='form cneter pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 ' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onbuttonsubmit}>detect</button>
                </div>
            </div>
        </div>
 
    );
}
export default Imagelinkform;