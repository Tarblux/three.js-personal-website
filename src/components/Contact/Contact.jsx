import React, { useState, useRef, useEffect } from 'react'
import SendButton from '../UI/SendButton'
import { useForm, ValidationError } from '@formspree/react';
import soundManager from '../../utils/soundManager'

const Contact = () => {
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const messageRef = useRef(null);
    const formRef = useRef(null);
    const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);

    useEffect(() => {
        soundManager.preload('sendSwoosh', ['/sounds/send-swoosh.ogg', '/sounds/send-swoosh.mp3'])
    }, [])

    const playSendSound = () => {
        soundManager.play('sendSwoosh')
    };

    const handleSendClick = (e) => {
        e.preventDefault();
        playSendSound();
        
        // Only submit if we haven't already submitted , cuz people might abuse the send animation
        if (!hasSubmitted && formRef.current) {
            const formData = new FormData(formRef.current);
            handleSubmit(formData);
            setHasSubmitted(true);
        }
    };

    return (
        // CONTACT_ROOT: This is the main positioning context for the absolute image and the card , so they can be positioned relative to each other
        <div className="absolute md:top-8 md:right-8 md:w-[400px] w-full max-w-[95vw] left-1/2 md:left-auto top-0 right-0 z-10 flex flex-col justify-center h-auto p-2 md:p-0 -translate-x-1/2 md:translate-x-0">
            {/* OVERFLOWING_IMAGE HACK: This is a hack to get the image to overflow the card  , because safari and chrome have different default styles for images :( */}
            {/* The image needs to be positioned to align with where it would appear in the card */}
            {/* Accounting for: Contact label (mb-2), glassmorphic wrapper (p-2), main card (p-4) */}
            <div className="absolute top-[calc(1rem+0.5rem+1rem+1rem-42px)] left-[calc(1rem+1rem-0.5rem)] z-20 pointer-events-none hidden md:block">
                {/* Gray background square */}
                <div className="absolute top-[52px] left-2 w-36 h-36 bg-gray-200 rounded-2xl z-0"></div>
                {/* Profile image */}
                <img
                    src="/images/Contact/profile-pic-contact.webp"
                    alt="Profile"
                    className="w-52 h-52 object-cover rounded-2xl z-10 relative -left-10 pointer-events-auto"
                />
            </div>

            <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block self-start">
                Contact
            </span>
            
            {/* Glassmorphic Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 border border-white/30 shadow-lg ">
                {/* Main White Card */}
                <div className="bg-white/90 p-4 rounded-lg shadow-lg text-left flex flex-col gap-4">
                    {/* Top Row: Avatar Spacer + Heading */}
                    <div className="flex flex-row items-start gap-6 mb-5">
                        {/* AVATAR_SPACER: This div creates space for the absolutely positioned image */}
                        <div className="relative w-32 h-32 flex-shrink-0 hidden md:block">
                            {/* This spacer maintains the layout spacing where the image would have been , I hate safari and firefox for this lol */}
                        </div>
                        <div className="flex flex-col justify-center mt-2 ml-3 w-full">
                            <h2 className="text-2xl font-bold mb-1">Get in touch !</h2>
                            <span className="text-gray-500 text-xs ">tarblux12@gmail.com</span>
                            {/* Social Icons */}
                            <div className="flex flex-row gap-3 mt-3 relative z-30">
                                <a href="https://www.linkedin.com/in/tariq-williams12/" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                    <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                                </a>
                                <a href="https://github.com/tarblux" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                    <img src="/icons/Github_light.svg" alt="GitHub" className="w-5 h-5" />
                                </a>
                                <a href="mailto:tarblux12@gmail.com" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                    <img src="/icons/gmail.svg" alt="Gmail" className="w-5 h-5" />
                                </a>
                                <a href="https://stackoverflow.com/users/30169462/tariq-williams" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                    <img src="/icons/stackoverflow.svg" alt="Stack Overflow" className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Divider  */}
                    <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-400 text-xs">or just say hi.....</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    {/* Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="flex gap-3 w-full flex-col sm:flex-row">
                            <input 
                                type="text" 
                                name="firstName"
                                placeholder="First Name" 
                                className="w-full sm:w-1/2 min-w-0 rounded-lg bg-gray-100 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs" 
                            />
                            <input 
                                type="text" 
                                name="lastName"
                                placeholder="Last Name" 
                                className="w-full sm:w-1/2 min-w-0 rounded-lg bg-gray-100 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs" 
                            />
                        </div>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            className="rounded-lg bg-gray-100 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs" 
                        />
                        <ValidationError 
                            prefix="Email" 
                            field="email"
                            errors={state.errors}
                        />
                        <textarea
                            ref={messageRef}
                            name="message"
                            placeholder="Message"
                            rows={12}
                            className="rounded-lg bg-gray-100 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none text-xs"
                            value={message}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(message.trim().length > 0)}
                            onChange={e => {
                                setMessage(e.target.value);
                                if (e.target.value.trim().length > 0) {
                                    setIsTyping(true);
                                } else {
                                    setIsTyping(false);
                                }
                            }}
                        />
                        <ValidationError 
                            prefix="Message" 
                            field="message"
                            errors={state.errors}
                        />
                    </form>
                </div>
            </div>
            {/* Send Button */}
            <div
                className={`absolute right-0 -bottom-[68px] flex items-center gap-2 transition-transform duration-500 ${isTyping ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-1 border border-white/30 shadow-lg transition-transform duration-300 hover:scale-105">
                    <SendButton 
                        onClick={handleSendClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact