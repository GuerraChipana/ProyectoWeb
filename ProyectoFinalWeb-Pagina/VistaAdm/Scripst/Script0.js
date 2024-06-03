function TogglePasswordVisibility() {
    const passwordInput = document.getElementById('pw');
    TogglePasswordType(passwordInput);
    ToggleIcon();
}

function TogglePasswordType(inputElement) {
    const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
    inputElement.setAttribute('type', type);
}


document.addEventListener('DOMContentLoaded', function() {
    // No es necesario agregar el event listener aquí, ya que se llama directamente desde el HTML
});