const logoUpload = document.getElementById("logoUpload");
const logoPreview = document.getElementById("logoPreview");
const umbrellaContainer = document.getElementById("umbrellaContainer");
const previewPlaceholder = document.querySelector(".preview-placeholder");
const umbrellaImage = document.getElementById("umbrellaImage");
const loader = document.getElementById("loader");

let isDragging = false;
let offsetX, offsetY;

document.querySelectorAll(".color-swatch").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    const color = swatch.dataset.color;
    umbrellaImage.src = `./images/${color}umbrella.png`;
  });
});

logoUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  loader.style.display = "block";
  previewPlaceholder.style.display = "none";

  setTimeout(() => {
    const reader = new FileReader();
    reader.onload = function (event) {
      logoPreview.src = event.target.result;
      logoPreview.style.display = "block";
      previewPlaceholder.style.display = "none";

      logoPreview.style.position = "absolute";
      logoPreview.style.left = "50%";
      logoPreview.style.top = "50%";
      logoPreview.style.transform = "translate(-50%, -50%)";
      loader.style.display = "none";
    };
    reader.readAsDataURL(file);
  }, 1000);
});

logoPreview.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = logoPreview.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  logoPreview.style.transform = "none";

  e.preventDefault();

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
  if (!isDragging) return;

  const containerRect = umbrellaContainer.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  const maxX = containerRect.width - logoPreview.offsetWidth;
  const maxY = containerRect.height - logoPreview.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  logoPreview.style.left = `${x}px`;
  logoPreview.style.top = `${y}px`;
}

function onMouseUp() {
  isDragging = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}
