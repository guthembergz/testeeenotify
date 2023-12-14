  // DECLARAÇÃO DA VÁRIAVEL GLOBAL qrValue
  var qrValue; // Armazena o valor inserido pelo usuário.
  var qrCodeGenerated = false; // VÁRIAVEL PARA RASTREAR SE UM QR CODE FOI GERADO /  Indica se um QR code foi gerado ou não.


  const wrapper = document.querySelector(".wrapper"), //Representa o contêiner principal da página.
    qrInput = wrapper.querySelector(".form input"), // Representa a caixa de entrada de texto onde o usuário digita o valor.
    generateBtn = wrapper.querySelector(".form button"), // Representa o botão que aciona a geração do QR code.
    qrImg = wrapper.querySelector(".qr-code img"); // Representa a imagem do QR code exibida na página.
  let preValue;

  const dbtn = document.querySelector('.dbtn');
  const backH = document.querySelector('.backH');
  backH.style.visibility = "hidden";

  const fullPage = document.querySelector('.fullscreen');
  fullPage.style.visibility = "hidden";

  //Exibe IDs de mensagens
  let demo = document.getElementById("demo");
  demo.style.visibility = "hidden";
  let demo4 = document.getElementById("demo4");
  demo4.style.visibility = "hidden";
  let demo3 = document.getElementById("demo3");
  demo3.style.visibility = "hidden";

  // QUANDO PRESSIONO ENTER NO FORM INPUT, ELE ACIONARÁ (CLIQUE) O BOTÃO "GERAR CÓDIGO QR"
  var input = document.getElementById("text1");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("myBtn").click();
    }
  });

  // ADICIONAR OUVINTE DE CLIQUE AO BOTÃO DE GERAÇÃO DE QR CODE
  document.getElementById('myBtn').addEventListener('click', function () {
    var qrInput = document.getElementById('text1'); // Obter o valor da caixa de texto (qrInput.value)
    var generateBtn = document.getElementById('myBtn');
    var qrImg = document.querySelector('.qr-code img');

    qrValue = qrInput.value.trim();

    if (!qrValue || preValue === qrValue) return;

    generateBtn.onmouseover = function () {
      setTimeout(() => {
        demo3.style.visibility = 'visible';
      }, 10);
    }

    generateBtn.innerText = 'Gerando QR Code⌛...';
    generateBtn.style.cursor = 'no-drop';
    generateBtn.style.opacity = '0.7';

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

    qrImg.addEventListener('load', () => {
      wrapper.classList.add('active');
      wrapper.classList.add('expanding');
      generateBtn.innerText = 'QR Code Gerado';
      generateBtn.style.cursor = 'no-drop ';
      generateBtn.style.opacity = '0.7';
      

      document.querySelector('#text1').addEventListener('input', test);

      document.getElementById('theImage').style.visibility = 'hidden';
      document.getElementById('btn').style.visibility = 'hidden';
      document.getElementById('btn1').style.visibility = 'hidden';
      document.getElementById('demo').style.visibility = 'hidden';
      backH.style.visibility = 'visible';


      setTimeout(() => {
        wrapper.classList.remove('expanding');
      }, 500);

      generateBtn.onmouseover = function () {
        setTimeout(() => {
          demo1.style.visibility = 'visible';
        }, 150);
      }

      generateBtn.onmouseout = function () {
        setTimeout(() => {
          demo1.style.visibility = 'hidden';
        }, 150);
      };
      
      // HABILITAR OS BOTÕES DE DOWNLOAD QUANDO O QR CODE FOR GERADO
      document.querySelectorAll('.dbtn').forEach(btn => {
        btn.removeAttribute('disabled');
      });

      // ATUALIZAR A VARIÁVEL INDICANDO QUE UM QR CODE FOI GERADO
      qrCodeGenerated = true;
    });
  });

  // QUANDO O FORM INPUT NÃO CONTÉM NENHUM VALOR, ELE É MOSTRADO COMO ESTÁ ANTES DO QR CODE GERADO
  qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {

      sameprop();

    }
  });

  // VERIFICA SE A ENTRADA DO FORMULÁRIO TEM VALOR OU NÃO E EXIBE A MENSAGEM
  function inputtext() {
    var value1 = document.getElementById('text1').value;
    if (value1.length == 0) {
      demo.style.visibility = "visible";
      setTimeout(() => {
        demo.style.visibility = 'hidden';
      }, 1300);
    }
  }

  // DESATIVA O MODO DE DESENVOLVEDOR (DESATIVA O BOTÃO DIREITO, CÓDIGO DE TECLA 123, CTRL+SHIFT+I, CTRL+SHIFT+C, CTRL+SHIFT+J, CTRL+U)
  // document.onkeydown = function (e) {
  //   if (event.keyCode == 123) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
  //     return false;
  //   }
  // }

  // DESATIVA CLIQUE COM O BOTÃO DIREITO
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // BAIXE A IMAGEM DO CÓDIGO QR GERADA CLICANDO NO BOTÃO "DOWNLOAD"
  function downloadIg(elmnt) {

    dbtn.style.cursor = "no-drop";
    dbtn.style.opacity = "0.7";
    generateBtn.onmouseover = function () {
      setTimeout(() => {
        demo4.style.visibility = 'visible';
      }, 10);
    }


    const link = elmnt
    const url = qrImg.src
    const options = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    showNotification("Iniciando seu Download...⬇️", "demo3");


    fetch(url, options)
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = "QR_Code.jpg";
          a.click();
          dbtn.style.cursor = "pointer";
          dbtn.style.opacity = "1";

        });
      });
  }

  // VOLTAR ÀS PROPRIEDADES DO BOTÃO HOME
  function backHome() {
    sameprop();
  }

  // MESMAS PROPRIEDADES PARA DUAS FUNÇÕES
  function sameprop() {
    document.getElementById("text1").value = "";
    wrapper.classList.remove("active");
    preValue = "";
    generateBtn.innerText = "Gerar QR Code";

    generateBtn.onmouseover = function () {
      setTimeout(() => {
        demo1.style.visibility = 'hidden';
      }, 150);
    }

    document.getElementById("theImage").style.visibility = "visible";
    document.getElementById("btn").style.visibility = "visible";
    document.getElementById("btn1").style.visibility = "visible";
    backH.style.visibility = "hidden";
    generateBtn.style.opacity = "1";
  }

  function test(e) {
    generateBtn.style.opacity = "1";
    generateBtn.style.cursor = "pointer";
  }

  // FUNÇÃO PARA LIMPAR O CAMPO DE ENTRADA E OCULTAR O CONTEÚDO GERADO
  function clearInput() {
    var inputElement = document.getElementById('text1');
    inputElement.value = '';

    var wrapper = document.querySelector('.wrapper');
    wrapper.classList.remove('active');
    preValue = '';

    var generateBtn = document.getElementById('myBtn');
    generateBtn.innerText = 'Gerar QR Code';

    generateBtn.onmouseover = function () {
      setTimeout(() => {
        demo3.style.visibility = 'visible';
      }, 10);
    }


    var inputContainer = document.querySelector('.input-container');
    inputContainer.classList.remove('has-text');

    // RESETAR A VARIÁVEL INDICANDO QUE UM QR CODE FOI GERADO
    qrCodeGenerated = false;
  }

  // ADICIONAR OUVINTE DE ENTRADA AO CAMPO DE ENTRADA
  document.getElementById('text1').addEventListener('input', function () {
    var inputContainer = document.querySelector('.input-container');
    var generateBtn = document.getElementById('myBtn');

    // ATUALIZAR A CLASSE 'HAS-TEXT' COM BASE NO CONTEÚDO DO CAMPO
    inputContainer.classList.toggle('has-text', this.value.trim() !== '');

    // ATUALIZAR O TEXTO DO BOTÃO
    if (this.value.trim() !== '' && qrCodeGenerated) {
      generateBtn.innerText = 'Gerar novo QR Code';
    } else {
      generateBtn.innerText = 'Gerar QR Code';
    }


  });

  // Função para exibir a notificação
  function showNotification(message, targetId, duration = 2000) {
    var targetElement = document.getElementById(targetId);

    // Se o elemento não existir, cria-o dinamicamente
    if (!targetElement) {
      targetElement = document.createElement("p");
      targetElement.id = targetId;
      document.body.appendChild(targetElement);
    }

    targetElement.innerText = message;
    targetElement.style.display = "block";

    setTimeout(function () {
      if (targetElement) {
        targetElement.style.display = "none";
      }
    }, duration);
  }

  // ... (seu código anterior)

  // Função para gerar o QR Code
  function generateQRCode() {
    var qrInput = document.getElementById('text1');
    var qrValue = qrInput.value.trim();

    if (!qrValue) {
      showNotification("⚠️ Por favor, cole ou digite o link para continuar! ⚠️", "demo");
      return;
    }

    // // Verifica se um QR Code já foi gerado
    // if (qrCodeGenerated) {
    //   // Se um QR Code já foi gerado, exibir a mensagem de "QR Code já foi gerado"
    //   showNotification("⚠️ QR Code já foi gerado! ⚠️", "demo4");
    //   return;
    // }

    // Restante do seu

    // Exibir notificação de download
    showNotification("✅ QR Code gerado com sucesso!! ✅", "demo3");

    // Atualizar a variável indicando que um QR Code foi gerado
    qrCodeGenerated = true;
  }

  // ... (seu código anterior)

  // Exemplo de chamada da função ao clicar no botão
  document.getElementById('myBtn').addEventListener('click', generateQRCode);
