const SendCode = require('../models/SendCode.js');
const VerifyCodeSended = require('../models/VerifyCodeSended.js');
const sendVerificationEmail = require('../../utils/emailService.js'); // Asegúrate de que esta función esté importada
const catchError = require('../../utils/catchError.js');

//variable para enviar codigo con letras minusculas y mayusculas al email
const generateVerificationCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
};

const verifyEmailAndSendCode = catchError(async (req, res) => {
    const { email } = req.body;
    
    //variable para enviar codigo de solo numeros
    //const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos

    //complemento: variable para enviar codigo con letras minusculas y mayusculas al email
    const verificationCode = generateVerificationCode(6); // Código de 6 dígitos

    // Verifica si el email está registrado
    const existingEmail = await SendCode.findOne({ where: { email } });
    if (!existingEmail) {
        return res.status(400).send('The email address is not registered.');
    }

    // Elimina códigos anteriores (opcional)
    await VerifyCodeSended.destroy({ where: { email } });

    // Guarda el nuevo código de verificación
    await VerifyCodeSended.create({ code: verificationCode, email });

    // Envía el correo de verificación
    await sendVerificationEmail(email, verificationCode);

    res.status(200).send('Verification code sent. Check your email.');
});




module.exports = verifyEmailAndSendCode
