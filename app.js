const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const reset = document.getElementById("jsReset");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const EVENT_CLICK = "click";
const HIDDEN_CLASSNAME = "hidden";

// 캔버스 사이즈
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = "";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
	painting = true;
}

function stopPainting() {
	painting = false;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;

	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

// 색을 클릭하면 해당 색상으로 변경.('paint', 'fill' mode 둘 다)
function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handleModeClick(event) {
	if (filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "PAINT";
	}
}

function handleCanvasClick(event) {
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

function resetBtn(event) {
	window.location.reload();
}

function handleCM(event) {
	event.preventDefault();
	alert("DO NOT USE RIGHT CLICK!!!");
}

function handleSaveClick(event) {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJs[Export]";
	link.click();
}

const btn = document.getElementById("darkBtn");
const body = document.querySelector("body");
const CLASS_DARKBTN = "jsDarkBtn";
const CLASS_LIGHTBTN = "jsLightBtn";
const CLASS_DARKBODY = "jsDarkBody";
const CLASS_LIGHTBODY = "jsLightBody";

function handleDarkBtn(event) {
	btn.classList.remove(CLASS_DARKBTN);
	btn.classList.add(CLASS_LIGHTBTN);
	body.classList.remove(CLASS_LIGHTBODY);
	body.classList.add(CLASS_DARKBODY);
	btn.innerText = "🔆";
}

function handleLightBtn(event) {
	btn.classList.remove(CLASS_LIGHTBTN);
	btn.classList.add(CLASS_DARKBTN);
	body.classList.remove(CLASS_DARKBODY);
	body.classList.add(CLASS_LIGHTBODY);
	btn.innerText = "🌙";
}

if (btn.className === "jsDarkBtn") {
	btn.addEventListener(EVENT_CLICK, handleDarkBtn);
} else {
	btn.addEventListener(EVENT_CLICK, handleLightBtn);
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener(EVENT_CLICK, handleCanvasClick);
	canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
	color.addEventListener(EVENT_CLICK, handleColorClick)
);

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener(EVENT_CLICK, handleModeClick);
}

if (reset) {
	reset.addEventListener(EVENT_CLICK, resetBtn);
}

if (saveBtn) {
	saveBtn.addEventListener(EVENT_CLICK, handleSaveClick);
}
