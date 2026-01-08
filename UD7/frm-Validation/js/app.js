"use strict";

const ValidarFormulario = (() => {
  const init = () => {
    document.addEventListener("DOMContentLoaded", () => {
      validarFormulario();
    })
  }
  const validarFormulario = () => {
    const validar = new JustValidate("#formRegistro", {
      errorFieldCssClass: 'is-invalid', //es la clase que se añade al campo que tiene error
      errorLabelCssClass: 'invalid-feedback', //Es la clase que se asigna al mensaje de error que aparece debajo del input
      focusInvalidField: true, //si un campo no pasa la validación, esta opción hace que el cursor se coloque en el primer campo inválido
      validateBeforeSubmitting: true //hace que la validación ocurra antes de enviar el formulario
    });

    validar
      // Nombre
      .addField('#nombre', [
        { rule: 'required', errorMessage: 'El nombre es obligatorio' },
        { rule: 'minLength', value: 3, errorMessage: 'Mínimo 3 caracteres' },
        { rule: 'maxLength', value: 50, errorMessage: 'Máximo 50 caracteres' },
        { rule: 'customRegexp', value: /^[a-zA-Zá-úÁ-Ú\s]+$/, errorMessage: 'Solo letras y espacios' }
      ])
      // Email
      .addField('#email', [
        { rule: 'required', errorMessage: 'El email es obligatorio' },
        { rule: 'email', errorMessage: 'Introduce un email válido' }
      ])
      //rol
      .addField('#rol', [
        {
          rule: 'required',
          errorMessage: 'Debe seleccionar un rol'
        }
      ])

      //Intereses
      //Intereses - Validación manual
      .addField('#error-intereses', [
        {
          rule: 'custom',
          validator: () => {
            const checked = document.querySelectorAll('[name="intereses"]:checked').length;
            return checked >= 1 && checked <= 2;
          },
          errorMessage: 'Debe seleccionar entre 1 y 2 intereses'
        }
      ])

      // Password
      .addField('#password', [
        { rule: 'required', errorMessage: 'La contraseña es obligatoria' },
        { rule: 'minLength', value: 8, errorMessage: 'Mínimo 8 caracteres' },
        {
          rule: 'custom', //regla personalizada
          validator: (value) => { //value es el valor del input
            // Al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (_!@#$ etc.)
            return /[A-Z]/.test(value) &&
              /[a-z]/.test(value) &&
              /[0-9]/.test(value) &&
              /[\W_]/.test(value); // aquí incluimos el guion bajo _. \W cualquier caracter que no sea letra ni número ni guión bajo
          },
          errorMessage: 'Debe incluir mayúsculas, minúsculas, números y símbolos'
        }
      ])

      .addField('#confirmPassword', [
        { rule: 'required', errorMessage: 'Debe confirmar la contraseña' },
        {
          rule: 'custom', //regla personalizada
          validator: (value, fields) => value === fields['#password'].elem.value, //fields es un objeto que contiene todos los campos validados hasta ahora
          errorMessage: 'Las contraseñas no coinciden'
        }
      ])

      // Submit
      .onValidate(() => {
        // Activar botón solo si todos los campos son válidos
        // const valido = validar.isValid;
        // btnEnviar.disabled = !valido;




      })
      .onSuccess(e => {
        e.preventDefault();
        document.querySelector('#mensajeExito').classList.remove('d-none');
        //ajax
      })

    // Agregar listener change  a los checkboxes DESPUÉS de crear el validador
    document.querySelectorAll('[name="intereses"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        validar.revalidateField('#error-intereses');
      });
    });

  }

  return { init }

})()

ValidarFormulario.init();