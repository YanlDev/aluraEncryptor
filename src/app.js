const textArea = document.getElementById('text-area');
const btnEncryptor = document.getElementById('btn-encryptor');
const btnDecryptor = document.getElementById('btn-decryptor');
const resultArea = document.getElementById('result-area');
const btnCopy = document.getElementById('btn-copy');
const hideDiv = document.getElementById('hide');
const header = document.getElementById('header')


// encrypt
btnEncryptor.addEventListener('click',(e)=>{
  e.preventDefault();
  const textValue = textArea.value.toLowerCase().trim();
  let textEncrypted = encrytor(textValue);
  printResults(textEncrypted);
  textArea.value = '';
  window.location.href = `#${btnCopy.id}`
});

// copy text
btnCopy.addEventListener('click',(e)=>{
  e.preventDefault();
  let textToCopy = resultArea.value;
  navigator.clipboard.writeText(textToCopy)
  .then(()=>{
    console.log('Text copied to clipboard')
  })
  .catch(err => {
    console.error('Error in copying text: ', err);
  });
  resultArea.textContent = '';
  toggleHideDiv();
  window.location.href = `#${header.id}`;
});

// decrypt
btnDecryptor.addEventListener('click',(e)=>{
  e.preventDefault();
  const textValue = textArea.value;
  let textDecrypted = decryptor(textValue);
  printResults(textDecrypted);
  textArea.value = '';
  window.location.href = `#${btnCopy.id}`
});

const Dictionary = new Map([
  ['a', 'ai'],
  ['e', 'enter'],
  ['i', 'imes'],
  ['o', 'ober'],
  ['u', 'fat']
]);

function encrytor(str){
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (Dictionary.has(char)) {
      result += Dictionary.get(char);
    } else {
      result += char;
    }
  }
  return result;

}

function decryptor(str) {
  const inverseDictionary = new Map([...Dictionary.entries()].map(([k, v]) => [v, k]));
  let result = '';
  let i = 0;
  while (i < str.length) {
    let found = false;
    for (const [k, v] of Dictionary) {
      if (str.startsWith(v, i)) {
        result += k;
        i += v.length;
        found = true;
        break;
      }
    }
    if (!found) {
      result += str.charAt(i);
      i++;
    }
  }
  return result;
}


function printResults(params) {
  resultArea.textContent = params
  toggleHideDiv();
}

function toggleHideDiv() {
  if (resultArea.textContent === '') {
    hideDiv.style.display = 'block'; // Mostrar el div si no hay contenido en el área de resultados
  } else {
    hideDiv.style.display = 'none'; // Ocultar el div si hay contenido en el área de resultados
  }
}
