
const age = document.getElementById("age");
const sex = document.getElementById("sex");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const waist = document.getElementById("waist");
const btn = document.getElementById("calculate-btn");
const result = document.getElementById("result");
const fatElem = document.getElementById("fat-percent");
const fatErr = document.getElementById("fat-error");
const category = document.getElementById("category");
const feedback = document.getElementById("feedback");

btn.addEventListener("click", () => {
  const A = parseFloat(age.value);
  const H = parseFloat(height.value);
  const W = parseFloat(weight.value);
  const C = parseFloat(waist.value);
  const S = sex.value;

  if (!A || !H || !W || !C) {
    alert("Preencha todos os campos.");
    return;
  }

  // Fórmula Navy (simplificada)
  let fat = 0;
  if (S === "M") {
    fat = 495 / (1.0324 - 0.19077 * Math.log10(C - (W / 2.54)) + 0.15456 * Math.log10(H * 0.3937)) - 450;
  } else {
    fat = 495 / (1.29579 - 0.35004 * Math.log10(C + (W / 2.54)) + 0.22100 * Math.log10(H * 0.3937)) - 450;
  }
  fat = fat.toFixed(1);

  // Simulação de erro
  const err = (Math.random() * 1 + 0.5).toFixed(1);

  fatElem.textContent = fat;
  fatErr.textContent = err;

  const cat = fat < 15 ? "Baixo" : fat < 25 ? "Normal" : fat < 32 ? "Alto" : "Muito Alto";
  category.textContent = cat;

  feedback.innerHTML = `
    <p><strong>Dicas:</strong></p>
    <ul>
      <li>Entrar com medidas precisas e reais.</li>
      <li>Lembrar que é uma simulação simplificada.</li>
      <li>Não substitui avaliação médica ou exames clínicos.</li>
    </ul>
  `;
  result.classList.remove("hidden");
});
