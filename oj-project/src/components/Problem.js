import React from 'react';
import Compiler from './Compiler.js';
import Navbar from './Navbar.js';
import { useLocation } from 'react-router-dom';
import './problem.css';
import './compiler.css';
import { Dialog } from '@headlessui/react';

const Problem = () => {
  const location = useLocation();
  const problem = location.state?.problem;

  if (!problem) {
    // Handle the case when problem object is not available
    return <p>Error: Problem not found</p>;
  }

  // Access the problem statement and other properties
  const { title, statement, example, _id, constraints } = problem;
  console.log(constraints);
  return (
    <div>
      <Navbar />
      <div className='cont'>

        <div className="problem-container dark-mode">
          <div className="problem-content">
            <h1 className="problem-title">{title}</h1>
            <p className="problem-statement">{statement}</p>
            <hr className='afterProblem'></hr>
            <h2 className="example-title">Example Test Cases</h2>

            {example.map((testCase, index) => (
              <div key={index} className="example-case">
                <h3>Input:</h3>
                <pre>{testCase.input}</pre>
                <h3>Output:</h3>
                <pre>{testCase.output}</pre>
              </div>
            ))}

            <hr className="afterProblem"></hr>
            <h3>Constraints:</h3>
            {constraints.map((constraint, index) => (
              <div key={index}>
                <pre>{constraint}</pre>
              </div>
            ))}
          </div>


        </div>
        <div className="compiler-container dark-mode">
          {/* Right side for the compiler */}
          {/* Add your compiler component here */}
          <Compiler _id={_id} />
        </div>
      </div>
    </div>
  );
};

export default Problem;
