// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import fileDownload from 'js-file-download';
import html2canvas from 'html2canvas';
import p1 from '../assets/p1.png'
import p2 from '../assets/p2.png'
import p3 from '../assets/p3.png'
import p4 from '../assets/p4.png'
import p5 from '../assets/p5.png'
import p6 from '../assets/p6.png'
import p7 from '../assets/p7.png'


const SemesterMarksCalculator = () => {
  const [marks, setMarks] = useState(Array.from({ length: 5 }, () => ({ credit: 0, grade: '' })));
  const [cgpa, setCgpa] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const calculateCgpa = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    marks.forEach((mark) => {
      let credit = mark.credit;
      let grade = mark.grade;
      let gradePoint = 0;

      if (grade === 'O') gradePoint = 10;
      else if (grade === 'A+') gradePoint = 9;
      else if (grade === 'A') gradePoint = 8;
      else if (grade === 'B+') gradePoint = 7;
      else if (grade === 'B') gradePoint = 6;
      else if (grade === 'C') gradePoint = 5;
      else gradePoint = 0;

      totalCredits += credit;
      totalGradePoints += credit * gradePoint;
    });

    const calculatedCgpa = totalGradePoints / totalCredits;
    setCgpa(calculatedCgpa);
  };

  const handleMarksChange = (index, value, type) => {
    const updatedMarks = [...marks];
    updatedMarks[index][type] = value;
    setMarks(updatedMarks);
  };

  const addSubject = () => {
    if (marks.length < 12) {
      setMarks([...marks, { credit: 0, grade: '' }]);
    } else {
      alert("You've reached the maximum limit of subjects (12).");
    }
  };

  const deleteSubject = (index) => {
    const updatedMarks = marks.filter((_, i) => i !== index);
    setMarks(updatedMarks);
  };

  const downloadAsImage = () => {
    setDownloading(true);

    const element = document.getElementById('calculator-container');

    html2canvas(element, {
      scale: 2, 
      useCORS: true, 
    })
      .then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            fileDownload(blob, 'semester_marks_calculator.png');
          }
          setDownloading(false);
        });
      })
      .catch((err) => {
        console.error('Error capturing the screenshot:', err);
        setDownloading(false);
      });
  };

  const getCgpaColorClass = (cgpa) => {
    if (cgpa >= 5.1 && cgpa <= 6.0) return 'text-red-600';
    if (cgpa >= 6.01 && cgpa <= 7.0) return 'text-orange-600';
    if (cgpa >= 7.01 && cgpa <= 8.0) return 'text-yellow-400';
    if (cgpa >= 8.01 && cgpa <= 9.0) return 'text-green-500';
    if (cgpa >= 9.01 && cgpa <= 10.0) return 'text-purple-500';
    return 'text-white';
  };

  return (
    <>
      <div className="text-center overflow-hidden bg-black pt-6">
        <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent text-3xl md:text-5xl inline-block font-bold">
          SRM GPA Calculator
        </span>
      </div>

      <div className=''>
        <img src={p1} alt="" className='absolute w-40 ml-20 hidden lg:block'/>
        <img src={p2} alt="" className='absolute w-40 ml-72 mt-[250px] hidden lg:block '/>
        
        <img src={p4} alt="" className='absolute w-40 ml-20 mt-[450px] hidden lg:block'/>
        <img src={p5} alt="" className='absolute w-40 ml-[1250px] hidden lg:block'/>
        <img src={p6} alt="" className='absolute w-40 ml-[1250px] mt-[450px] hidden lg:block'/>
        <img src={p7} alt="" className='absolute w-40 ml-[1050px] mt-[250px] hidden lg:block'/>

      </div>

      {//<img src={gr1} alt="" className='absolute w-[600px] ml-[] mt-[60px]' />
      //<img src={gr1} alt="" className='absolute w-[600px] ml-[910px]  -mt-[150px]' />
      }



      <div className="bg-black w-full min-h-screen ">
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-md p-6 mt-[60px] lg:mt-[50px]" id="calculator-container">
            {marks.map((mark, index) => (
              <div key={index} className="mb-4 flex justify-center items-center space-x-2">
                <span className="mr-4 text-lg font-semibold">{index + 1}.</span>
                <input
                  type="number"
                  placeholder="Credit"
                  value={mark.credit}
                  onChange={(e) => handleMarksChange(index, parseInt(e.target.value), 'credit')}
                  className="w-3/4 py-2 px-4 rounded-lg border text-white border-gray-300 bg-black focus:outline-none focus:border-blue-500"
                />
                <select
                  value={mark.grade}
                  onChange={(e) => handleMarksChange(index, e.target.value, 'grade')}
                  className="w-3/4 py-2 px-4 rounded-lg border border-gray-300 bg-black text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Grade</option>
                  <option value="O">O</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="F">F</option>
                  <option value="A">A (Absent)</option>
                  <option value="I">I (Low Attendance)</option>
                </select>
                <button
                  onClick={() => deleteSubject(index)}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="flex justify-center space-x-4">
              <button
                onClick={addSubject}
                className="bg-yellow-500 hover:bg-yellow-300 w-60 duration-1000 text-white font-bold ml-6 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Add Subject
              </button>
              <button
                onClick={calculateCgpa}
                className="bg-blue-500 hover:bg-blue-400 duration-1000 w-60 text-white font-bold px-2 py-5 rounded-full focus:outline-none focus:shadow-outline"
              >
                Calculate CGPA
              </button>
            </div>
            <div className="flex items-center justify-center pt-5">
              <button
                onClick={downloadAsImage}
                className="bg-[#e31cc8] hover:bg-pink-400 duration-1000 text-white font-bold w-60 py-4 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Download as Image
              </button>
            </div>
            <div className="mt-6">
              <h3 className={`text-3xl font-bold text-center ${getCgpaColorClass(cgpa)}`}>
                CGPA: {cgpa.toFixed(2)}
              </h3>
            </div>
          </div>
          {downloading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <p className="text-white">Downloading...</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-black -mt-20 text-center">
        <p className='text-gray-400'><a href="https://github.com/Sameer01-01/srm-gpa-calculator">Click for source code</a> </p>
                    <p className="text-gray-400 pt-2">
                         <a href="https://github.com/Sameer01-01"> Made by Sameer</a>
                    </p>
                </div>
    </>
  );
};

export default SemesterMarksCalculator;
