import React from 'react'
import { ThumbsUp } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';


const ListComponent = ({ user, title, description, likes, comments }) => {
    return (
        <div className='flex w-fit h-fit rounded-lg p-1 m-3 active:scale-95 transition duration-300  bg-white shadow-md   '>
            <div className=" content className='flex flex-col'">
                <div className="author flex p-2 space-x-3 text-xs bg-amber-300">
                    <img className='hover:cursor-pointer object-cover h-5 w-fit rounded-full justify-end' src='https://imgs.search.brave.com/0B98aGQC52FGqiWoNzIeQLwVsfFU2N4SIgbmWbFLU14/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NmQ2YjVlZmFiY2Fj/MjI5MTNmODIxMWIv/NjZmZTk1YTQ3NzUz/NzA3MWYxYzQwZmFh/XzRlMDQwZmI1Mjk3/ODcyZmNjM2VlZTlj/MjNkYzQzZGNlYWFm/MTdkYmEtMTY0NXgy/MTc3LmpwZWc'></img>
                    <p>{user}</p>
                </div>

                <div className="content p-2 hover:cursor-pointer">
                    <h1 className='title text-lg font-bold'>{title}</h1>
                    <p className='font-thin text-sm'>{description}</p>
                </div>

                <div className="likes flex space-x-6 p-2 ">
                    <p className="likes flex hover:cursor-pointer"> <ThumbsUp /> {likes} </p>
                    <p className="comments flex hover:cursor-pointer"><MessagesSquare /> {comments} </p>

                </div>
            </div>

            <div className="articleImage m-2 p-2">
                <img className='object-cover  h-30 w-30 rounded-xl mx-7' src='https://imgs.search.brave.com/Usew1rQcMkKJZjucJnk8IIZ0SgolxFr43YGKq94GbFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFIRDBB/UlpFNjAvMS8wLzE2/MDB3L2NhbnZhLWJs/YWNrLWFuZC13aGl0/ZS1taW5pbWFsaXN0/LWpvdXJuYWwtYXJ0/aWNsZS1yZXZpZXct/cHJlc2VudGF0aW9u/LWtqdmtzYXp3YW9J/LmpwZw'></img>
            </div>
        </div>

    )
}

export default ListComponent
