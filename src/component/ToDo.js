import React from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ToDo = () => {
    const data = [
        {
            _id: 1,
            title:"task-1",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, sapiente.",
        },
        {
            _id: 2,
            title: "task-2",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, sapiente.",
        },
        {
            _id: 3,
            title: "task-3",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, sapiente.",
        },
        {
            _id: 4,
            title: "task-4",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, sapiente.",
        },
    ]
    return (
        <div className='m-12 shadow-lg border'>
            <div className='flex justify-end pr-4 pt-4'>
                <button className='bt bg-blue-600 text-white py-1 rounded w-28'>Add ToDo</button>
            </div>
            <div className='p-4 border border-red-400'>
                {/* api call */}
                {
                    data.map(task => (
                        <div className='mb-2'>
                            <div className = 'border border-[#DCDCDC] rounded flex justify-between p-2' >
                            <div>
                                <h1 className='text-md font-semibold'>{task.title}</h1>
                                <p className='text-xs text-[#8A8A8A]'>{task.details}</p>
                            </div>
                            <div className='flex justify-center items-center gap-4'>
                                <input type='checkbox' className="text-[#007BEC]"/>
                                <FaEdit className='text-[#B517FF]'/>
                                <RiDeleteBin6Line className='text-[#FF4949]'/>
                            </div>
                        </div>
                        </div>
                    ))
                }
            </div>

            {/* popup */}
             
        </div>
    );
};

export default ToDo;