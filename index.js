document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('main');
    const ctx = canvas.getContext('2d');
    let painting = false;
    let brushColor = 'black'; // Default color
    let brushSize = 5; // Default size

    // Update brush size display and value
    const brushSizeDisplay = document.getElementById('brushSize');
    const slider = document.getElementById('slider');
    brushSizeDisplay.textContent = slider.value;

    slider.oninput = function() {
        brushSize = this.value;
        brushSizeDisplay.textContent = this.value;
    }

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath(); // This prevents dragging drawing.
    }

    function draw(e) {
        if (!painting) return;
    
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
    
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;
    
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
    }
    


    // EventListeners for drawing
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    // Change color
    const colors = document.querySelectorAll('.btn-action');
    colors.forEach(color => {
        color.addEventListener('click', function() {
            brushColor = this.id;
        });
    });

    // Eraser
    document.getElementById('erase').addEventListener('click', function() {
        brushColor = 'white'; // Assuming the canvas background is white
    });

    // Clear canvas
    document.getElementById('new').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
