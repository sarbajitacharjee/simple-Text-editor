var undoStack = [];
        var redoStack = [];

        function saveText() {
            var textToSave = document.getElementById('editor').value;
            var blob = new Blob([textToSave], { type: 'text/plain' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'text.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        function applyStyles() {
            const editor = document.getElementById('editor');
            const fontFamily = document.getElementById('font-family').value;
            const fontSize = document.getElementById('font-size').value + 'px';
            const fontColor = document.getElementById('font-color').value;

            
            undoStack.push(editor.value);
            redoStack = [];

            editor.style.fontFamily = fontFamily;
            editor.style.fontSize = fontSize;
            editor.style.color = fontColor;
        }

        function addNewText() {
            const editor = document.getElementById('editor');
            const newText = '  \nNew Text Here'; 

            undoStack.push(editor.value);
            redoStack = [];

            editor.value += newText;
        }

        function undo() {
            const editor = document.getElementById('editor');
            if (undoStack.length > 1) {
                redoStack.push(undoStack.pop());
                editor.value = undoStack[undoStack.length - 1];
            }
        }

        function redo() {
            const editor = document.getElementById('editor');
            if (redoStack.length > 0) {
                undoStack.push(redoStack.pop());
                editor.value = undoStack[undoStack.length - 1];
            }
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.textContent);
        }

        document.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        document.addEventListener("drop", function (event) {
            event.preventDefault();
            const editor = document.getElementById('editor');
            const draggedText = event.dataTransfer.getData("text");

            undoStack.push(editor.value);
            redoStack = [];

            editor.value += draggedText;
        });