const StandartButton = (props) => {
  return (
    <div className="col-3 d-flex justify-content-center">
      <button id={props.id} type="button" className="w-100 p-1 m-1 btn btn-info rounded-pill" key={props.value} onClick={props.onClick}>
        {props.value}
      </button>
    </div>
  );
}

const WideButton = (props) => {
  return (
    <div className="col-6 d-flex justify-content-center">
      <button id={props.id} type="button" className="w-100 p-1 m-1 btn btn-primary rounded-pill" key={props.value} onClick={props.onClick}>
        {props.value}
      </button>
    </div>
  );
}

const App = () => {
  const [output, setOutput] = React.useState(["0"]);
  
  const getResult = (event) => {
    if (event.target.innerHTML === "AC") {
       setOutput(["0"]);
     } else if(event.target.innerHTML === "&lt;=") {
       setOutput((prevOutput) => 
         [...prevOutput.slice(0, prevOutput.length - 1)]
       );
     }
    if (output.length < 28) {
     if (event.target.innerHTML != "&lt;=" && event.target.innerHTML != "AC") {
      if(output.length <= 1) {
        if(event.target.innerHTML == "0") {
          setOutput(["0"]);
        } else if (event.target.innerHTML === "1" ||
        event.target.innerHTML === "2" ||
        event.target.innerHTML === "3" ||
        event.target.innerHTML === "4" ||
        event.target.innerHTML === "5" ||
        event.target.innerHTML === "6" ||
        event.target.innerHTML === "7" ||
        event.target.innerHTML === "8" ||
        event.target.innerHTML === "9") {
          setOutput([""]);
        }
      }
    
      if (event.target.innerHTML === "=" && 
      output[output.length - 1] != "/" && 
      output[output.length - 1] != "*" &&
      output[output.length - 1] != "+" &&
      output[output.length - 1] != "-") {
        setOutput((prevOutput) => {
          let resultOutput = prevOutput.slice(0, prevOutput.length);
          resultOutput = resultOutput.join("");
          resultOutput = resultOutput.replace(/--/g, " - - ");
          resultOutput = eval(resultOutput);
          resultOutput = Math.round(resultOutput * 100000) / 100000
          return [...prevOutput.slice(0, 0), resultOutput]
        });
      } else if(event.target.innerHTML === "1" ||
      event.target.innerHTML === "2" ||
      event.target.innerHTML === "3" ||
      event.target.innerHTML === "4" ||
      event.target.innerHTML === "5" ||
      event.target.innerHTML === "6" ||
      event.target.innerHTML === "7" ||
      event.target.innerHTML === "8" ||
      event.target.innerHTML === "9") {
        setOutput((prevOutput) => {
          return [ ...prevOutput, event.target.innerHTML];
        });
      } else if (event.target.innerHTML === "+" || 
      event.target.innerHTML === "*" || 
      event.target.innerHTML === "/") {
        if(output[output.length - 1] != "/" && 
        output[output.length - 1] != "*" &&
        output[output.length - 1] != "+" &&
        output[output.length - 1] != "-") {
         setOutput((prevOutput) => {
           return [ ...prevOutput, event.target.innerHTML];
         });
       } else if (output[output.length - 1] == "-" && 
       output[output.length - 2] == "-" ||
       output[output.length - 2] == "+" ||
       output[output.length - 2] == "*" ||
       output[output.length - 2] == "/") {
         setOutput((prevOutput) => {
           return [ ...prevOutput.slice(0, prevOutput.length - 2), event.target.innerHTML];
         });
       } else if (output[output.length - 1] == "/" || 
       output[output.length - 1] == "*" ||
       output[output.length - 1] == "+" ||
       output[output.length - 1] == "-") {
         setOutput((prevOutput) => {
           return [ ...prevOutput.slice(0, prevOutput.length - 1), event.target.innerHTML];
         });
       }
     } else if(event.target.innerHTML == "-") {
      if(output.indexOf("-") == -1) {
        setOutput((prevOutput) => {
          return [ ...prevOutput, event.target.innerHTML];
        });
      } else if(output[output.length - 1] == "-" && 
      output[output.length - 2] != "-" &&
      output[output.length - 2] != "+" &&
      output[output.length - 2] != "*" &&
      output[output.length - 2] != "/") {
        setOutput((prevOutput) => {
          return [ ...prevOutput, event.target.innerHTML];
        });
      } else if(output[output.length - 1] != "-") {
        setOutput((prevOutput) => {
          return [ ...prevOutput, event.target.innerHTML];
        });
      }
    } else if(event.target.innerHTML === "0" && 
    output.length > 1) {
      setOutput((prevOutput) => {
        return [ ...prevOutput, event.target.innerHTML];
      });
    } else if(output[output.length - 1] != "/" && 
    output[output.length - 1] != "*" &&
    output[output.length - 1] != "+" &&
    output[output.length - 1] != "-" &&
    output.length > 0) {
      if(event.target.innerHTML === "." && 
      output.indexOf(".") === -1) {
        setOutput((prevOutput) => {
          return [ ...prevOutput, event.target.innerHTML];
        });
      } else if(output.indexOf(".") > 0 && 
      output.lastIndexOf(".") < output.lastIndexOf("+") ||
      output.lastIndexOf(".") < output.lastIndexOf("-") || 
      output.lastIndexOf(".") < output.lastIndexOf("*") || 
      output.lastIndexOf(".") < output.lastIndexOf("/")) {
        setOutput((prevOutput) => {
          return [ ...prevOutput, event.target.innerHTML];
        });
     }
    }
   }
  }
 }
  
  return (
    <div className="card border border-dark shadow-lg bg-secondary p-2 d-flex justify-content-center align-items-center">
      <div id="display" className="w-75 bg-dark text-bg-dark rounded p-1 m-1 bg-light">
        <div>
          {output}
        </div>
      </div>
      <div className="keyboard p-1 row d-flex justify-content-center">
        {buttons.map((button, index) => {
          return (
            <>
            {button.type === "wide" ?
            <WideButton id={button.id} value={button.value} onClick={getResult}/> : 
            <StandartButton id={button.id} value={button.value} onClick={getResult}/>}
            </>
          );
          })
        }
      </div>
    </div>
  )
}

const buttons = [
  {id: "clear", value: "AC", type: "standart"},
  {id: "divide", value: "/", type: "standart"},
  {id: "multiply", value: "*", type: "standart"},
  {id: "subtract", value: "-", type: "standart"},
  {id: "seven", value: "7", type: "standart"},
  {id: "eight", value: "8", type: "standart"},
  {id: "nine", value: "9", type: "standart"},
  {id: "add", value: "+", type: "standart"},
  {id: "four", value: "4", type: "standart"},
  {id: "five", value: "5", type: "standart"},
  {id: "six", value: "6", type: "standart"},
  {id: "decimal", value: ".", type: "standart"},
  {id: "one", value: "1", type: "standart"},
  {id: "two", value: "2", type: "standart"},
  {id: "three", value: "3", type: "standart"},
  {id: "zero", value: "0", type: "standart"},
  {id: "delete", value: "<=", type: "wide"},
  {id: "equals", value: "=", type: "wide"}
]

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
