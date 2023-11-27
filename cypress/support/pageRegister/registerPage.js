class registerPage{
    firstnm = '#firstname'
    lastnm = '#lastname'
    crt_btn = '.action.submit.primary'
    err_msg = '.message-error'

    inputUsername(name){
        cy.get(this.firstnm).type(first_name)
    }

    inputPassword(pass){
        cy.get(this.lastnm).type(last_name)
    }

    clickLogin(){
        cy.get(this.crt_btn).click()
    }

    verifyError(message){
        cy.verifyContain(this.err_msg,message)

    }

}
export default new registerPage()