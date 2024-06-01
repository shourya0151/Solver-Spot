import axios from 'axios';
import React, { useState } from 'react';
import "./compiler.css"
const Compiler = ({ _id }) => {
    // State for input values
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState('');
    const [verdict, setVerdict] = useState('');
    const [message, setMessage] = useState('');
    const [err , setErr] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const solution = {
            code: code,
            language: language
        };
        const token = localStorage.getItem("jwt"); // Retrieve the JWT from local storage
        try {
            console.log("compiler " + token);
            const response = await axios.post(
                `http://localhost:4000/OJ/solutions/submit/${_id}`,
                solution,
            );
            // Handle the response
            // ...
            console.log(response.data);
            //alert(response.data.solution.verdict);
            setVerdict(response.data.solution.verdict)
            /* setMessage(response.data.message); */
            if (verdict === "Passed") {
                setMessage(response.data.message)
            }
            else {

                setMessage(response.data.message + ": " + response.data.tt);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleRun = async (event) => {
        event.preventDefault();
        const solution = {
            code: code,
            language: language
        };
        const token = localStorage.getItem("jwt"); // Retrieve the JWT from local storage
        try {
            console.log("compiler " + token);
            const response = await axios.post(
                `http://localhost:4000/OJ/solutions/run/${_id}`,
                solution,
            );
            // Handle the response
            // ...
            console.log(response);
            //alert(response.data.solution.verdict);
            setVerdict(response.data.verdict)
            /* setMessage(response.data.message); */
            if (verdict === "Passed") {
                setMessage(response.data.message)
            }
            else {

                setMessage(response.data.message);
            }
        } catch (error) {
            setErr(error.response.data.error);
            console.log(error);
        }
    };


    return (
        <div className="compiler-container">
            <form>
                <div className="form-group">
                    <label>Language:</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        {/* Include the available language options */}
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        {/* Add more language options as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label>Code:</label>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        rows={30}
                        cols={100}
                        className='codeArea'
                    />
                </div>
                <div className='buttons'>
                    <div type="submit" onClick={handleRun} className='run'>Run</div>
                    <div type="submit" onClick={handleSubmit} className='submit'>Submit</div>
                </div>
            </form>

            <div>
            <h3>Compiler Output:</h3>
                
                    <pre>{verdict==="Passed"?<p className='greenColor'>{verdict}</p>:<p className='redColor'>{verdict}</p>}</pre>
                    <pre>{verdict==="Passed"?<p className='greenColor'>{message}</p>:<p className='redColor'>{message}</p>}</pre>
                    {(err)?<pre className='redText'>{err}</pre>:""}
            </div>
        </div>
    );
};

export default Compiler;
