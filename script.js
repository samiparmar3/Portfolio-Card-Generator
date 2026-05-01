let generated = "";
let uploadedImage = "";

document.getElementById("fileInput").addEventListener("change", function (e) {
    let file = e.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function (event) {
        uploadedImage = event.target.result;
        document.getElementById("pimg").src = uploadedImage;
    };
    reader.readAsDataURL(file);
});

document.querySelectorAll(".tab").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    }
});

function generate() {
    let name = document.getElementById("name").value || "Your Name";
    let role = document.getElementById("role").value || "Your Role";
    let imageURL = document.getElementById("image").value;

    let color = document.getElementById("color").value;
    let shadow = document.getElementById("shadow").value;
    let radius = document.getElementById("radius").value;
    let scale = document.getElementById("scale").value;

    let finalImage = uploadedImage || imageURL || "https://via.placeholder.com/120";

    document.getElementById("pname").innerText = name;
    document.getElementById("prole").innerText = role;
    document.getElementById("pimg").src = finalImage;

    let card = document.getElementById("card");
    card.style.borderRadius = radius + "px";
    card.style.boxShadow = `0 20px 40px ${shadow}`;

    card.onmouseover = () => card.style.transform = `translateY(-10px) scale(${scale})`;
    card.onmouseout = () => card.style.transform = "";

    document.getElementById("plink").style.background = color;

    let html = `
<div class="card">
<div class="img-box">
<img src="${finalImage}">
</div>
<h3>${name}</h3>
<p>${role}</p>
<a href="#">Follow</a>
</div>
`;

    let css = `
.card{
width:260px;
padding:20px;
border-radius:${radius}px;
background:white;
text-align:center;
box-shadow:0 20px 40px ${shadow};
}
.img-box{
width:130px;
height:130px;
margin:auto;
border-radius:50%;
overflow:hidden;
}
.img-box img{
width:100%;
height:100%;
object-fit:cover;
border-radius:50%;
}
.card a{
background:${color};
padding:8px 14px;
color:white;
border-radius:6px;
text-decoration:none;
}
`;

    generated = `<style>${css}</style>\n${html}`;
    document.getElementById("codeBox").innerText = generated;
}

function copyCode() {
    if (!generated) return;

    navigator.clipboard.writeText(generated);

    let t = document.getElementById("toast");
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1500);
}

function resetAll() {
    document.querySelectorAll("input").forEach(i => i.value = "");
    uploadedImage = "";
    generate();
}