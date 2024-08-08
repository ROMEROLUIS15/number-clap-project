const User = require('../models/User.js');
const VerificationCode = require('../models/VerificationCode.js');
const sendVerificationEmail = require('../services/emailService.js'); 
const catchError = require('../middlewares/catchError.js');
const bcrypt = require('bcrypt');
const generateVerificationCode = require('../utils/generateVerificationCode.js');

const sendRecoveryCode = catchError(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(404).send('User not found.')
    }
    const verificationCode = generateVerificationCode(6)

    await VerificationCode.create({ email, code: verificationCode })

    // Envía el correo de verificación
    await sendVerificationEmail(email, verificationCode)

    res.status(200).send('Verification code sent. Check your email.')
})

//UPDATE PASSWORD
const updatePassword = catchError(async (req, res) => {
    const { email, code, newPassword, confirmNewPassword } = req.body

    if (newPassword !== confirmNewPassword) {
        return res.status(400).send('Passwords do not match.')
    }
    const codeSent = await VerificationCode.findOne({ where: { email, code } })
    if (!codeSent) {
        return res.status(400).send('Invalid verification code or email.')
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(404).send('User not found.')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Actualiza la contraseña del usuario
    await user.update({ password: hashedPassword })
    await codeSent.destroy() // Elimina el registro del código después de actualizar la contraseña

    res.status(200).send('Password updated successfully.')
})

module.exports = {
    sendRecoveryCode,
    updatePassword
}
