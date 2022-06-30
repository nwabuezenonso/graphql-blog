import React, { useState,useRef, useEffect } from 'react'; // import useState
import { submitComment } from '../services';  // submit data

//  comments funtional component
const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // read the value and send it to graphcms
  const  commentEl = useRef();
  const  nameEL = useRef();
  const  emailEl = useRef();
  const  storeDataEl = useRef();

  useEffect(() => {
    nameEL.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  // handling data when button is clicked
  const handleCommentSubmission = () => {
    setError(false)  // set error function to false
    
    const { value: comment }  = commentEl.current;   // useref stores value in the current
    const { value: name } =  nameEL.current;
    const { value: email } =  emailEl.current;
    const { checked: storeData} =  storeDataEl.current;

    if(!comment || !name || !email){
      setError(true);
      return;
    }

    const commentObj = {name, email, comment, slug }   // storing the name, email and data in the  object

    // store those values in a local storage
    if(storeData){
      window.localStorage.setItem('name' ,name)
      window.localStorage.setItem('email', email)
    }else{
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }
    // submit object from the services
    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 30000)
      })
  }

  //  return the form
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea ref={commentEl}  className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" ref={nameEL}  className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Name" name="name" />
        <input type="email" ref={emailEl} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
      </div>
      {/* store data in the localstorage */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataEl}  type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email in this browser for the next time I comment.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button type="button" onClick={handleCommentSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  );
};

export default CommentsForm;