document.addEventListener('DOMContentLoaded', function(){
   
    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionando elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputCC = document.querySelector('#cc')
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    
    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputCC.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario();
        eliminarAlertas();
    })

    // Funciones
    function validar(e) {
        if(e.target.value.trim() === '' && e.target.id !== "cc"){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return; // Detener ejecución del código
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido',  e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'cc'){ // CC debe contener algo
            if(e.target.value !== '' && !validarEmail(e.target.value)){
                mostrarAlerta('El destinatario agregado no es valido',  e.target.parentElement);
                email[e.target.name] = e.target.value.trim().toLowerCase();
                comprobarEmail();
                return;
            } 
            e.target.value.trim()
        }

        limpiarAlerta(e.target.parentElement);
        // Asignar valores al objeto email
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        // Comprobar el objeto de email
        comprobarEmail();
    }

    function enviarEmail(e) {
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //Alerta de envío del formulario
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 1200);
    }

    function mostrarAlerta(mensaje, referencia) {
        // Comprobar si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }

        // Generar alerta en HTML
        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado;    
    }
    
    function comprobarEmail() {
        if(email['email'] === '' || email['asunto'] === '' || email['mensaje'] === '' || email['cc'] !== '' && !validarEmail(email['cc'])){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        // Reiniciar el objeto
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';

        console.log(email);

        formulario.reset();
        comprobarEmail();
    }

    function eliminarAlertas() {
        const alertas = formulario.querySelectorAll('.bg-red-600');
        alertas.forEach(alerta => {
            alerta.remove();
        });
    }

});