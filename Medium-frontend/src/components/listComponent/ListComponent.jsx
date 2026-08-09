import React from 'react'
import { ThumbsUp } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import {getCommentByArticleId} from "../../services/CommentService.jsx";
import {getMyArticlesService} from "../../services/ArticleServices.jsx";

export function openArticleDetails(articleId) {
    console.log("openArticleDetails function hai jo articles ki details show karega", articleId)

    //ye is article ki details hai
    //get karenge article ko or uski details ek naye page par show karenge ek url ke through jump karwa denge
    // getMyArticlesService()
}

const ListComponent = ({ user, title, description, likes, comments }) => {
    function getCommentOfThisArticle() {

        console.log("This is the getCommentOfThisArticle function ",user)
        // 1. get all the comments by specific id of article (api chalegi)
        // 2. then open the side pannel to show all the comments (have to change the ui or yahi par uska code likh skte hai)
        // 3. comments ke side panel me like or reply karne ka option denge

        // getCommentByArticleId(user).then(response => {
        //     console.log(`Comment of ${user} artcle is ${user}`)
        // }).catch(error => {
        //     console.log(`This is error while in comment showing : ${error}`)
        // })
    }

    function imageReferenceRedirect() {
        console.log("imageReferenceRedirect function : jisme image ko redirect kar dega click karne par")
        // isme image ko sperately open kar denge kisi bhi dusre page par taki user use dekh ske
    }

    return (
        <div className='border flex w-fit h-fit rounded-lg p-1 m-3 transition duration-300 shadow-md'>
            <div className="content className='flex flex-col'">
                <div className="author flex p-2 space-x-3 text-xs bg-gray-200 rounded-full px-2">
                    <img className='hover:cursor-pointer object-cover h-5 w-fit rounded-full justify-end' src='https://imgs.search.brave.com/0B98aGQC52FGqiWoNzIeQLwVsfFU2N4SIgbmWbFLU14/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NmQ2YjVlZmFiY2Fj/MjI5MTNmODIxMWIv/NjZmZTk1YTQ3NzUz/NzA3MWYxYzQwZmFh/XzRlMDQwZmI1Mjk3/ODcyZmNjM2VlZTlj/MjNkYzQzZGNlYWFm/MTdkYmEtMTY0NXgy/MTc3LmpwZWc'></img>
                    <p onClick={() => openArticleDetails(user)} className={"cursor-pointer active:scale-95"}>{user}</p>
                </div>

                <div className="content p-2 hover:cursor-pointer" onClick={() => openArticleDetails(user)}>
                    <h1 className='title text-lg font-bold active:scale-95'>{title}</h1>
                    <p className='font-thin text-sm active:scale-95'>{description}</p>
                </div>

                <div className="likes flex space-x-6 p-2  ">
                    <p className="likes flex hover:cursor-pointer active:scale-95"> <ThumbsUp /> {likes} </p>
                    <p className="comments flex hover:cursor-pointer active:scale-95" onClick={getCommentOfThisArticle}>
                        <MessagesSquare /> {comments}
                    </p>
                </div>
            </div>

            <div className="articleImage m-2 p-2">
                <img className='object-cover cursor-pointer h-30 w-30 rounded-xl mx-7' src='https://imgs.search.brave.com/Usew1rQcMkKJZjucJnk8IIZ0SgolxFr43YGKq94GbFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFIRDBB/UlpFNjAvMS8wLzE2/MDB3L2NhbnZhLWJs/YWNrLWFuZC13aGl0/ZS1taW5pbWFsaXN0/LWpvdXJuYWwtYXJ0/aWNsZS1yZXZpZXct/cHJlc2VudGF0aW9u/LWtqdmtzYXp3YW9J/LmpwZw' onClick={imageReferenceRedirect}></img>
            </div>
        </div>

    )
}

export default ListComponent
