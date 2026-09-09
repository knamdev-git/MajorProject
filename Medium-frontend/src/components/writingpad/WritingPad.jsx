import React, { useState, useRef } from 'react';
import { Edit2, Eraser, Underline, Bold, Eye, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import {addArticlesService} from "../../services/ArticleServices.jsx";
import {toast} from "react-toastify";

export default function WritingPad() {
    const [article, setArticle] = useState('');
    const [isUnderline, setIsUnderline] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const textareaRef = useRef(null);

    // Character and Word Counters
    const wordCount = article.trim() ? article.trim().split(/\s+/).length : 0;
    const charCount = article.length;

    // Formatting actions
    const toggleUnderline = () => setIsUnderline(!isUnderline);
    const toggleBold = () => setIsBold(!isBold);

    const handleClear = () => {
        if (window.confirm("Are you sure you want to erase your entire draft?")) {
            setArticle('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!article.trim()) {
            alert("Please write something before submitting!");
            return;
        }

        //we'll send the request to the backend to check user authority to add the article if yes then add this article to the db and setSubmit -> true
        // addArticlesService(article)
        addArticlesService(article).then(() => {
            setSubmittedData({
                text: article,
                words: wordCount,
                timestamp: new Date().toLocaleTimeString(),
            });
            setIsSubmitted(true);
            toast.success("Successfully added article")
        }).catch(() => {
            toast.error("Cannot add article!")
        });
    };

    return (
        <div className="min-h-screen bg-stone-200 py-12 px-4 sm:px-6 lg:px-8 font-sans text-stone-800">
            <div className="max-w-3xl mx-auto">

                {/* Header Header */}
                <div className="mb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-stone-900 font-serif">Drafting Desk</h1>
                        <p className="text-sm text-stone-600 mt-1">Compose your article with a classic notepad feel.</p>
                    </div>

                    {/* Real-time stats badge */}
                    <div className="flex gap-4 bg-stone-100 border border-stone-300 rounded-lg px-4 py-2 text-xs shadow-sm">
                        <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-stone-500" />
                            <span><strong>{wordCount}</strong> words</span>
                        </div>
                        <div className="w-px bg-stone-300" />
                        <div>
                            <span><strong>{charCount}</strong> characters</span>
                        </div>
                    </div>
                </div>

                {/* Toolbar Component */}
                <div className="bg-stone-100 border border-stone-300 rounded-t-xl p-3 flex flex-wrap items-center justify-between gap-2 shadow-sm">
                    <div className="flex items-center gap-1.5">
                        {/* Write Mode Indicators */}
                        <button
                            onClick={toggleBold}
                            className={`p-2 rounded transition-colors flex items-center gap-1 text-sm ${
                                isBold ? 'bg-amber-200 text-amber-900 font-bold' : 'hover:bg-stone-200 text-stone-700'
                            }`}
                            title="Toggle Bold"
                        >
                            <Bold className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs">Write Bold</span>
                        </button>

                        <button
                            onClick={toggleUnderline}
                            className={`p-2 rounded transition-colors flex items-center gap-1 text-sm ${
                                isUnderline ? 'bg-amber-200 text-amber-900 underline' : 'hover:bg-stone-200 text-stone-700'
                            }`}
                            title="Toggle Underline"
                        >
                            <Underline className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs">Underline</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                        {/* Erase Control */}
                        <button
                            onClick={handleClear}
                            disabled={!article}
                            className="p-2 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1 text-sm"
                            title="Erase Draft"
                        >
                            <Eraser className="w-4 h-4" />
                            <span className="hidden sm:inline text-xs">Erase All</span>
                        </button>
                    </div>
                </div>

                {/* The Notepad Sheet */}
                <form onSubmit={handleSubmit} className="relative bg-[#fcf9e9] border-x border-b border-stone-300 rounded-b-xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                    {/* Top Legal Pad Binding Header */}
                    <div className="h-4 bg-amber-600 w-full border-b border-amber-700" />

                    {/* Left Margin Red Line */}
                    <div className="absolute left-12 top-4 bottom-0 w-px bg-red-400 opacity-60 pointer-events-none" />

                    {/* Text Area Input styled like loose-leaf paper */}
                    <div className="flex-1 relative p-4 pl-16 pt-6">
            <textarea
                ref={textareaRef}
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                placeholder="Start drafting your story here..."
                className={`w-full min-h-[400px] bg-transparent resize-none border-none outline-none focus:ring-0 p-0 text-lg leading-[2rem] text-stone-800 placeholder-stone-400 font-serif tracking-wide
                ${isUnderline ? 'underline decoration-amber-500/50 underline-offset-4' : ''} 
                ${isBold ? 'font-bold' : 'font-normal'}
              `}
                style={{
                    // Custom CSS background vector lines mapping directly to text leading sizing
                    backgroundImage: 'linear-gradient(rgba(191, 219, 254, 0.4) 1px, transparent 1px)',
                    backgroundSize: '100% 2rem',
                    backgroundAttachment: 'local'
                }}
            />
                    </div>

                    {/* Action Footer inside sheet */}
                    <div className="p-4 pl-16 border-t border-dashed border-stone-300/60 flex justify-end bg-[#faf6dd]/80 backdrop-blur-xs">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center gap-2 text-sm"
                        >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Submit Article
                        </button>
                    </div>
                </form>

                {/* Success Modal Simulation */}
                {isSubmitted && (
                    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-stone-200">
                            <div className="flex items-center gap-3 text-emerald-600 mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                                <h3 className="text-xl font-bold">Article Submitted Successfully!</h3>
                            </div>

                            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-4 text-sm max-h-60 overflow-y-auto">
                                <p className="text-xs text-stone-500 mb-2">Logged at {submittedData?.timestamp} • {submittedData?.words} words</p>
                                <p className="text-stone-700 whitespace-pre-wrap font-serif italic">"{submittedData?.text}"</p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-sm font-medium rounded-lg transition-colors"
                                >
                                    Back to Editing
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
