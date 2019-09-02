// location: deanstein.github.io/JsonToHtml/index.html

var scriptVersion = "1.0.0";

var jsonInputOutputFlexContainerDiv = {};
var jsonResults = {};

/****** HTML instructions ******/

// define how to draw the header div that will always be displayed
function drawHeaderContainerDiv()
{
    // define the welcome message div
    var titleDiv = document.createElement("div");
    titleDiv.innerHTML = "JSON to HTML"
    titleDiv.className = "title";
    document.body.appendChild(titleDiv);

    var versionDiv = document.createElement("div");
    versionDiv.className = "version";
    var headerText = document.createTextNode("v" + scriptVersion);
    versionDiv.appendChild(headerText);
    document.body.appendChild(versionDiv);
}

// define how to draw the input and output flex container div
function drawJsonInputOutputFlexContainerDiv()
{
    jsonInputOutputFlexContainerDiv = document.createElement("div");
    jsonInputOutputFlexContainerDiv.className = "jsonInputOutputFlexContainer";
    document.body.appendChild(jsonInputOutputFlexContainerDiv);
}

// define how to draw the copy button flex container
function drawCopyToClipboardButtonFlexContainer()
{
    var copyToClipboardButtonFlexContainerDiv = document.createElement("div");
    copyToClipboardButtonFlexContainerDiv.className = "copyToClipboardButtonFlexContainer";
    document.body.appendChild(copyToClipboardButtonFlexContainerDiv);
    return copyToClipboardButtonFlexContainerDiv;
}

// define how to update the results div with the updated input
function updateInnerHTML(divID, string)
{
    document.getElementById(divID).innerHTML = string;
}

// define how to test if the string is a json
function isJson(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

// define how to convert from a JSON object to formatted HTML
function convertJsonPropertyToDiv(jsonData, containerDiv)
{
    jsonData = JSON.parse(jsonData);
    console.log(Object.keys(jsonData).length);

    // create some html for each item in the object
    for (var key in jsonData) 
    {
        var jsonKeyUl = document.createElement("ul");
        containerDiv.appendChild(jsonKeyUl);
        
        var jsonKeyLi = document.createElement("li");
        jsonKeyLi.innerHTML = key + " (" + jsonData[key].length + ")";
        //console.log("This is the stringified JSON data: " + JSON.stringify(Object.keys(JSON.parse(jsonData[i]))));
        jsonKeyUl.appendChild(jsonKeyLi);

        if (Array.isArray(jsonData[key]))
        {
            var jsonPropertyUl = document.createElement("ul");
            jsonKeyUl.appendChild(jsonPropertyUl);

            for (var i = 0; i < jsonData[key].length; i++)
            {
                var jsonPropertyLi = document.createElement("li");
                jsonPropertyLi.innerHTML = "- " + jsonData[key][i];
                //console.log("This is the stringified JSON data: " + JSON.stringify(Object.keys(JSON.parse(jsonData[i]))));
                jsonPropertyUl.appendChild(jsonPropertyLi);
            }

            var spacerDiv = document.createElement("br");
            jsonPropertyUl.appendChild(spacerDiv);
        }
    }
}

// define how to draw the JSON input container
function drawJsonInputContainerDiv(containerDiv)
{
    // define the container div and append it to the overall container
    var jsonInputContainerDiv = document.createElement("div");
    containerDiv.appendChild(jsonInputContainerDiv);
    jsonInputContainerDiv.className = "jsonInputContainer";

    // create and append the JSON input text box
    drawTypicalTextboxAndLabel(jsonInputContainerDiv, "jsonInputContainerDiv", "", "Paste JSON contents...");

    // define the onkeyup behavior
    document.getElementById("jsonInputContainerDiv").onkeyup = function()
    {
        updateInnerHTML("jsonInputContainerDiv", jsonResults);
        if (isJson(this.value))
        {
            updateInnerHTML("jsonOutput", "");
            convertJsonPropertyToDiv(this.value, document.getElementById("jsonOutput"));
        }
        else
        {
            updateInnerHTML("jsonOutput", "This JSON isn't valid!");
        }
    }
}

// define how to draw the JSON output container
function drawJsonOutputContainerDiv(containerDiv)
{
    // define the container div and append it to the overall container
    var jsonOutputContainerDiv = document.createElement("div");
    containerDiv.appendChild(jsonOutputContainerDiv);
    jsonOutputContainerDiv.className = "jsonOutputContainer";

    var jsonOutputDiv = document.createElement("div");
    jsonOutputDiv.innerHTML = "Formatted JSON will appear here...";
    jsonOutputDiv.id = "jsonOutput";
    jsonOutputDiv.className = "jsonOutput";
    jsonOutputContainerDiv.appendChild(jsonOutputDiv);
}

/*** typical divs ***/

// define how to draw the typical form text input divs
function drawTypicalTextboxAndLabel(containerDiv, inputName, inputLabel, defaultString)
{
    // define a container to will hold all elements
    var formElementContainer = document.createElement("div");
    formElementContainer.className = "formElementContainer";
    // define the input text box
    var formInput = document.createElement("textarea");
    formInput.cols = 1;
    formInput.rows = 100;
    formInput.name = inputName;
    formInput.id = inputName; 
    formInput.className = "formInput";
    if (defaultString)
    {
        formInput.placeholder = defaultString;
    }
    // define the text box label
    var formInputLabel = document.createElement("label");
    formInputLabel.className = "formInputLabel";
    formInputLabel.innerHTML = inputLabel;

    // append the input textbox and label to the formElementContainer
    formElementContainer.appendChild(formInputLabel);
    formElementContainer.appendChild(formInput);

    // append the finished product to the container div
    containerDiv.appendChild(formElementContainer);
}

// define how to draw the copy to clipboard button
function drawCopyToClipboardButton(containerDiv)
{
    new ClipboardJS('.button');
    var target = ".jsonOutput";
    //console.log ("copy button target: " + target);
    var copyToClipboardButton = document.createElement("button");
    copyToClipboardButton.innerHTML = "Copy to Clipboard";
    copyToClipboardButton.className = "button";
    copyToClipboardButton.setAttribute("data-clipboard-target", target);
    copyToClipboardButton.id = "copyToClipboardButton";
    containerDiv.appendChild(copyToClipboardButton);
}

// execute
drawHeaderContainerDiv();

drawJsonInputOutputFlexContainerDiv();
drawJsonInputContainerDiv(jsonInputOutputFlexContainerDiv);
drawJsonOutputContainerDiv(jsonInputOutputFlexContainerDiv, jsonResults);

drawCopyToClipboardButton(drawCopyToClipboardButtonFlexContainer());