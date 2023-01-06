import React from 'react'
import { Draggable } from "react-beautiful-dnd";
import { BiMove } from "react-icons/bi";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { ImBin } from "react-icons/im";

const ToDoComponent = ({
    id,
    index,
    title,
    dent,
    setInput,
    input,
    handleDelete,
    handleIndent,
    handleOutdent,
  }) => {
    console.log();
    return (
      <Draggable draggableId={id.toString()} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            
            ref={provided.innerRef}
            className="flex flex-row justify-start items-center w-full h-9  border-gray-100 border-b-[1px]"
          >
            <div
              className={`flex flex-row justify-between items-center w-1.5/12 p-4 mr-${dent}`}
            >
              <button {...provided.dragHandleProps}>
              <BiMove
                
                fontSize={15}
                className="mr-2 opacity-10 hover:text-cyan-400 hover:opacity-100"
              />
              </button>
              <BsFillCaretLeftFill
                onClick={() => handleIndent(id)}
                fontSize={15}
                className="mr-2 opacity-10 hover:text-cyan-400 hover:opacity-100"
              />
              <BsFillCaretRightFill
                onClick={() => handleOutdent(id)}
                fontSize={15}
                className="mr-2 opacity-10 hover:text-cyan-400 hover:opacity-100"
              />
              <ImBin
                onClick={() => handleDelete(id)}
                fontSize={15}
                className="mr-2 opacity-10 hover:text-cyan-400 hover:opacity-100"
              />
            </div>
            <div className="bg-gray-500 w-7 h-9 mx-12 opacity-10 border-gray-100 border-1 "  />
            <div className=" h-8 ">
              <textarea
                id={id}
                name={id}
                onChange={(e) =>
                  setInput({ value: e.target.value, id: id, dent: dent })
                }
                value={input?.value}
                placeholder="Type the task"
                className={`overflow-hidden h-full flex justify-center items-center outline-none font-${
                  dent === 0 ? "bold" : dent === 1 ? "semibold" : "normal"
                } mt-1.5 text-[14px] text-${
                  dent === 0 ? "cyan-400" : dent === 1 ? "black" : "gray-400"
                } text- w-806 bg-inherit resize-none border-none`}
              >
                {title}
              </textarea>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

export default ToDoComponent