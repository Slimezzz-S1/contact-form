import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import SuccessIcon from './assets/icon-success-check.svg?react'

interface basicInputProps {
    title : string
    errorLog? : string
    isRequired? : boolean
    className? : string
    id : string
}

interface textInputProps extends basicInputProps {
    type : "text"
    placeHolder? : string
}

interface emailInputProps extends basicInputProps {
    type : "email"
    placeHolder? : string
}

interface radioInputProps extends basicInputProps {
    type : "radio"
    optionsWithName : {value : any, name : string, id : any}[]
    defaultOption? : boolean,
}

interface checkBoxInputProps extends basicInputProps {
    type : "checkbox"
    defaulOption? : boolean
}

interface messageInputProps extends basicInputProps {
    type : "message"
    placeHolder? : string
}

export type inputType = "text" | "email" | "radio" | "checkbox" | "message"

export type inputTypeProps = textInputProps | emailInputProps | radioInputProps | checkBoxInputProps | messageInputProps

const FormInputData : inputTypeProps[] = [
    {
        type : "text",
        title : "First Name",
        id : "firstname"
    },
    {
        type : "text",
        title : "Last Name",
        id : "lastname"
    },
    {
        type : "email",
        title : "Email Address",
        id : "email",
        errorLog : "Please enter a valid email address",
        className : "col-span-2 flex flex-col gap-2"
    },
    {
        type : "radio",
        title : "Query Type",
        id : "query",
        className : "col-span-2 flex flex-col gap-2",
        optionsWithName : [
            {
                value : "general",
                name : "General Enquiry",
                id : "general"
            },
            {
                value : "support-request",
                name : "Support Request",
                id : "request"
            }
        ],
        errorLog : "Please select a query type"
    },
    {
        type : "message",
        title : "Message",
        id : "message",
        className : "col-span-2 flex flex-col gap-2"
    },
    {
        type : "checkbox",
        title : "I consent to being contacted by the team",
        id : "consent",
        className : "col-span-2 flex flex-col gap-2",
        errorLog : "To submit this form, please consent to being contacted"
    }
]

function FormInput(props: inputTypeProps) {
    const { title, errorLog, isRequired, className } = props
    const [isTrue, setIsTrue] = useState(false)
    const [text, setText] = useState('')
    const [email,setEmail] = useState('')
    const [checked, setChecked] = useState(false)
    const [selected, setSelected] = useState('')

    const isEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)

    useEffect(() => {
        if (text.trim()) {
            setIsTrue(true)
        } else {
            setIsTrue(!true)
        }
    }, [text])

    useEffect(() => {
        if (isEmail(email)) {
            setIsTrue(true)
        } else {
            setIsTrue(!true)
        }
    }, [email])

    useEffect(() => {
        setIsTrue(checked ? true : !true)
    }, [checked])

    useEffect(() => {
        setIsTrue(selected ? true : false)
    }, [selected])

    return (
        <div className={className ?? "flex flex-col gap-2"}>
            {props.type != "checkbox" && (
                <h3 className="font-semibold">
                    {title} 

                    <span className="text-accent ml-2">
                        *
                    </span>
                </h3>
            )}
            

            {(props.type === "text") &&
                <input type="text" value={text} onChange={(e) => {setText(e.target.value)}} id={props.id} required={isRequired ?? true} placeholder={props.placeHolder} className={"border px-4 py-2 rounded-lg transition-colors hover:border-accent " + (!isTrue ? "border-red-500" : "")} />
            }

            {(props.type === "email") &&
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} id={props.id} required={isRequired ?? true} placeholder={!isTrue ? "email#example.com" : ""} className={"border px-4 py-2 rounded-lg transition-colors hover:border-accent " + (!isTrue ? "border-red-500" : "")} />
            }

            {props.type === "checkbox" &&
                <div className="flex gap-4">
                    <input type="checkbox" onChange={(e) => {setChecked(e.target.checked)}} id={props.id} required={isRequired ?? true} className="accent-accent" />

                    <label className="font-medium1 w-full" htmlFor={props.id}>
                        {title} 

                        <span className="text-accent ml-2">
                            *
                        </span>
                    </label>
                </div>
            }

            {props.type === "message" &&
                <textarea id={props.id} onChange={(e) => {setText(e.target.value)}} placeholder={props.placeHolder} className={"border px-4 py-2 rounded-lg resize-none min-h-24 transition-colors hover:border-accent " + (!isTrue ? "border-red-500" : "")} required={isRequired ?? true} />
            }

            {props.type === "radio" &&
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                    {props.optionsWithName.map((option) => (
                        <label key={option.name.replaceAll(" ", "-").trim()} htmlFor={option.id} className={"flex gap-4 p-4 py-2 border rounded-lg flex-1 transition-colors " + (selected === option.value ? "bg-accent-radio border-accent" : "")}>
                            <input type="radio" value={option.value} checked={selected === option.value} onChange={(e) => {setSelected(e.target.value)}} name={props.title.toString().replaceAll(" ", "-").trim()} id={option.id} required={isRequired ?? true} className="accent-accent" />

                            <p>
                                {option.name}
                            </p>
                        </label>
                    ))}
                </div>
            }

            <div className="text-red-500 min-h-6">
                {!isTrue && (errorLog ?? "This field is required")}
            </div>
        </div>
    )
}

export default function Form() {
    const [showNotification, setShowNotification] = useState(false)

    return (
        <>
            <form onSubmit={(e) => {
                    e.preventDefault()

                    setShowNotification(true)
                }}
                className="bg-form p-8 rounded-2xl flex flex-col gap-6 w-full lg:w-fit"
            >
                <h2 className="text-2xl font-bold">
                    Contact Us
                </h2>

                <div className="lg:w-2xl flex flex-col lg:grid lg:grid-cols-2 gap-[inherit]">
                    {FormInputData.map(inputItem => (
                        <FormInput key={inputItem.title} {...inputItem} />
                    ))}

                    <button type="submit" className="bg-accent text-white py-5 col-span-2 rounded-2xl cursor-pointer hover:bg-accent-hover transition-colors" >Submit</button>
                </div>
            </form>

            {showNotification && <Notification onDone={() => setShowNotification(false)} />}
        </>
    )
}

export function Notification({onDone} : {onDone : () => void}) {
    const [isEnding, setIsEnding] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsEnding(true)
        }, 3000)
    }, [])

    return createPortal(
        <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none flex justify-center pt-4">
            <div className={"w-fit h-fit pointer-events-auto bg-notification text-white p-5 rounded-lg transition-transform " + (isEnding ? "animate-slide-up" : "animate-slide-down")} onAnimationEnd={isEnding ? onDone : () => {}}>
                <div>
                    <div className="flex gap-2 items-center">
                        <SuccessIcon />

                        <h2>
                            Message Sent!
                        </h2>
                    </div>
                </div>

                <div>
                    Thanks for completing the form. We'll be in touch soon
                </div>
            </div>
        </div>,
        document.body
    )
}