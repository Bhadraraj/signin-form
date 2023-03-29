class FormValidation {
    formValues = {
        username: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmpassword: "",
    }
    errorValues = {
        usernameErr: "",
        emailErr: "",
        phonenumberErr: "",
        passwordErr: "",
        confirmpasswordErr: "",

    }
    showErrorMsg(index, msg) {
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.add('error')
        form_group.getElementsByTagName('small')[0].textContent = msg
    }
    showSuccessMsg(index) {
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.remove('error')
        form_group.classList.add('success')
    }
    getInputs() {
        this.formValues.username = document.getElementById('username').value.trim()
        this.formValues.email = document.getElementById('email').value.trim()
        this.formValues.phonenumber = document.getElementById('phonenumber').value.trim()
        this.formValues.password = document.getElementById('password').value.trim()
        this.formValues.confirmpassword = document.getElementById('confirmpassword').value.trim()
    }
    validateUsername() {
        if (this.formValues.username === "") {
            this.errorValues.usernameErr = "User name  is required"
            this.showErrorMsg(0, this.errorValues.usernameErr)
        } else if (this.formValues.username.length < 3) {
            this.errorValues.usernameErr = "Username must be atleast 3 Characters"
            this.showErrorMsg(0, this.errorValues.usernameErr)
        }
        else {
            this.errorValues.usernameErr = ""
            this.showSuccessMsg(0)
        }
    }
    validateEmail() {
        const regExp = /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/
        if (this.formValues.email === "") {
            this.errorValues.emailErr = "Email  is required"
            this.showErrorMsg(1, this.errorValues.emailErr)
        } else if (!(regExp.test(this.formValues.email))) {
            this.errorValues.emailErr = "Please enter valid email"
            this.showErrorMsg(1, this.errorValues.emailErr)
        } else {
            this.errorValues.emailErr = ""
            this.showSuccessMsg(1)
        }
    }
    validatePhonenumber() {
        const phoneno = /^\d{10}$/
        if (this.formValues.phonenumber === "") {
            this.errorValues.phonenumberErr = "phone number is required"
            this.showErrorMsg(2, this.errorValues.phonenumberErr)
        } else if (phoneno.test(this.formValues.phonenumber)) {
            this.errorValues.phonenumberErr = ""
            this.showSuccessMsg(2)
        } else {
            this.errorValues.phonenumberErr = "Please enter valid phone number"
            this.showErrorMsg(2, this.errorValues.phonenumberErr)
        }
    }
    validatePassword() {
        const passwordStrength=/^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^&\*]{8,}$/

        if (this.formValues.password === "") {
            this.errorValues.passwordErr = "Password is required"
            this.showErrorMsg(3, this.errorValues.passwordErr)
        } else if (!(passwordStrength.test(this.formValues.password))) {
            this.errorValues.passwordErr = " Password must be min 8 characters,1 lowercase,1 uppercase,1 numeric,1 special character"
            this.showErrorMsg(3, this.errorValues.passwordErr)
        } 
        else if (this.formValues.password.length > 10) {
            this.errorValues.passwordErr = "Password should not exceeds 10 Characters"
            this.showErrorMsg(3, this.errorValues.passwordErr)
        } else {
            this.errorValues.passwordErr = ""
            this.showSuccessMsg(3)
        }
    }
    validateConfirmpassword() {
        if (this.formValues.confirmpassword === "") {
            this.errorValues.confirmpasswordErr = "Confirm password is required"
            this.showErrorMsg(4, this.errorValues.confirmpasswordErr)
        } else if (this.formValues.confirmpassword === this.formValues.password && this.errorValues.passwordErr === "") {
            this.errorValues.confirmpasswordErr = ""
            this.showSuccessMsg(4)
        }

         else {
            this.errorValues.confirmpasswordErr = "Confirm password should match password"
            this.showErrorMsg(4, this.errorValues.confirmpasswordErr)
        }
    }

    alertMessage() {
        const { usernameErr, emailErr, phonenumberErr, passwordErr, confirmpasswordErr } = this.errorValues
        if (usernameErr === "" && emailErr === "" && phonenumberErr === "" && passwordErr === "" && confirmpasswordErr === "") {
            swal("Registration Successful", "ThankYou , " + this.formValues.username, "success").then(() => {
                console.log(this.formValues)
                this.removeInputs()
            })
        }
    }

    removeInputs() {
        const form_groups = document.getElementsByClassName('form-group')
        Array.from(form_groups).forEach(element => {
            element.getElementsByTagName('input')[0].value = ""
            element.getElementsByTagName('small')[0].textContent = ""
            element.classList.remove('success')
        })
    }

}

const ValidateUserInputs = new FormValidation()
document.getElementsByClassName('form')[0].addEventListener('submit', event => {
    event.preventDefault()
    ValidateUserInputs.getInputs()
    ValidateUserInputs.validateUsername()
    ValidateUserInputs.validateEmail()
    ValidateUserInputs.validatePhonenumber()
    ValidateUserInputs.validatePassword()
    ValidateUserInputs.validateConfirmpassword()
    ValidateUserInputs.alertMessage()
})
