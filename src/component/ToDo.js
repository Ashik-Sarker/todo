import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateCheckAuto = (id, isChecked) => {

        fetch(`http://task.atiar.info/api/todo/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                is_completed: isChecked,
            })
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success("Task Completed successfully");
                console.log(data);
            })
    }

const createTimeStamps = (task) => {
    if (new Date(task.end_date + " " + task.end_time).getTime() < new Date().getTime() ) {
        updateCheckAuto(task.id, 1);
    }
}

const ToDo = () => {
    const [confirmation, setConfirmation] = useState(false);
    const [track, setTrack] = useState('');
    const [tasks, setTask] = useState([]);
    const [reFetch, setRefetch] = useState(false);
    const [check, setCheck] = useState(111);
    let today = new Date().toLocaleDateString();
    let updateTodayDate = today.split('/').join('-');

    useEffect(() => {
        fetch('http://task.atiar.info/api/todo')
            .then(res => res.json())
            .then(data => {
                const res = data?.data?.slice(0).sort((a, b) =>
                    a.start_date.localeCompare(b.start_date) || a.start_time.localeCompare(b.start_time));
                const res1 = res.sort((a, b) => a.is_completed - b.is_completed)
                setTask(res1);
            })
        
        tasks.map(task => createTimeStamps(task))

    }, [reFetch])
    console.log(tasks);

    const createAlert = (id) => {
        setTrack(id);
        setConfirmation(true)
    } 

    // Creating action functions

    let newData = {};
    const addTask = (e) => {
        e.preventDefault();
        console.log('onsubmit work');
        newData.title = e?.target?.title?.value;
        newData.note = e?.target?.note?.value;
        newData.start_time = e?.target?.start_time?.value;
        newData.end_time = e?.target?.end_time?.value;
        newData.start_date = e?.target?.start_date?.value;
        newData.end_date = e?.target?.end_date?.value;

        fetch(`http://task.atiar.info/api/todo/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success("Task added successfully");
                setRefetch(!reFetch);
                console.log(data);
            })
            
    }

    let modifyData = {}
    const editTask = (e) => {

        e.preventDefault();
        modifyData.id = track;
        modifyData.title = e?.target?.title2?.value;
        modifyData.note = e?.target?.note2?.value;
        modifyData.start_time = e?.target?.start_time2?.value;
        modifyData.end_time = e?.target?.end_time2?.value;
        modifyData.start_date = e?.target?.start_date2?.value;
        modifyData.end_date = e?.target?.end_date2?.value;

        console.log("Modify data",modifyData);

        fetch(`http://task.atiar.info/api/todo/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifyData)
            })
            .then(res => {

                return res.json()
            })
            .then(data => {
                toast.success("Task updated successfully");
                setRefetch(!reFetch);
                console.log(data);
            })
    }

    const deleteTask = () => {
        fetch(`http://task.atiar.info/api/todo/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: track,
            })
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success("Task deleted successfully");
                setRefetch(!reFetch);
                console.log(data);
            })
    
        setConfirmation(false);
    }

    const updateCheck = (id,event) => {
        let value = event?.target?.checked;

        value ? setCheck(1) : setCheck(0)

        fetch(`http://task.atiar.info/api/todo/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                is_completed: check,
            })
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success("Task Completed successfully");
                setRefetch(!reFetch);
                console.log(data);
            })
    }


   
    return (
        <div className='m-12 shadow-lg border'>
            <div className='flex justify-end pr-4 pt-4'>
                <label htmlFor="my-modal-3" className="btn btn-primary btn-sm modal-button">Add ToDo</label>
            </div>

            <div className='p-4 '>
                {/* api call */}
                {
                    tasks.map(task => (
                        <div key={task.id} className='mb-2'>
                            <div className = 'border border-[#DCDCDC] rounded flex justify-between p-2' >
                                <div>
                                    {
                                        task.is_completed
                                            ?
                                            <h1 className='text-md font-semibold line-through'>{task.title}</h1>
                                            :
                                            <h1 className='text-md font-semibold'>{task.title}</h1>
                                    }
                                    
                                    <p className='text-xs text-[#8A8A8A]'>{task.note}</p>
                                    <p className='text-xs text-[#8A8A8A]'>{task.start_date} - {task.end_date}</p>
                                    <p className='text-xs text-[#8A8A8A]'>{task.start_time} - {task.end_time}</p>
                                </div>
                                <div className='flex justify-center items-center gap-4'>
                                    {
                                        task.is_completed === 1
                                            ?
                                            <input onChange={(event)=>updateCheck(task.id,event)} type='checkbox' checked className="text-[#007BEC] cursor-pointer}" />
                                            :
                                            <input onChange={(event)=>updateCheck(task.id,event)} type='checkbox' className="text-[#007BEC] cursor-pointer}"/>
                                    }

                                    <label htmlFor="my-modal-4" className="modal-button">
                                    <FaEdit onClick={() => setTrack(task.id)} className='text-[#B517FF] cursor-pointer'/>
                                    </label>
                                    <RiDeleteBin6Line onClick={()=> createAlert(task.id)} className='text-[#FF4949] cursor-pointer'/>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* popup */}
            
            {/* Add task */}
            <div>
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-center text-sm font-semibold'>Add ToDo</h1>
                    
                    <form className='mt-4' onSubmit={addTask}>
                        <input name='title' type="text" placeholder="write task title " className="input input-bordered input-sm w-full " />
                        <textarea name='note' className="textarea textarea-bordered w-full mt-2" placeholder="Write task note"></textarea>
                        <div className='flex gap-2 mt-1'>
                            <input name='start_time' type="time" placeholder="start time " className="input input-bordered input-sm w-[50%]"/>
                            <input name='end_time' type="time" placeholder="end time " className="input input-bordered input-sm w-[50%]"/>
                        </div>
                        <div className='flex gap-2 mt-2'>
                            <input 
                            type = "date"
                            min = {updateTodayDate}
                            name = "start_date"
                            placeholder = "Start Date "
                            className = "input input-bordered input-sm w-[50%]"  />
                            <input type = "date"
                            name = "end_date"
                            placeholder = "End Date "
                            className = "input input-bordered input-sm w-[50%]" />
                        </div>
                           
                        <div className='flex justify-center mt-6'>
                            <div className="modal-action bg-primary text-white rounded py-1">
                                <input type="submit" htmlFor="my-modal-3" className="px-12" value="Add"/>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>

            {/* Edit ToDo */}
            <div>
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-center text-sm font-semibold'>Edit ToDo</h1>
                    
                    <form className='mt-4' onSubmit={editTask}>
                        <input name='title2' type="text" placeholder="write task title " className="input input-bordered input-sm w-full " />
                        <textarea name='note2' className="textarea textarea-bordered w-full mt-2" placeholder="Write task note"></textarea>
                        <div className='flex gap-2 mt-1'>
                            <input name='start_time2' type="time" placeholder="start time " className="input input-bordered input-sm w-[50%]"/>
                            <input name='end_time2' type="time" placeholder="end time " className="input input-bordered input-sm w-[50%]"/>
                        </div>
                        <div className='flex gap-2 mt-2'>
                            <input type = "date"
                            name = "start_date2"
                            placeholder = "Start Date "
                            className = "input input-bordered input-sm w-[50%]"  />
                            <input type = "date"
                            name = "end_date2"
                            placeholder = "End Date "
                            className = "input input-bordered input-sm w-[50%]" />
                        </div>
                           
                        <div className='flex justify-center mt-6'>
                            <div className="modal-action bg-primary text-white rounded py-1">
                                <input type="submit" htmlFor="my-modal-3" className="px-12" value="Add"/>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>

            {/* delete confirmation popup */}
            {
                confirmation && <div className='flex justify-center'>
                <div className="alert shadow-lg absolute top-0 w-[50%]">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>we use cookies for no reason.</span>
                    </div>
                    <div className="flex-none">
                        <button onClick={()=>setConfirmation(false)} className="btn btn-sm btn-ghost">Cancel</button>
                        <button onClick={deleteTask} className="btn btn-sm btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
            }

             <ToastContainer/>
        </div>
    );
};

export default ToDo;