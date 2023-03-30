class FormValidation {
    formValues = {
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: "",
        genderM: "",
        genderF: "",
        city: "",
        agree: ""
    }
    errorValues = {
        firstnameErr: "",
        lastnameErr: "",
        emailErr: "",
        phonenumberErr: "",
        passwordErr: "",
        genderErr: "",
        cityErr: "",
        agreeErr: ""

    }
    showErrorMsg(index, msg) {
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.add('error')
        form_group.getElementsByTagName('small')[0].textContent = msg
    }
    showSuccessMsg(index) {
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.remove('error')

    }
    getInputs() {
        this.formValues.firstname = document.getElementById('firstname').value.trim()
        this.formValues.lastname = document.getElementById('lastname').value.trim()
        this.formValues.email = document.getElementById('email').value.trim()
        this.formValues.phonenumber = document.getElementById('phonenumber').value.trim()
        this.formValues.password = document.getElementById('password').value.trim()
        this.formValues.genderM = document.getElementById('genderM')
        this.formValues.genderF = document.getElementById('genderF')
        this.formValues.city = document.getElementById('city').value
        this.formValues.agree = document.getElementById('agree')

    }
    validateFirstName() {
        if (this.formValues.firstname === "") {
            this.errorValues.firstnameErr = "User name  is required"
            this.showErrorMsg(0, this.errorValues.firstnameErr)
        } else if (this.formValues.firstname.length < 3) {
            this.errorValues.firstnameErr = "First name must be atleast 3 Characters"
            this.showErrorMsg(0, this.errorValues.firstnameErr)
        }
        else {
            this.errorValues.firstnameErr = ""
            this.showSuccessMsg(0)
        }
    }
    validateLastName() {
        if (this.formValues.lastname === "") {
            this.errorValues.lastnameErr = "last name  is required"
            this.showErrorMsg(1, this.errorValues.lastnameErr)
        }
        else {
            this.errorValues.lastnameErr = ""
            this.showSuccessMsg(1);
        }
    }
    validateEmail() {
        const regExp = /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/
        if (this.formValues.email === "") {
            this.errorValues.emailErr = "Email  is required"
            this.showErrorMsg(2, this.errorValues.emailErr)
        } else if (!(regExp.test(this.formValues.email))) {
            this.errorValues.emailErr = "Please enter valid email"
            this.showErrorMsg(2, this.errorValues.emailErr)
        } else {
            this.errorValues.emailErr = ""
            this.showSuccessMsg(2)
        }
    }
    validatePhonenumber() {
        const phoneno = /^\d{10}$/
        if (this.formValues.phonenumber === "") {
            this.errorValues.phonenumberErr = "phone number is required"
            this.showErrorMsg(3, this.errorValues.phonenumberErr)
        } else if (phoneno.test(this.formValues.phonenumber)) {
            this.errorValues.phonenumberErr = ""
            this.showSuccessMsg(3)
        } else {
            this.errorValues.phonenumberErr = "Please enter valid phone number"
            this.showErrorMsg(3, this.errorValues.phonenumberErr)
        }
    }
    validatePassword() {
        const passwordStrength = /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^&\*]{8,}$/

        if (this.formValues.password === "") {
            this.errorValues.passwordErr = "Password is required"
            this.showErrorMsg(4, this.errorValues.passwordErr)
        } else if (!(passwordStrength.test(this.formValues.password))) {
            this.errorValues.passwordErr = " Password must be min 8 characters,1 lowercase,1 uppercase,1 numeric,1 special character"
            this.showErrorMsg(4, this.errorValues.passwordErr)
        }
        else if (this.formValues.password.length > 10) {
            this.errorValues.passwordErr = "Password should not exceeds 10 Characters"
            this.showErrorMsg(4, this.errorValues.passwordErr)
        } else {
            this.errorValues.passwordErr = ""
            this.showSuccessMsg(4)
        }
    }
    validateGender() {
        if ((this.formValues.genderM.checked == false) && (this.formValues.genderF.checked == false)) {
            this.errorValues.genderErr = "Gender is required"
            this.showErrorMsg(5, this.errorValues.genderErr)
        }
        else {
            this.errorValues.genderErr = ""
            this.showSuccessMsg(5)
        }
    }
    validateCity() {
        if (this.formValues.city === "") {
            this.errorValues.cityErr = "City is required"
            this.showErrorMsg(6, this.errorValues.cityErr)
        }
        else {
            this.errorValues.cityErr = ""
            this.showSuccessMsg(6)
        }

    }
    validateCheckbox() {
        if (!this.formValues.agree.checked) {
            this.errorValues.agreeErr = "please select the check box"
            this.showErrorMsg(7, this.errorValues.agreeErr)
            // alert('please select the check box')
        }
        else {
            this.errorValues.agreeErr = ""
            this.showSuccessMsg(7)
        }
    }
    alertMessage() {
        const { firstnameErr, emailErr, phonenumberErr, passwordErr, genderErr, cityErr, agreeErr } = this.errorValues
        if (firstnameErr === "" && emailErr === "" && phonenumberErr === "" && passwordErr === "" && genderErr === "" && cityErr === "" && agreeErr === "") {
            swal("Registration Successful", "ThankYou , " + this.formValues.firstname, "success").then(() => {
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
    ValidateUserInputs.validateFirstName()
    ValidateUserInputs.validateLastName()
    ValidateUserInputs.validateEmail()
    ValidateUserInputs.validatePhonenumber()
    ValidateUserInputs.validatePassword()
    ValidateUserInputs.validateGender()
    ValidateUserInputs.validateCity()
    ValidateUserInputs.validateCheckbox()
    ValidateUserInputs.alertMessage()
})
