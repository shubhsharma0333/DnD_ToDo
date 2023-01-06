import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiMove } from "react-icons/bi";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ToDoComponent from "./ToDoComponent";

function App() {
  const [toDo, setTodo] = useState([]);
  const [input, setInput] = useState({ value: "", id: "", dent: 0 });

  const handleFile= (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setTodo(JSON.parse(e.target.result));
    };
  }

  const handleDownload = () =>{
    if(toDo.length < 1) return;
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(toDo)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "toDo.json";

    link.click();
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(source, destination);
    if (!destination) return;
    if (destination.index === source.index) return;

    let temp = toDo,
      add;
    add = temp[source.index];
    temp.splice(source.index, 1);
    temp.splice(destination.index, 0, add);
    console.log(temp);
    setTodo(temp);
  };

  const handleIndent = (id) => {
    console.log(id);
    let tempArray = [...toDo];
    let index = tempArray.findIndex((el) => el.id === id);
    if (index !== -1) {
      if (tempArray[index].dent === 0) return;
      tempArray[index].dent = tempArray[index].dent - 1;
      setTodo(tempArray);
    } else {
      return;
    }
    console.log(tempArray);
  };

  const handleOutdent = (id) => {
    console.log(id);
    let tempArray = [...toDo];
    let index = tempArray.findIndex((el) => el.id === id);
    if (index !== -1) {
      if (tempArray[index].dent === 2) return;
      tempArray[index].dent = tempArray[index].dent + 1;
      setTodo(tempArray);
    } else {
      return;
    }
    console.log(tempArray);
  };

  const handleDelete = (id) => {
    console.log(id);
    let tempArray = [...toDo];
    let index = tempArray.findIndex((el) => el.id === id);
    if (index !== -1) {
      tempArray.splice(index, 1);
      setTodo(tempArray);
    } else {
      return;
    }
  };

  const addTodo = () => {
    if (!input) return;

    let tempArry = [...toDo];
    if (tempArry.length < 1) {
      tempArry.push({ id: 1, title: input.value, dent: 0 });
    } else {
      let tempId = tempArry[tempArry.length - 1].id;
      tempArry.push({ id: tempId + 1, title: input.value, dent: 0 });
    }

    setTodo(tempArry);
    setInput({ value: "", id: "", dent: 0 });
  };

  const handleChange = (info) => {
    console.log(info.id);
    let tempArray = [...toDo];
    let index = tempArray.findIndex((el) => el.id === info.id);

    if (index !== -1) {
      tempArray[index].title = info.value;
    } else {
      return;
    }
    setTodo(tempArray);
    console.log(tempArray);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App flex flex-col justify-center items-center ">
        <h1 className="text-center text-3xl mt-5 shadow-lg rounded-lg p-4  text-gray-400">
          Curriculum Authoring Tool
        </h1>
        <div className="relative top-60 w-9/12">
          <div className="flex flex-row justify-start items-baseline w-full border-t-[1.8px] border-b-[1.8px]">
            <div className="w-[250px] p-4">
              <p className="font-bold leading-3">
                Actions{" "}
                <span className="text-[11px] font-semibold text-gray-400">
                  <br /> Move, Ident <br /> outdent, Delete
                </span>
              </p>
            </div>
            <div className="flex flex-col items-start p-4">
              <p className="font-bold leading-3">
                Title <br />
                <span className="text-[11px] font-semibold text-gray-400">
                  The Task to take upon
                </span>
              </p>
            </div>
          </div>
          <Droppable droppableId="toD">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col justify-center items-center h-full w-full"
              >
                {toDo?.map((el, i) => (
                  <ToDoComponent
                    {...el}
                    index={i}
                    setInput={handleChange}
                    key={el.id}
                    handleDelete={handleDelete}
                    handleIndent={handleIndent}
                    handleOutdent={handleOutdent}
                  />
                ))}
                {provided.placeholder}
                <div className="flex flex-row justify-start items-center w-full h-9  border-gray-100 border-b-[1px]">
                  <div
                    className={`flex flex-row justify-between items-center w-1.5/12 p-4 `}
                  >
                    <BiMove
                      fontSize={15}
                      className="mr-2 opacity-10 hover:text-cyan-400 hover:opacity-100"
                    />
                    <BsFillCaretLeftFill
                      fontSize={15}
                      className="mr-2 opacity-10 hover:text-cyan-400 hover:opacity-100"
                    />
                    <BsFillCaretRightFill
                      fontSize={15}
                      className="mr-2 opacity-10 hover:text-cyan-400 hover:opacity-100"
                    />
                    <ImBin
                      fontSize={15}
                      className="mr-2 opacity-10 hover:text-cyan-400 hover:opacity-100"
                    />
                  </div>
                  <div className="bg-gray-500 w-7 h-9 mx-12 opacity-10 border-gray-100 border-1" />
                  <div className=" h-8 ">
                    <textarea
                      onChange={(e) =>
                        setInput({ value: e.target.value, id: 0, dent: 0 })
                      }
                      value={input?.value}
                      placeholder="Type the task"
                      className={`overflow-hidden h-full flex justify-center items-center outline-none font-bold mt-1.5 text-[14px] text-cyan-400 text- w-806 bg-inherit resize-none border-none`}
                    ></textarea>
                  </div>
                </div>
                
              </div>
            )}
          </Droppable>
          <div className="p-2 flex flex-col justify-center items-center w-full mt-3">
            <button
              onClick={addTodo}
              className="bg-sky-600 w-full h-9 rounded-md text-white flex justify-center items-center text-[15px]"
            >
              <AiOutlinePlusCircle fontSize={15} className="mr-1" />
              Add a Standard
            </button>
            <div className="flex w-full flex-row justify-between items-start mt-4">
                <button onClick={handleDownload} className="w-1/2 bg-green-300 mr-1 h-7 font-normal font-md rounded-md text-white">
                      Download(JSON)
                </button>
                <input onChange={handleFile} className="w-1/2 bg-yellow-400 h-7 ml-1  font-normal font-md rounded-md text-white " type="file" placeholder="Upload(JSON)"/>
                      
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
